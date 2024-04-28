CREATE SEQUENCE notifications_seq START 100 INCREMENT 1;

CREATE TABLE notifications
(
    id                INT8         NOT NULL,
    date              TIMESTAMP DEFAULT current_timestamp,
    notification_type VARCHAR(255) NOT NULL,
    list_id           INT8,
    notified_user_id  INT8         NOT NULL,
    tweet_id          INT8,
    user_id           INT8         NOT NULL,
    user_to_follow_id INT8,
    PRIMARY KEY (id)
);
