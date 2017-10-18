CREATE TABLE albums (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  artist VARCHAR(255) NOT NULL
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  content TEXT,
  author INT REFERENCES users(id),
  album INT REFERENCES albums(id),
  created_at TIMESTAMP DEFAULT current_timestamp
);
