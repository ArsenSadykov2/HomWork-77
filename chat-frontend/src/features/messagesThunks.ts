import {createAsyncThunk} from "@reduxjs/toolkit";
import {Message} from "../types";
import axiosAPI from "../axiosApi.ts";

export const fetchAllMessages = createAsyncThunk<Message[], void>(
    'messages/fetchAllMessages',
    async () => {
        const response = await axiosAPI.get<Message[]>('/messages');
        return response.data || null;
    }
);

export const fetchMessageById = createAsyncThunk<Message, string>(
    'messages/fetchMessageById',
    async (messages_id) => {
        const response = await axiosAPI.get<Message>('/messages/' + messages_id);
        return response.data || null;
    }
);

export const createMessage = createAsyncThunk<Message, Message>(
    'messages/createMessage',
    async (messageToAdd) => {
        const formData = new FormData();
        formData.append('author', messageToAdd.author);
        formData.append('description', messageToAdd.description);

        if (messageToAdd.image) {
            formData.append('image', messageToAdd.image);
        }

        const response = await axiosAPI.post<Message>('/messages', formData);
        return response.data;

    }
);