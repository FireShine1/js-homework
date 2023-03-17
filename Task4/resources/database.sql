CREATE DATABASE films_data
    WITH
    ENCODING = 'UTF8';

CREATE TABLE films(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    release_year int NOT NULL
);

CREATE TABLE genres(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE genres_films(
    film_id int REFERENCES films (id) ON DELETE CASCADE,
    genre_id int REFERENCES genres (id) ON DELETE RESTRICT,
    CONSTRAINT pk_film_genre PRIMARY KEY (film_id, genre_id)
);