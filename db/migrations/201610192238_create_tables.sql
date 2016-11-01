DROP TABLE IF EXISTS meta_data;
DROP TABLE IF EXISTS main_weapons;
DROP TABLE IF EXISTS sub_weapons;
DROP TABLE IF EXISTS special_weapons;
DROP TABLE IF EXISTS weapon_types;
DROP TYPE IF EXISTS special_diminution;

CREATE TABLE meta_data (
  splatoon_version VARCHAR(10) NOT NULL
);

CREATE TABLE sub_weapons (
  id SMALLSERIAL PRIMARY KEY,
  name VARCHAR(16) NOT NULL,
  description VARCHAR(160) NOT NULL DEFAULT ''
);

CREATE TABLE special_weapons (
  id SMALLSERIAL PRIMARY KEY,
  name VARCHAR(16) NOT NULL,
  description VARCHAR(160) NOT NULL DEFAULT ''
);

CREATE TABLE weapon_types (
  id SMALLSERIAL PRIMARY KEY,
  name VARCHAR(10) NOT NULL,
  spec1_name VARCHAR(10) NOT NULL DEFAULT '',
  spec2_name VARCHAR(10) NOT NULL DEFAULT '',
  spec3_name VARCHAR(10) NOT NULL DEFAULT ''
);

CREATE TYPE special_diminution AS ENUM (
  'small',
  'medium',
  'large'
);

CREATE TABLE main_weapons (
  id SMALLSERIAL PRIMARY KEY,
  name VARCHAR(20) NOT NULL,
  description VARCHAR(200) NOT NULL DEFAULT '',
  weapon_type_id SMALLINT NOT NULL REFERENCES weapon_types,
  spec1_value SMALLINT NOT NULL DEFAULT 0,
  spec2_value SMALLINT NOT NULL DEFAULT 0,
  spec3_value SMALLINT NOT NULL DEFAULT 0,
  sub_weapon_id SMALLINT NOT NULL REFERENCES sub_weapons,
  special_weapon_id SMALLINT NOT NULL REFERENCES special_weapons,
  special_diminution special_diminution NOT NULL DEFAULT 'small',
  price INTEGER NOT NULL DEFAULT 0
);
