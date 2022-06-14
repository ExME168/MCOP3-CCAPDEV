import 'dotenv/config';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import exphbs from 'express-handlebars';

import { connectToMongo } from './models/db/conn.js';

import navRoutes from './routes/navigation.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();


app.use(express.static(__dirname + '/public'));

app.engine('hbs', exphbs.engine({ extname: 'hbs' }));
app.set("view engine", 'hbs');                         
app.set('views', './views');                            

app.set("view cache", false);                           // disable caching


app.use(navRoutes);                                     // assign routes

app.use((req, res, err) => {                            // 404 page
    res.render('404', {
        title: "404 Not Found"
    });
});

connectToMongo((err) => {
    if(err) {
        console.log(err);
        process.exit();
    }
    console.log("Successful connection");

    app.listen(process.env.SERVER_PORT, () => {
        console.log("Server now listening...");
    });
});