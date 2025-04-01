import React, { useRef, useState } from "react";
import { Input } from "../ui/input";
import { IoClose, IoImage, IoPaperPlane } from "react-icons/io5";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendMessage } from "@/lib/messageFetching";
import Image from "next/image";

interface MessageMutationType {
  receiverId: string;
  text: string | null;
  image?: string | undefined;
}

const UserChatboxInput = ({ recieverId }: { recieverId: string }) => {
  const queryClient = useQueryClient();
  const [isCreatingMessage, setIsCreatingMessage] = useState<boolean>(false);
  const [newMessage, setNewMessage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const sendMessageMutation = useMutation({
    mutationFn: ({ receiverId, text, image }: MessageMutationType) =>
      sendMessage(receiverId, text, image),
    onSuccess: (data) => {
      console.log("message sent res: ", data);
      queryClient.invalidateQueries({
        queryKey: ["messages", recieverId],
      });
      setIsCreatingMessage(false);
    },
  });

  const handleSendMessage = () => {
    setIsCreatingMessage(true);
    if (!newMessage) {
      alert("Please type a message");
      setIsCreatingMessage(false);
      return;
    }

    console.log("slika", {
      receiverId: recieverId,
      text: newMessage,
      image: imagePreview || undefined,
    });

    sendMessageMutation.mutate({
      receiverId: recieverId,
      text: newMessage,
      image: imagePreview || undefined,
    });

    setNewMessage("");
    removeImage();
  };

  // function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const imageUrl = URL.createObjectURL(file);
  //     setImagePreview(imageUrl);
  //   }
  // }
  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }
  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  function removeImage() {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setImagePreview(null);
  }

  return (
    <div className="w-full flex flex-col items-center justify-center gap-2 px-5 pb-5">
      {imagePreview && (
        <div className="relative size-[150px] flex items-center justify-center ml-5 rounded-xl">
          <Image
            src={imagePreview}
            width={150}
            height={150}
            objectFit="cover"
            alt="image preview size-full rounded-xl"
          />
          <button
            onClick={removeImage}
            className="absolute top-6 right-2 bg-surface bg-opacity-70 rounded-full p-1"
          >
            <IoClose className="text-on-surface" size={18} />
          </button>
        </div>
      )}
      <div className="w-full flex items-center justify-center gap-2">
        <div className="relative w-full">
          <Input
            placeholder="Type a message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="rounded-full h-[52px] bg-surface border-[1.5px] border-gray-800 pr-16"
          />
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            name="image"
            className="hidden"
            onChange={handleImageChange}
          />
          <button
            type="button"
            onClick={handleImageButtonClick}
            className="absolute right-5 top-1/2 -translate-y-1/2"
          >
            <IoImage className="text-primary" size={24} />
          </button>
        </div>
        <div className="max-w-[40px] flex items-center justify-center">
          <button onClick={handleSendMessage} disabled={isCreatingMessage}>
            <IoPaperPlane
              className={`${
                isCreatingMessage ? "text-disabled" : "text-primary"
              } ${isCreatingMessage && "animate-pulse"}`}
              size={24}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserChatboxInput;
