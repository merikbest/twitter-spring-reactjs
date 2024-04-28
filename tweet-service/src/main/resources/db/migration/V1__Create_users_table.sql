CREATE TABLE users
(
    id                    INT8         NOT NULL,
    full_name             VARCHAR(255) NOT NULL,
    username              VARCHAR(255) NOT NULL,
    about                 VARCHAR(255),
    avatar                VARCHAR(255),
    pinned_tweet_id       INT8,
    private_profile       BOOLEAN DEFAULT FALSE,
    muted_direct_messages BOOLEAN DEFAULT FALSE,
    active                BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (id)
);

CREATE TABLE user_blocked
(
    user_id         INT8 NOT NULL REFERENCES users (id),
    blocked_user_id INT8 NOT NULL REFERENCES users (id)
);
CREATE INDEX user_blocked_user_id_idx ON user_blocked (user_id);
CREATE INDEX user_blocked_blocked_user_id_idx ON user_blocked (blocked_user_id);

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

CREATE TABLE user_follower_requests
(
    user_id     INT8 NOT NULL REFERENCES users (id),
    follower_id INT8 NOT NULL REFERENCES users (id)
);
CREATE INDEX user_follower_requests_user_id_idx ON user_follower_requests (user_id);
CREATE INDEX user_follower_requests_follower_id_idx ON user_follower_requests (follower_id);
