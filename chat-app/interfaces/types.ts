export interface UserType {
    lastMessage: any;
    createdAt: string;
    updatedAt: string;
    email: string;
    profilePic: string;
    username: string;
    _id: string;
}


export interface MessageType {
    senderId: string;
    recieverId: string;
    text: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    sentimentScore: number;
    _id: string;
}

export interface SvgIconSizeAndClassName {
    width?: string;
    height?: string;
    className?: string;
  }