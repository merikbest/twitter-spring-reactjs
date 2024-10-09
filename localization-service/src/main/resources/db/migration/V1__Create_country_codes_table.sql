CREATE SEQUENCE country_codes_seq START 1000 INCREMENT 1;

CREATE TABLE country_codes
(
    id           INT8         NOT NULL,
    country_code VARCHAR(255) NOT NULL,
    phone_code   VARCHAR(255) NOT NULL,
    country      VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);
