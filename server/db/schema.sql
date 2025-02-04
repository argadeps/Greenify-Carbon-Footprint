DROP DATABASE IF EXISTS greenify_db;
CREATE DATABASE greenify_db;
\c greenify_db;

CREATE TABLE Users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255),
  email VARCHAR(255),
  location VARCHAR(255),
  eco_score INTEGER,
  created_at TIMESTAMP
);

CREATE TABLE Activities (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES Users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  type VARCHAR(50),
  carbon_impact DECIMAL,
  date DATE,
  description TEXT
);

CREATE TABLE CarbonFootprints (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES Users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  transportation DECIMAL,
  home_energy DECIMAL,
  food DECIMAL,
  waste DECIMAL,
  date DATE
);