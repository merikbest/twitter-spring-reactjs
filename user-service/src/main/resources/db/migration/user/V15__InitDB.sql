create sequence users_seq start 100 increment 1;

create table users
(
    id                    int8 not null,
    about                 varchar(255),
    activation_code       varchar(255),
    active                boolean default false,
    avatar                varchar(255),
    background_color      varchar(255) default 'DEFAULT',
    color_scheme          varchar(255) default 'BLUE',
    birthday              varchar(255),
    country               varchar(255),
    country_code          varchar(255),
    email                 varchar(255) unique not null,
    full_name             varchar(255) not null,
    gender                varchar(255),
    language              varchar(255),
    like_count            int8    default 0,
    location              varchar(255),
    media_tweet_count     int8    default 0,
    muted_direct_messages boolean default false,
    notifications_count   int8    default 0,
    mentions_count        int8    default 0,
    password              varchar(255),
    password_reset_code   varchar(255),
    phone                 int8,
    pinned_tweet_id       int8,
    private_profile       boolean default false,
    profile_customized    boolean default false,
    profile_started       boolean default false,
    registration_date     timestamp default current_timestamp,
    role                  varchar(255) default 'USER',
    tweet_count           int8    default 0,
    unread_messages_count int8    default 0,
    username              varchar(255) not null,
    wallpaper             varchar(255),
    website               varchar(255),
    primary key (id)
);
create table subscribers
(
    user_id       int8 not null,
    subscriber_id int8 not null
);
create table user_blocked
(
    user_id         int8 not null,
    blocked_user_id int8 not null
);
create table user_follower_requests
(
    user_id     int8 not null,
    follower_id int8 not null
);
create table user_muted
(
    user_id       int8 not null,
    muted_user_id int8 not null
);
create table user_subscriptions
(
    subscriber_id int8 not null,
    user_id       int8 not null
);
alter table subscribers
    add constraint FKh0b65sm1qah4q8iy69k8aaxij foreign key (subscriber_id) references users;
alter table subscribers
    add constraint FKll9lhik8xj3ep6ahtdt7me7pu foreign key (user_id) references users;
alter table user_blocked
    add constraint FK3ft7jt92le6bivrrwj25f87i9 foreign key (blocked_user_id) references users;
alter table user_blocked
    add constraint FK1wp478xhxe2jjsagyb0vnrixm foreign key (user_id) references users;
alter table user_follower_requests
    add constraint FKjnjcgbpbaxgnu81g9mardqve9 foreign key (follower_id) references users;
alter table user_follower_requests
    add constraint FKld8j4caa828qwhp4ca3rf4732 foreign key (user_id) references users;
alter table user_muted
    add constraint FKmfbgdwng6x29fotlaeeo5sdfq foreign key (muted_user_id) references users;
alter table user_muted
    add constraint FKe0j9buuo6ht4pphao101ne08e foreign key (user_id) references users;
alter table user_subscriptions
    add constraint FK3l40lbyji8kj5xoc20ycwsc8g foreign key (user_id) references users;
alter table user_subscriptions
    add constraint FK6dh0jqt57w1molih5xjhb8nd0 foreign key (subscriber_id) references users;
