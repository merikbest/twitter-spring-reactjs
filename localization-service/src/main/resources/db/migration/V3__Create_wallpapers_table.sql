CREATE SEQUENCE wallpapers_seq START 1000 INCREMENT 1;

CREATE TABLE wallpapers
(
    id  INT8         NOT NULL,
    src VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);
