CREATE SEQUENCE chats_seq START 100 INCREMENT 1;
CREATE SEQUENCE chat_messages_seq START 100 INCREMENT 1;

CREATE TABLE chats
(
    id         INT8      NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE chat_messages
(
    id         INT8      NOT NULL,
    author_id  INT8      NOT NULL REFERENCES users,
    created_at TIMESTAMP NOT NULL,
    text       VARCHAR(255),
    tweet_id   INT8,
    chat_id    INT8      NOT NULL REFERENCES chats,
    is_unread  BOOLEAN   NOT NULL DEFAULT TRUE,
    PRIMARY KEY (id)
);
CREATE INDEX chat_messages_author_id_idx ON chat_messages (author_id);
CREATE INDEX chat_messages_tweet_id_idx ON chat_messages (tweet_id);
CREATE INDEX chat_messages_chat_id_idx ON chat_messages (chat_id);

CREATE TABLE chats_participants
(
    chat_id   INT8    NOT NULL REFERENCES chats,
    user_id   INT8    NOT NULL REFERENCES users,
    left_chat BOOLEAN NOT NULL DEFAULT FALSE
);
CREATE INDEX chats_participants_user_id_idx ON chats_participants (user_id);
CREATE INDEX chats_participants_chat_id_idx ON chats_participants (chat_id);
