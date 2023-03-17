const PORT = process.env.PORT || 8080;
import Application from './application.js';
import filmRouter from './routers/filmRouter.js';
import genreRouter from './routers/genreRouter.js';
import jsonParser from './utils/parseJson.js';
import parseUrl from './utils/parseUrl.js';

const app = new Application();

app.use(jsonParser);
app.use( parseUrl('http://localhost:8080') );

app.addRouter(filmRouter);
app.addRouter(genreRouter);

const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start();