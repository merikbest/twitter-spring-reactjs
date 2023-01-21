create sequence tweets_seq start 100 increment 1;
create sequence tweet_image_seq start 100 increment 1;
create sequence polls_seq start 100 increment 1;
create sequence poll_choices_seq start 100 increment 1;
create sequence poll_choice_voted_seq start 100 increment 1;
create sequence retweets_seq start 100 increment 1;
create sequence liked_tweets_seq start 100 increment 1;
create sequence bookmarks_seq start 100 increment 1;

create table tweets
(
    id                 int8 not null,
    text               text,
    date_time          timestamp default current_timestamp,
    scheduled_date     timestamp,
    addressed_username varchar(255),
    addressed_id       int8,
    addressed_tweet_id int8,
    reply_type         varchar(255),
    link               varchar(255),
    link_title         varchar(255),
    link_description   varchar(255),
    link_cover         varchar(255),
    deleted            boolean,
    link_cover_size    varchar(255),
    author_id          int8 not null,
    primary key (id)
);
create table tweets_images
(
    tweet_id  int8 not null,
    images_id int8 not null
);
create table tweet_images
(
    id  int8 not null,
    src varchar(255),
    primary key (id)
);
create table tweet_quote
(
    quote_tweet_id int8,
    tweet_id       int8 not null,
    primary key (tweet_id)
);
create table replies
(
    tweet_id int8 not null,
    reply_id int8 not null
);
create table quotes
(
    tweet_id int8 not null,
    quote_id int8 not null
);
create table tweet_poll
(
    poll_id  int8,
    tweet_id int8 not null,
    primary key (tweet_id)
);
create table polls
(
    id        int8 not null,
    date_time timestamp default current_timestamp,
    primary key (id)
);
create table polls_poll_choices
(
    poll_id         int8 not null,
    poll_choices_id int8 not null
);
create table poll_choices
(
    id     int8 not null,
    choice varchar(255),
    primary key (id)
);
create table poll_choice_voted
(
    poll_choice_id int8 not null,
    voted_user_id  int8 not null
);
create table liked_tweets
(
    id               int8 not null,
    liked_tweet_date timestamp default current_timestamp,
    tweet_id         int8 not null,
    user_id          int8 not null,
    primary key (id)
);
create table retweets
(
    id           int8 not null,
    retweet_date timestamp default current_timestamp,
    tweet_id     int8 not null,
    user_id      int8 not null,
    primary key (id)
);
create table bookmarks
(
    id            int8 not null,
    bookmark_date timestamp default current_timestamp,
    tweet_id      int8 not null,
    user_id       int8 not null,
    primary key (id)
);

alter table if exists tweets_images
    add constraint FKn08la7vf9dnjm23ddlupi7hjo foreign key (images_id) references images;
alter table if exists tweets_images
    add constraint FKgka7vl35am9mwo21xiy4o3dw3 foreign key (tweet_id) references tweets;

alter table if exists tweet_quote
    add constraint FKftie7ivytjuvpm6118d05upa7 foreign key (quote_tweet_id) references tweets;
alter table if exists tweet_quote
    add constraint FK3an4vbda2c9lw7gla5tng2um4 foreign key (tweet_id) references tweets;

alter table if exists tweet_poll
    add constraint FKfd0dxawayvyp132ntdhi8ptfa foreign key (poll_id) references pools;
alter table if exists tweet_poll
    add constraint FKgia483b845hgruqemh2skyy2v foreign key (tweet_id) references tweets;

alter table if exists replies
    add constraint FKftas7wbrv961d6th8yy5nqdq7 foreign key (reply_id) references tweets;
alter table if exists replies
    add constraint FK1og4qeuvwr4yt0py1yq2jk794 foreign key (tweet_id) references tweets;

alter table if exists quotes
    add constraint FK1cfwrx9kkp9fufamcbbf4n31y foreign key (quote_id) references tweets;
alter table if exists quotes
    add constraint FKnaftxirm45fovgfqhjudyf2s0 foreign key (tweet_id) references tweets;
