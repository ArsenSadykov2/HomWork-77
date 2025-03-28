import { FormEvent, ChangeEvent, useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import {Message} from "../../../types";
import Grid from "@mui/material/Grid";
import FileInput from "../../../components/UI/FileInput/FileInput.tsx";

interface Props {
    send: (message: Message) => void;
    isLoading?: boolean;
}

const MessageForm: React.FC<Props> = ({ send, isLoading }) => {
    const [message, setMessage] = useState<Omit<Message, "id">>({
        author: "",
        description: "",
        image: null
    });
    const [error, setError] = useState("");

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setMessage((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!message.author.trim() || !message.description.trim()) {
            setError("Author and message are required!");
            return;
        }

        send(message as Message);
        setMessage({ author: "", description: "", image: null });
    };

    const fileInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;

        if(files){
            setMessage(prevState => ({
                ...prevState,
                [name]: files[0],
            }));
        }
    };

    return (
        <Box component="form" onSubmit={onSubmit} sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
                New Message
            </Typography>

            <TextField
                fullWidth
                label="Author"
                name="author"
                value={message.author}
                onChange={onChange}
                margin="normal"
                required
            />

            <TextField
                fullWidth
                label="Message"
                name="description"
                value={message.description}
                onChange={onChange}
                margin="normal"
                multiline
                rows={4}
                required
            />

            <Grid size={{sm:12, md:6, lg:6}}>
                <FileInput onChange={fileInputChangeHandler} name='image' label='Image'/>
            </Grid>

            {error && (
                <Typography color="error" sx={{ mb: 2 }}>
                    {error}
                </Typography>
            )}

            <Button
                type="submit"
                variant="contained"
                endIcon={<SendIcon />}
                sx={{ mt: 2 }}
                disabled={isLoading}
            >
                Send
            </Button>
        </Box>
    );
};

export default MessageForm;