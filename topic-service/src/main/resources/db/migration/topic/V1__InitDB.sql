create sequence topics_seq start 100 increment 1;
create sequence topic_followers_seq start 100 increment 1;
create sequence topic_not_interested_seq start 100 increment 1;

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
    user_id         int8 not null references users (id),
    blocked_user_id int8 not null references users (id)
);

create index user_blocked_user_id_idx on user_blocked (user_id);
create index user_blocked_blocked_user_id_idx on user_blocked (blocked_user_id);

create table user_subscriptions
(
    user_id       int8 not null references users (id),
    subscriber_id int8 not null references users (id)
);

create index user_subscriptions_user_id_idx on user_subscriptions (user_id);
create index user_subscriptions_subscriber_id_idx on user_subscriptions (subscriber_id);

create table topics
(
    id             int8         not null,
    topic_name     varchar(255) not null unique,
    topic_category varchar(255),
    primary key (id)
);

create table topic_followers
(
    user_id  int8 not null references users (id),
    topic_id int8 not null references topics (id)
);

create index topic_followers_user_id_idx on topic_followers (user_id);
create index topic_followers_topic_id_idx on topic_followers (topic_id);

create table topic_not_interested
(
    user_id  int8 not null references users (id),
    topic_id int8 not null references topics (id)
);

create index topic_not_interested_user_id_idx on topic_not_interested (user_id);
create index topic_not_interested_topic_id_idx on topic_not_interested (topic_id);

alter table topic_followers
    add constraint topic_followers_topic_id foreign key (topic_id) references topics;
alter table topic_followers
    add constraint topic_followers_user_id foreign key (user_id) references users;
alter table topic_not_interested
    add constraint topic_not_interested_topic_id foreign key (topic_id) references topics;
alter table topic_not_interested
    add constraint topic_not_interested_user_id foreign key (user_id) references users;
alter table user_blocked
    add constraint user_blocked_blocked_user_id foreign key (blocked_user_id) references users;
alter table user_blocked
    add constraint user_blocked_user_id foreign key (user_id) references users;
alter table user_subscriptions
    add constraint user_subscriptions_user_id foreign key (user_id) references users;
alter table user_subscriptions
    add constraint user_subscriptions_subscriber_id foreign key (subscriber_id) references users;
