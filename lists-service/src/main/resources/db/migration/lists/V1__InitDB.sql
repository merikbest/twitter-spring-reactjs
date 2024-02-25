CREATE SEQUENCE lists_seq START 100 INCREMENT 1;

CREATE TABLE users
(
    id              INT8         NOT NULL,
    full_name       VARCHAR(255) NOT NULL,
    username        VARCHAR(255) NOT NULL,
    about           VARCHAR(255),
    avatar          VARCHAR(255),
    private_profile BOOLEAN DEFAULT FALSE,
    active          BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (id)
);

CREATE TABLE user_blocked
(
    user_id         INT8 NOT NULL REFERENCES users (id),
    blocked_user_id INT8 NOT NULL REFERENCES users (id)
);
CREATE INDEX user_blocked_user_id_idx ON user_blocked (user_id);
CREATE INDEX user_blocked_blocked_user_id_idx ON user_blocked (blocked_user_id);

CREATE TABLE user_subscriptions
(
    user_id       INT8 NOT NULL REFERENCES users (id),
    subscriber_id INT8 NOT NULL REFERENCES users (id)
);
CREATE INDEX user_subscriptions_user_id_idx ON user_subscriptions (user_id);
CREATE INDEX user_subscriptions_subscriber_id_idx ON user_subscriptions (subscriber_id);

CREATE TABLE lists
(
    id            INT8         NOT NULL,
    list_name     VARCHAR(255) NOT NULL,
    description   VARCHAR(255),
    private       BOOLEAN DEFAULT FALSE,
    alt_wallpaper VARCHAR(255),
    wallpaper     VARCHAR(255),
    list_owner_id INT8         NOT NULL REFERENCES users (id),
    PRIMARY KEY (id)
);
CREATE INDEX ON lists (list_owner_id);

CREATE TABLE lists_followers
(
    list_id     INT8 NOT NULL REFERENCES lists (id),
    follower_id INT8 NOT NULL REFERENCES users (id)
);
CREATE INDEX lists_followers_list_id_idx ON lists_followers (list_id);
CREATE INDEX lists_followers_follower_id_idx ON lists_followers (follower_id);

CREATE TABLE lists_members
(
    list_id   INT8 NOT NULL REFERENCES lists (id),
    member_id INT8 NOT NULL REFERENCES users (id)
);
CREATE INDEX lists_members_list_id_idx ON lists_members (list_id);
CREATE INDEX lists_members_member_id_idx ON lists_members (member_id);

CREATE TABLE pinned_lists
(
    list_id        INT8 NOT NULL REFERENCES lists (id),
    pinned_user_id INT8 NOT NULL REFERENCES users (id),
    pinned_date    TIMESTAMP DEFAULT current_timestamp
);
CREATE INDEX pinned_lists_list_id_idx ON pinned_lists (list_id);
CREATE INDEX pinned_lists_pinned_user_id_idx ON pinned_lists (pinned_user_id);

------------------------------------------------------------------------------------------------------------------------

CREATE TABLE lists_followers_demo
(
    id          INT8 NOT NULL,
    list_id     INT8 NOT NULL,
    follower_id INT8 NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE lists_members_demo
(
    id        INT8 NOT NULL,
    list_id   INT8 NOT NULL,
    member_id INT8 NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE pinned_lists_demo
(
    id             BIGSERIAL NOT NULL,
    pinned_date    TIMESTAMP DEFAULT current_timestamp,
    list_id        INT8,
    pinned_user_id INT8,
    PRIMARY KEY (id)
);
