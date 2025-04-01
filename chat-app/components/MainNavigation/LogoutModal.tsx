import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useMutation } from "@tanstack/react-query";
import { fetchLogout } from "@/lib/authFetching";

interface LogoutModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const LogoutModal = ({ isOpen, setIsOpen }: LogoutModalProps) => {
  const logoutMutation = useMutation({
    mutationFn: fetchLogout,
    onSuccess: () => {
      setIsOpen(false);
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Do you really want to log out? You will have to log in again to use
            the app.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout}>Logout</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutModal;
