create sequence tags_seq start 100 increment 1;
create sequence tweet_tags_seq start 100 increment 1;

create table tags
(
    id              int8 not null,
    tag_name        varchar(255) not null,
    tweets_quantity int8 default 1,
    primary key (id)
);

create table tweet_tags
(
    id       int8 not null,
    tag_id   int8 not null,
    tweet_id int8 not null,
    primary key (id)
);

create index tags_tag_name_idx on tags (tag_name);
create index tweet_tags_tag_id_idx on tweet_tags (tag_id);
create index tweet_tags_tweet_id_idx on tweet_tags (tweet_id);
