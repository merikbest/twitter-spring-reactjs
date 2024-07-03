CREATE SEQUENCE languages_seq START 1000 INCREMENT 1;

CREATE TABLE languages
(
    id       INT8         NOT NULL,
    language VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);
