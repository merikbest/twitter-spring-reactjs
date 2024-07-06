CREATE SEQUENCE users_seq START 100 INCREMENT 1;

CREATE TABLE users
(
    id                       INT8         NOT NULL,
    about                    VARCHAR(255),
    activation_code          VARCHAR(255),
    active                   BOOLEAN      NOT NULL DEFAULT FALSE,
    avatar                   VARCHAR(255),
    background_color         VARCHAR(255) NOT NULL DEFAULT 'DEFAULT',
    color_scheme             VARCHAR(255) NOT NULL DEFAULT 'BLUE',
    birthday                 VARCHAR(255),
    country_code             VARCHAR(255),
    country                  VARCHAR(255),
    phone_code               VARCHAR(255),
    phone_number             INT8,
    email                    VARCHAR(255) NOT NULL UNIQUE,
    full_name                VARCHAR(255) NOT NULL,
    gender                   VARCHAR(255),
    language                 VARCHAR(255),
    like_count               INT8         NOT NULL DEFAULT 0,
    location                 VARCHAR(255),
    media_tweet_count        INT8         NOT NULL DEFAULT 0,
    muted_direct_messages    BOOLEAN      NOT NULL DEFAULT FALSE,
    notifications_count      INT8         NOT NULL DEFAULT 0,
    mentions_count           INT8         NOT NULL DEFAULT 0,
    followers_count          INT8         NOT NULL DEFAULT 0,
    following_count          INT8         NOT NULL DEFAULT 0,
    followers_requests_count INT8         NOT NULL DEFAULT 0,
    password                 VARCHAR(255),
    password_reset_code      VARCHAR(255),
    pinned_tweet_id          INT8,
    private_profile          BOOLEAN      NOT NULL DEFAULT FALSE,
    profile_customized       BOOLEAN      NOT NULL DEFAULT FALSE,
    profile_started          BOOLEAN      NOT NULL DEFAULT FALSE,
    registration_date        TIMESTAMP    NOT NULL DEFAULT current_timestamp,
    updated_at               TIMESTAMP,
    role                     VARCHAR(255) NOT NULL,
    tweet_count              INT8         NOT NULL DEFAULT 0,
    unread_messages_count    INT8         NOT NULL DEFAULT 0,
    username                 VARCHAR(255) NOT NULL,
    wallpaper                VARCHAR(255),
    website                  VARCHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE subscribers
(
    user_id       INT8 NOT NULL REFERENCES users (id),
    subscriber_id INT8 NOT NULL REFERENCES users (id)
);
CREATE INDEX subscribers_user_id_idx ON subscribers (user_id);
CREATE INDEX subscribers_subscriber_id_idx ON subscribers (subscriber_id);

CREATE TABLE user_blocked
(
    user_id         INT8 NOT NULL REFERENCES users (id),
    blocked_user_id INT8 NOT NULL REFERENCES users (id)
);
CREATE INDEX user_blocked_user_id_idx ON user_blocked (user_id);
CREATE INDEX user_blocked_blocked_user_id_idx ON user_blocked (blocked_user_id);

CREATE TABLE user_follower_requests
(
    user_id     INT8 NOT NULL REFERENCES users (id),
    follower_id INT8 NOT NULL REFERENCES users (id)
);
CREATE INDEX user_follower_requests_user_id_idx ON user_follower_requests (user_id);
CREATE INDEX user_follower_requests_follower_id_idx ON user_follower_requests (follower_id);

CREATE TABLE user_muted
(
    user_id       INT8 NOT NULL REFERENCES users (id),
    muted_user_id INT8 NOT NULL REFERENCES users (id)
);
CREATE INDEX user_muted_user_id_idx ON user_muted (user_id);
CREATE INDEX user_muted_muted_user_id_idx ON user_muted (muted_user_id);

CREATE TABLE user_subscriptions
(
    user_id       INT8 NOT NULL REFERENCES users (id),
    subscriber_id INT8 NOT NULL REFERENCES users (id)
);
CREATE INDEX user_subscriptions_user_id_idx ON user_subscriptions (user_id);
CREATE INDEX user_subscriptions_subscriber_id_idx ON user_subscriptions (subscriber_id);
