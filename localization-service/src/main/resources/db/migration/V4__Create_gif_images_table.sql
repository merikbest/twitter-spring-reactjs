CREATE SEQUENCE gif_images_seq START 1000 INCREMENT 1;

CREATE TABLE gif_images
(
    id    INT8         NOT NULL,
    title VARCHAR(255) NOT NULL,
    src   VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);
