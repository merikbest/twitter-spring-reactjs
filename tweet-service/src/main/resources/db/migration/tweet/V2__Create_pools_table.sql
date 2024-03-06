CREATE SEQUENCE polls_seq START 100 INCREMENT 1;
CREATE SEQUENCE poll_choices_seq START 100 INCREMENT 1;
CREATE SEQUENCE poll_choice_voted_seq START 100 INCREMENT 1;

CREATE TABLE polls
(
    id        INT8      NOT NULL,
    date_time TIMESTAMP NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE poll_choices
(
    id     INT8         NOT NULL,
    choice VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE polls_poll_choices
(
    poll_id         INT8 NOT NULL REFERENCES polls,
    poll_choices_id INT8 UNIQUE NOT NULL REFERENCES poll_choices
);

CREATE TABLE poll_choice_voted
(
    id             INT8 NOT NULL,
    poll_choice_id INT8 NOT NULL,
    voted_user_id  INT8 NOT NULL,
    PRIMARY KEY (id)
);
CREATE INDEX poll_choice_voted_poll_choice_id_idx ON poll_choice_voted (poll_choice_id);
CREATE INDEX poll_choice_voted_voted_user_id_idx ON poll_choice_voted (voted_user_id);
