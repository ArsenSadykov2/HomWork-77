import Grid from "@mui/material/Grid";
import {Button, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../app/hooks.ts";
import {selectMessages, selectMessagesLoading} from "./messagesSlice.ts";
import {fetchAllMessages} from "./messagesThunks.ts";
import Spinner from "../components/UI/Spinner/Spinner.tsx";
import MessageItem from "./components/MessageItem/MessageItem.tsx";



const Messages = () => {
    const dispatch = useAppDispatch();
    const messages = useAppSelector(selectMessages);
    const messagesFetchLoading = useAppSelector(selectMessagesLoading);

    useEffect(() => {
        dispatch(fetchAllMessages());
    }, [dispatch]);


    return (
        <Grid container direction="column" spacing={2}>
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid>
                    <Typography variant="h4">
                        Products
                    </Typography>
                </Grid>
                <Grid>
                    <Button color="primary" component={Link} to='/messages/new'>
                        Add product
                    </Button>
                </Grid>
            </Grid>
            {messagesFetchLoading ? <Spinner /> :
                <>
                    {messages.length === 0 ? <Typography variant='h4'>No products yet</Typography> :
                        <Grid container direction="row" spacing={1}>
                            {messages.map(product => (
                                <MessageItem
                                    key={product.id}
                                    author={product.author}
                                    description={product.description}
                                    id={product.id}
                                    image={product.image || undefined}
                                />
                            ))}
                        </Grid>
                    }
                </>
            }

        </Grid>
    );
};

export default Messages;