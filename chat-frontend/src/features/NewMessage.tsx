import {Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {useAppDispatch} from "../app/hooks.ts";
import {Message} from "../types";
import {createMessage, fetchAllMessages} from "./messagesThunks.ts";
import MessageForm from "./components/MessagesForm/MessagesForm.tsx";

const NewMessage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onCreateNewProduct = async (message: Message) => {
        try {
            await dispatch(createMessage(message));
            toast.success("Product was successfully created!");
            await dispatch(fetchAllMessages());
            navigate('/');
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <Typography variant="h4" style={{textAlign: "center", marginBottom: "20px"}}>
                New Message
            </Typography>
            <MessageForm send={onCreateNewProduct}/>
        </>
    );
};

export default NewMessage;