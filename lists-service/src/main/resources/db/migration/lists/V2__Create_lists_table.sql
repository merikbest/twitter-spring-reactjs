CREATE SEQUENCE lists_seq START 100 INCREMENT 1;

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
