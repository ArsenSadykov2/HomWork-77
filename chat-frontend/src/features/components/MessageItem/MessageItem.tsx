import Grid from "@mui/material/Grid";
import {Card, CardActions, CardContent, CardHeader, CardMedia, IconButton} from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {Link} from "react-router-dom";
import NotFoundPic from "../../../assets/images/unknown.png";
import {apiUrl} from "../../../globalConstants.ts";


interface Props {
    author: string;
    description: string;
    id: string;
    image: string | undefined;
}

const MessageItem: React.FC<Props> = ({author, description, id, image}) => {
    let cartImage = NotFoundPic;

    if (image) {
        cartImage = apiUrl + '/' + image;
    }

    return (
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
            <Card>
                <CardMedia
                    component="img"
                    height="200"
                    image={cartImage}
                    alt={author}
                />
                <CardHeader title={author} />
                <CardContent>
                    <strong>
                        Description: {description}
                    </strong>
                </CardContent>
                <CardActions>
                    <IconButton component={Link} to={'/products/' + id}>
                        <ArrowForwardIcon/>
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default MessageItem;