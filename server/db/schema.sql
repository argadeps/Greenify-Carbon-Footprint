DROP DATABASE IF EXISTS greenify_db;
CREATE DATABASE greenify_db;
\c greenify_db;

CREATE TABLE Users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  eco_score INTEGER DEFAULT 0,
  last_login TIMESTAMP,
  eco_score INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Activities (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES Users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  type VARCHAR(50) NOT NULL,
  category VARCHAR(50) NOT NULL,
  carbon_impact DECIMAL(10,2),
  water_impact DECIMAL(10,2),
  waste_impact DECIMAL(10,2),
  date DATE,
  description TEXT
);

CREATE TABLE CarbonFootprints (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES Users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  transportation DECIMAL(10,2),
  home_energy DECIMAL(10,2),
  food DECIMAL(10,2),
  waste DECIMAL(10,2),
  water_usage DECIMAL(10,2),
  consumer_goods DECIMAL(10,2),
  services DECIMAL(10,2),
  date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_activities_user_id ON Activities(user_id);
CREATE INDEX idx_activities_date ON Activities(date);
CREATE INDEX idx_carbon_footprints_user_id ON CarbonFootprints(user_id);
CREATE INDEX idx_carbon_footprints_date ON CarbonFootprints(date);