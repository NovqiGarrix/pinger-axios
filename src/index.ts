import dotenv from 'dotenv';
import axios from 'axios';
import express from 'express';
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT || 3001

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));

async function ping(): Promise<void> {
    const URL = process.env.API_URL!

    try {

        const { status } = await axios.get(URL);
        console.log(`RECEIVE STATUS: ${status}`);
        return

    } catch (error: any) {
        console.error(error.message);
        return
    }
}

app.get('/', (_req, res) => res.sendStatus(200));

app.listen(PORT, () => console.log(`App Listening on PORT: ${PORT}`));

(async function () {

    let index = 1

    while (true) {
        await ping();
        console.log(`PINGED UP TO ${index} TIMES`);
        index++
    }

})()