create TABLE person(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    nick VARCHAR(255),
    salt VARCHAR(255),
    hash TEXT,
    email VARCHAR(255)

);

create TABLE item(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    price INTEGER,
    category VARCHAR(255),
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES person (id)

);