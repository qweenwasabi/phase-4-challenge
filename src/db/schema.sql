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
  joined_at TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  user_id INT,
  album_id INT,
  content TEXT,
  created_at TIMESTAMP DEFAULT current_timestamp,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (album_id) REFERENCES albums(id)
);
