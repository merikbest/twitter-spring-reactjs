create sequence topics_seq start 100 increment 1;
create sequence topic_followers_seq start 100 increment 1;
create sequence topic_not_interested_seq start 100 increment 1;

create table topics
(
    id             int8 not null,
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
