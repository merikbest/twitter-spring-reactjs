create sequence topics_seq start 100 increment 1;
create sequence topic_followers_seq start 100 increment 1;
create sequence topic_not_interested_seq start 100 increment 1;

create table topics
(
    id             int8         not null,
    topic_name     varchar(255) not null unique,
    topic_category varchar(255),
    primary key (id)
);

create table topic_followers
(
    id       int8 not null,
    topic_id int8 not null,
    user_id  int8 not null,
    primary key (id)
);

create table topic_not_interested
(
    id       int8 not null,
    topic_id int8 not null,
    user_id  int8 not null,
    primary key (id)
);

create table users
(
    id              int8         not null,
    full_name       varchar(255) not null,
    username        varchar(255) not null,
    private_profile boolean default false,
    primary key (id)
);

create table user_blocked
(
    user_id         int8 not null,
    blocked_user_id int8 not null
);

create table user_subscriptions
(
    subscriber_id int8 not null,
    user_id       int8 not null
);
