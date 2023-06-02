create sequence tweets_seq start 100 increment 1;
create sequence tweet_image_seq start 100 increment 1;
create sequence polls_seq start 100 increment 1;
create sequence poll_choices_seq start 100 increment 1;
create sequence poll_choice_voted_seq start 100 increment 1;
create sequence retweets_seq start 100 increment 1;
create sequence liked_tweets_seq start 100 increment 1;
create sequence bookmarks_seq start 100 increment 1;
create sequence gif_image_seq start 100 increment 1;

create table tweets
(
    id                 int8         not null,
    text               varchar(255) not null,
    date_time          timestamp    default current_timestamp,
    scheduled_date     timestamp,
    addressed_username varchar(255),
    addressed_id       int8,
    addressed_tweet_id int8,
    reply_type         varchar(255) default 'EVERYONE',
    link               varchar(255),
    link_title         varchar(255),
    link_description   varchar(255),
    link_cover         varchar(255),
    image_description  varchar(255),
    deleted            boolean      default false,
    link_cover_size    varchar(255),
    author_id          int8         not null,
    list_id            int8,
    poll_id            int8,
    gif_image_id       int8,
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
create table polls
(
    id        int8 not null,
    date_time timestamp,
    primary key (id)
);
create table polls_poll_choices
(
    poll_id         int8 not null,
    poll_choices_id int8 not null
);
create table poll_choices
(
    id     int8         not null,
    choice varchar(255) not null,
    primary key (id)
);
create table poll_choice_voted
(
    id             int8 not null,
    poll_choice_id int8 not null,
    voted_user_id  int8 not null,
    primary key (id)
);
create table gif_image
(
    id     int8 not null,
    height int8,
    url    varchar(255),
    width  int8,
    primary key (id)
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
create table tagged_image_users
(
    tweet_id             int8 not null,
    tagged_image_user_id int8
);
create table bookmarks
(
    id            int8 not null,
    bookmark_date timestamp default current_timestamp,
    tweet_id      int8 not null,
    user_id       int8 not null,
    primary key (id)
);

alter table polls_poll_choices
    add constraint UK_jua6yjwmepyjcakmqpxkfn9q3 unique (poll_choices_id);
alter table quotes
    add constraint UK_iuv1sbh2mxfhdvwpemnnhveyp unique (quote_id);
alter table tweets_images
    add constraint UK_r0mdr0mxkjw13pm37pqs86vl unique (images_id);
alter table polls_poll_choices
    add constraint FKiov00wdpikhs1naueduv299in foreign key (poll_choices_id) references poll_choices;
alter table polls_poll_choices
    add constraint FKow4jtx281l96oqbewwf7wdl8n foreign key (poll_id) references polls;
alter table quotes
    add constraint FK1cfwrx9kkp9fufamcbbf4n31y foreign key (quote_id) references tweets;
alter table quotes
    add constraint FK1cp5vxtrurwfs2gbo1hcm02u7 foreign key (tweet_id) references tweets;
alter table replies
    add constraint FKftas7wbrv961d6th8yy5nqdq7 foreign key (reply_id) references tweets;
alter table replies
    add constraint FKc0y0dqmqpv2b19wgb7f7a7r8i foreign key (tweet_id) references tweets;
alter table tagged_image_users
    add constraint FKo9g42eoe3cq8c3l55o23ysek3 foreign key (tweet_id) references tweets;
alter table tweet_quote
    add constraint FKftie7ivytjuvpm6118d05upa7 foreign key (quote_tweet_id) references tweets;
alter table tweet_quote
    add constraint FKlkw1iu7ifknitq1q75f09vpo5 foreign key (tweet_id) references tweets;
alter table tweets
    add constraint FKbmnrbbycds8wc5grmybbtuoid foreign key (gif_image_id) references gif_image;
alter table tweets
    add constraint FKeiad9ainy3nwc9wlojt1s6eqv foreign key (poll_id) references polls;
alter table tweets_images
    add constraint FKgg4e58t98pdpjlv0lyp4ausbx foreign key (images_id) references tweet_images;
alter table tweets_images
    add constraint FKgka7vl35am9mwo21xiy4o3dw3 foreign key (tweet_id) references tweets;

create index bookmarks_user_id_idx on bookmarks (user_id);
create index bookmarks_tweet_id_idx on bookmarks (tweet_id);
create index liked_tweets_user_id_idx on liked_tweets (user_id);
create index liked_tweets_tweet_id_idx on liked_tweets (tweet_id);
create index poll_choice_voted_voted_user_id_idx on poll_choice_voted (voted_user_id);
create index poll_choice_voted_poll_choice_id_idx on poll_choice_voted (poll_choice_id);
create index retweets_user_id_idx on retweets (user_id);
create index retweets_tweet_id_idx on retweets (tweet_id);
create index tweets_author_id_idx on tweets (author_id);
