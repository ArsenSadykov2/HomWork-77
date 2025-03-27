export interface Message {
    id: string;
    author: string;
    description: string;
    image?: string | null;
}

export interface MessageMutation {
    author: string;
    description: string;
    image: File | null;
}