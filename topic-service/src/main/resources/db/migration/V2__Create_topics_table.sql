CREATE SEQUENCE topics_seq START 100 INCREMENT 1;
CREATE SEQUENCE topic_followers_seq START 100 INCREMENT 1;
CREATE SEQUENCE topic_not_interested_seq START 100 INCREMENT 1;

CREATE TABLE topics
(
    id             INT8         NOT NULL,
    topic_name     VARCHAR(255) NOT NULL UNIQUE,
    topic_category VARCHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE topic_followers
(
    user_id  INT8 NOT NULL REFERENCES users (id),
    topic_id INT8 NOT NULL REFERENCES topics (id)
);
CREATE INDEX topic_followers_user_id_idx ON topic_followers (user_id);
CREATE INDEX topic_followers_topic_id_idx ON topic_followers (topic_id);

CREATE TABLE topic_not_interested
(
    user_id  INT8 NOT NULL REFERENCES users (id),
    topic_id INT8 NOT NULL REFERENCES topics (id)
);
CREATE INDEX topic_not_interested_user_id_idx ON topic_not_interested (user_id);
CREATE INDEX topic_not_interested_topic_id_idx ON topic_not_interested (topic_id);

ALTER TABLE topic_followers
    ADD CONSTRAINT topic_followers_user_id FOREIGN KEY (user_id) REFERENCES users;
ALTER TABLE topic_followers
    ADD CONSTRAINT topic_followers_topic_id FOREIGN KEY (topic_id) REFERENCES topics;
ALTER TABLE topic_not_interested
    ADD CONSTRAINT topic_not_interested_user_id FOREIGN KEY (user_id) REFERENCES users;
ALTER TABLE topic_not_interested
    ADD CONSTRAINT topic_not_interested_topic_id FOREIGN KEY (topic_id) REFERENCES topics;

