CREATE SEQUENCE tags_seq START 100 INCREMENT 1;
CREATE SEQUENCE tweet_tags_seq START 100 INCREMENT 1;

CREATE TABLE tags
(
    id              INT8         NOT NULL,
    tag_name        VARCHAR(255) NOT NULL,
    tweets_quantity INT8 DEFAULT 1,
    PRIMARY KEY (id)
);

CREATE TABLE tweet_tags
(
    id       INT8 NOT NULL,
    tag_id   INT8 NOT NULL,
    tweet_id INT8 NOT NULL,
    PRIMARY KEY (id)
);

CREATE INDEX tags_tag_name_idx ON tags (tag_name);
CREATE INDEX tweet_tags_tag_id_idx ON tweet_tags (tag_id);
CREATE INDEX tweet_tags_tweet_id_idx ON tweet_tags (tweet_id);
