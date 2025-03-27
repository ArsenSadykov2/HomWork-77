export interface Message {
    id: string;
    author: string;
    description: string;
    image: string | null;
}

export type MessageWithoutId = Omit<Message, 'id'>;