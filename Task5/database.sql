CREATE DATABASE films_data
    WITH
    ENCODING = 'UTF8';

CREATE TABLE person(
	id SERIAL PRIMARY KEY,
	first_name VARCHAR(128) NOT NULL,
	middle_name VARCHAR(128),
	last_name VARCHAR(128) NOT NULL
);

CREATE TABLE film(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
	description TEXT NOT NULL,
	audio TEXT NOT NULL,
	subtitles TEXT NOT NULL,
    release_year int NOT NULL,
	country VARCHAR(128) NOT NULL,
	tagline TEXT,
	director_id int REFERENCES person (id) ON DELETE RESTRICT,
	screenwriter_id int REFERENCES person (id) ON DELETE RESTRICT,
	producer_id int REFERENCES person (id) ON DELETE RESTRICT,
	operator_id int REFERENCES person (id) ON DELETE RESTRICT,
	composer_id int REFERENCES person (id) ON DELETE RESTRICT,
	artist_id int REFERENCES person (id) ON DELETE RESTRICT,
	editor_id int REFERENCES person (id) ON DELETE RESTRICT,
	budget VARCHAR(32) NOT NULL,
	marketing VARCHAR(32),
	box_office_country_origin VARCHAR(32) NOT NULL,
	box_office_world VARCHAR(64) NOT NULL,
	release_date_russia DATE NOT NULL,
	release_date_world DATE NOT NULL,
	release_date_dvd DATE NOT NULL,
	age_restriction VARCHAR(4) NOT NULL,
	rating_mpaa VARCHAR(4) NOT NULL,
	running_time int NOT NULL
);

CREATE TABLE starring(
	film_id int REFERENCES film (id) ON DELETE CASCADE,
    person_id int REFERENCES person (id) ON DELETE RESTRICT,
    CONSTRAINT pk_starring PRIMARY KEY (film_id, person_id)
);

CREATE TABLE dubbing(
	film_id int REFERENCES film (id) ON DELETE CASCADE,
    person_id int REFERENCES person (id) ON DELETE RESTRICT,
    CONSTRAINT pk_dubbing PRIMARY KEY (film_id, person_id)
);

CREATE TABLE country(
	id SERIAL PRIMARY KEY,
	name VARCHAR(128) NOT NULL,
	flag TEXT
);

CREATE TABLE film_viewers(
	film_id int REFERENCES film (id) ON DELETE CASCADE,
	country_id int REFERENCES country (id) ON DELETE CASCADE,
	views int NOT NULL,
	CONSTRAINT pk_film_viewers PRIMARY KEY (film_id, country_id)
);

CREATE TABLE genre(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE genre_film(
    film_id int REFERENCES film (id) ON DELETE CASCADE,
    genre_id int REFERENCES genre (id) ON DELETE RESTRICT,
    CONSTRAINT pk_film_genre PRIMARY KEY (film_id, genre_id)
);