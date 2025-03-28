import {promises as fs} from 'fs';
import {existsSync} from "node:fs";
import * as crypto from "node:crypto";
import {Message, MessageWithoutId} from "./types";

const filename = './db.json';
let data: Message[] = [];

const fileDb = {
    async init() {
        try {
            if (!existsSync(filename)) {
                await fs.writeFile(filename, JSON.stringify([]));
            } else {
                const fileContent = await fs.readFile(filename);
                data = JSON.parse(fileContent.toString()) as Message[];
            }
        } catch (e) {
            data = [];
            console.error(e);
        }
    },
    async getProductById(param_id: string) {
        return data.find(p => p.id === param_id);
    },
    async getAllProducts() {
        await fileDb.init();
        return data.reverse();
    },
    async addNewProduct(messageToAdd: MessageWithoutId) {
        const newMesasage = {id: crypto.randomUUID(), ...messageToAdd};
        data.push(newMesasage);
        await this.save();
        return newMesasage;
    },
    async save () {
        return fs.writeFile(filename, JSON.stringify(data));
    }
};

export default fileDb;