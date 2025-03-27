import {createSlice} from "@reduxjs/toolkit";
import {
    createMessage,
    fetchAllMessages,
    fetchMessageById,
} from "./messagesThunks.ts";
import {Message} from "../types";
import {RootState} from "../app/store.ts";

interface MessageState {
    items: Message[];
    item: Message | null;
    fetchLoading: boolean;
    createLoading: boolean;
}

const initialState: MessageState = {
    items: [],
    item: null,
    fetchLoading: false,
    createLoading: false,
};

export const messageSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllMessages.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchAllMessages.fulfilled, (state, {payload: messages}) => {
                state.items = messages;
                state.fetchLoading = false;
            })

            .addCase(fetchMessageById.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchMessageById.fulfilled, (state, {payload: message}) => {
                state.item = message;
                state.fetchLoading = false;
            })

            .addCase(createMessage.pending, (state) => {
                state.createLoading = true;
            })
            .addCase(createMessage.fulfilled, (state) => {
                state.createLoading = false;
            })
            .addCase(createMessage.rejected, (state) => {
                state.createLoading = false;
            })
    }
});

export const messagesReducer = messageSlice.reducer;

export const selectMessages = (state: RootState) => state.messages.items;
export const selectOneMessage = (state: RootState) => state.messages.item;
export const selectMessagesLoading = (state: RootState) => state.messages.fetchLoading;