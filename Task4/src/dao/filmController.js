import db from './db.js';

async function find(req, res) {
    if (req.params.id) {
        await findById(req, res);
    } else {
        await findAll(req, res);
    }
}

/*Не совсем уверен, что работа с жанрами нужна именно в таком формате и именно в этом месте
Вообще, это зависит от того, как устроен фронт
Но я решил, что хоть в каком - то формате она должна быть*/
async function findAll(req, res) {
    const films = await db.query('SELECT * FROM films');
    for (let film of films.rows) {
        film.genres = await getGenresNamesByFilm(film.id);
    }
    res.send(films.rows);
}

async function findById(req, res) {
    const id = req.params.id;
    const film = await db.query('SELECT * FROM films WHERE id = $1', [id]);
    film.rows[0].genres = await getGenresNamesByFilm(film.rows[0].id);
    res.send(film.rows[0]);
}

async function getGenresNamesByFilm(film_id) {
    const genres = await db.query(
        'SELECT * FROM genres_films LEFT JOIN genres ON genres_films.genre_id = genres.id WHERE genres_films.film_id = $1',
        [film_id]
    );
    let genresNames = [];
    for (let genre of genres.rows) {
        genresNames.push(genre.name);
    }
    return genresNames;
}

async function getGenresIdsByFilm(film_id) {
    const genres = await db.query(
        'SELECT * FROM genres_films LEFT JOIN genres ON genres_films.genre_id = genres.id WHERE genres_films.film_id = $1',
        [film_id]
    );
    let genresIds = [];
    for (let genre of genres.rows) {
        genresIds.push(genre.id);
    }
    return genresIds;
}

async function create(req, res) {
    const { title, releaseYear, genres } = req.body;
    const newFilm = await db.query(
        'INSERT INTO films (title, release_year) VALUES ($1, $2) RETURNING *',
        [title, releaseYear]
    );
    for (let genre of genres) {
        await db.query('INSERT INTO genres_films (film_id, genre_id) VALUES ($1, $2)',
            [newFilm.rows[0].id, genre]
        );
    }
    newFilm.rows[0].genres = await getGenresNamesByFilm(newFilm.rows[0].id);
    res.send(newFilm.rows[0]);
}

async function update(req, res) {
    const { id, title, releaseYear, genres } = req.body;
    const film = await db.query(
        'UPDATE films SET title = $1, release_year = $2 WHERE id = $3 RETURNING *',
        [title, releaseYear, id]
    );
    const oldGenres = await getGenresIdsByFilm(id);
    for (let genre of genres) {
        if (!oldGenres.includes(genre)) {
            await db.query('INSERT INTO genres_films (film_id, genre_id) VALUES ($1, $2)',
                [id, genre]
            );
        }
    }
    for (let oldGenre of oldGenres) {
        if (!genres.includes(oldGenre)) {
            await db.query('DELETE FROM genres_films WHERE film_id = $1 AND genre_id = $2',
                [id, oldGenre]
            );
        }
    }
    film.rows[0].genres = await getGenresNamesByFilm(film.rows[0].id);
    res.send(film.rows[0]);
}

async function remove(req, res) {
    const id = req.params.id;
    const film = await db.query('DELETE FROM films WHERE id = $1 RETURNING *', [id]);
    res.send(film.rows[0]);
}

export default {
    find,
    create,
    update,
    remove,
}