create sequence tags_seq start 100 increment 1;
create sequence tweet_tags_seq start 100 increment 1;

create table tags
(
    id              int8 not null,
    tag_name        varchar(255),
    tweets_quantity int8,
    primary key (id)
);

create table tweet_tags
(
    id       int8 not null,
    tag_id   int8 not null,
    tweet_id int8 not null,
    primary key (id)
);
