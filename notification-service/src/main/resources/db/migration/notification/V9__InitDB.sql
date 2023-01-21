create sequence notifications_seq start 100 increment 1;

create table notifications
(
    id                int8 not null,
    date              timestamp,
    notification_type varchar(255),
    list_id           int8,
    notified_user_id  int8,
    tweet_id          int8,
    user_id           int8,
    user_to_follow_id int8,
    primary key (id)
);
