import { load } from 'cheerio';
import express from 'express';

const app = express();

app.get('/topic/:topic', async (req, res) => {
    if (!req.params.topic) {
        res.status(404).send('Topic not found!!!');
        return;
    }

    const response = await fetch(`https://en.wikipedia.org/wiki/${req.params.topic}`);
    const data = await response.text();

    const $ = load(data);
    const summery = $('div#mw-content-text > div.mw-parser-output > table.infobox + p').text();

    if (summery.length < 1) {
        res.status(404).send(`Topic "${req.params.topic}" not found!`);
        return;
    }

    res.send(summery);
});


app.listen(3000, () => {
    console.log("The Wikipedia summery is listening on port 3000.");
});
