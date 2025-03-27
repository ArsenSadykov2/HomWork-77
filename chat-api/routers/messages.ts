import express from 'express';
import fileDb from "../fileDb";
import {MessageWithoutId} from "../types";
import {imagesUpload} from "../multer";

const messageRouter = express.Router();

messageRouter.get('/', async (req, res) => {
    const products = await fileDb.getAllProducts();
    const queryId = req.query.id as string;
    console.log(queryId);
    res.send(products);
});

messageRouter.get('/:id', async (req, res) => {
    const product = await fileDb.getProductById(req.params.id);
    res.send(product);
});

messageRouter.post('/', imagesUpload.single('image'), async (req, res) => {
    const newProduct: MessageWithoutId = {
        author: req.body.author,
        description: req.body.description,
        image: req.file ? 'images/' + req.file.filename : null,
    };

    const savedNewProduct = await fileDb.addNewProduct(newProduct);
    res.send(savedNewProduct);
});

export default messageRouter;