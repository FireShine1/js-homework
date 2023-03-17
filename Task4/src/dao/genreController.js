import db from './db.js';

async function find(req, res) {
    if (req.params.id) {
        await findById(req, res);
    } else {
        await findAll(req, res);
    }
}

async function findAll(req, res) {
    const genres = await db.query('SELECT * FROM genres');
    res.send(genres.rows);
}

async function findById(req, res) {
    const id = req.params.id;
    const genre = await db.query('SELECT * FROM genres WHERE id = $1', [id]);
    res.send(genre.rows[0]);
}

async function create(req, res) {
    const { name } = req.body;
    const newGenre = await db.query(
        'INSERT INTO genres (name) VALUES ($1) RETURNING *',
        [name]
    );
    res.send(newGenre.rows[0]);
}

async function update(req, res) {
    const { id, name } = req.body;
    const genre = await db.query(
        'UPDATE genres SET name = $1 WHERE id = $2 RETURNING *',
        [name, id]
    );
    res.send(genre.rows[0]);
}

async function remove(req, res) {
    const id = req.params.id;
    const genre = await db.query('DELETE FROM genres WHERE id = $1 RETURNING *', [id]);
    res.send(genre.rows[0]);
}

export default {
    find,
    create,
    update,
    remove,
}