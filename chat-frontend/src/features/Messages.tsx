import Grid from "@mui/material/Grid";
import {Button, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../app/hooks.ts";
import {selectMessages, selectMessagesLoading} from "./messagesSlice.ts";
import {fetchAllMessages} from "./messagesThunks.ts";



const Products = () => {
    const dispatch = useAppDispatch();
    const products = useAppSelector(selectMessages);
    const productsFetchLoading = useAppSelector(selectMessagesLoading);

    useEffect(() => {
        dispatch(fetchAllMessages());
    }, [dispatch])

    return (
        <Grid container direction="column" spacing={2}>
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid>
                    <Typography variant="h4">
                        Messages
                    </Typography>
                </Grid>
                <Grid>
                    <Button color="primary" component={Link} to='/messages/new'>
                        Add product
                    </Button>
                </Grid>
            </Grid>

        </Grid>
    );
};

export default Products;