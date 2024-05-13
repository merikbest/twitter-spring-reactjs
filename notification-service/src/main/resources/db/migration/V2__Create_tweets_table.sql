CREATE TABLE tweets
(
    id         INT8         NOT NULL,
    tweet_text VARCHAR(255) NOT NULL,
    author_id  INT8         NOT NULL REFERENCES users,
    PRIMARY KEY (id)
);
CREATE INDEX tweets_author_id_idx ON tweets (author_id);
