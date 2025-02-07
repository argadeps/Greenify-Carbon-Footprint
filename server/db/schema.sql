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

-- emission factors from Climatiq API
CREATE TABLE EmissionFactors (
    id SERIAL PRIMARY KEY,
    activity_id VARCHAR(255) NOT NULL UNIQUE,
    category VARCHAR(100) NOT NULL,
    display_name VARCHAR(100) NOT NULL UNIQUE,
    source VARCHAR(100) NOT NULL,
    region VARCHAR(50) NOT NULL,
    year INTEGER NOT NULL,
    source_lca_activity VARCHAR(50) NOT NULL,
    data_version VARCHAR(5) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Activities (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES Users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  display_name VARCHAR(255) NOT NULL REFERENCES EmissionFactors(display_name) ON DELETE CASCADE ON UPDATE CASCADE,
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

-- parameters for the emission factors
CREATE TABLE Parameters (
   id SERIAL PRIMARY KEY,
   parameter_name VARCHAR(30) NOT NULL,
   display_name VARCHAR(100) NOT NULL REFERENCES EmissionFactors(display_name) ON DELETE CASCADE ON UPDATE CASCADE
)

-- created indexes for columns used in joins and where clauses
CREATE INDEX idx_activities_user_id ON Activities(user_id);
CREATE INDEX idx_activities_date ON Activities(date);
CREATE INDEX idx_carbon_footprints_user_id ON CarbonFootprints(user_id);
CREATE INDEX idx_carbon_footprints_date ON CarbonFootprints(date);
CREATE INDEX idx_activities_display_name ON Activities(display_name);
CREATE INDEX idx_parameters_display_name ON Parameters(display_name);