import puppeteer from 'puppeteer';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

async function visit(): Promise<void> {

    const URL = process.env.URL!

    const browser = await puppeteer.launch({
        args: ['--no-sandbox']
    })

    const page = (await browser.pages())[0]

    try {

        await page.goto(URL, { waitUntil: 'networkidle2', timeout: 60000 });
        await page.waitForNetworkIdle();

        await browser.close();
        return

    } catch (error: any) {
        await browser.close();
        console.error(error.message);
        return
    }
}

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

(async function () {

    let index = 1

    while (true) {
        await ping();
        await visit();
        console.log(`Visitted up to ${index} times`);
        index++
    }

})()