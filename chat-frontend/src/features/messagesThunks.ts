import {createAsyncThunk} from "@reduxjs/toolkit";
import {Message, MessageMutation} from "../types";
import axiosAPI from "../axiosApi.ts";

export const fetchAllMessages = createAsyncThunk<Message[], void>(
    'messages/fetchAllMessages',
    async () => {
        const response = await axiosAPI.get<Message[]>('/messages');
        return response.data;
    }
);

export const fetchMessageById = createAsyncThunk<Message, string>(
    'messages/fetchMessageById',
    async (messages_id) => {
        const response = await axiosAPI.get<Message>('/messages/' + messages_id);
        return response.data || null;
    }
);


export const createMessage = createAsyncThunk<void, MessageMutation>(
    'messages/createMessage',
    async (messageToAdd) => {
        const formData = new FormData();
        const keys = Object.keys(messageToAdd) as (keyof MessageMutation)[];

        keys.forEach(key => {
            const value = messageToAdd[key] as string;
            if (value !== null) {
                formData.append(key, value);
            }
        });

        await axiosAPI.post('/messages', formData);
    }
);