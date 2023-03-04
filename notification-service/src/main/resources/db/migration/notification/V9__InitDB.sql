create sequence notifications_seq start 100 increment 1;

create table notifications
(
    id                int8 not null,
    date              timestamp default current_timestamp,
    notification_type varchar(255) not null,
    list_id           int8,
    notified_user_id  int8 not null,
    tweet_id          int8,
    user_id           int8 not null,
    user_to_follow_id int8,
    primary key (id)
);
