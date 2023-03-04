create sequence chat_messages_seq start 100 increment 1;
create sequence chats_participants_seq start 100 increment 1;
create sequence chats_seq start 100 increment 1;

create table chat_messages
(
    id        int8 not null,
    author_id int8 not null,
    date      timestamp default current_timestamp,
    text      varchar(255),
    tweet_id  int8,
    chat_id   int8 not null,
    is_unread boolean default true,
    primary key (id)
);
create table chats
(
    id            int8 not null,
    creation_date timestamp default current_timestamp,
    primary key (id)
);
create table chats_participants
(
    id        int8 not null,
    left_chat boolean default false,
    user_id   int8 not null,
    chat_id   int8 not null,
    primary key (id)
);
alter table chat_messages
    add constraint FKt56nsqjwt7t4sian6vts9wg3t foreign key (chat_id) references chats;
alter table chats_participants
    add constraint FKjrfpltus8r643670taov8pana foreign key (chat_id) references chats;

create index chats_participants_user_id_idx on chats_participants (user_id);
create index chats_participants_chat_id_idx on chats_participants (chat_id);
create index chat_messages_author_id_idx on chat_messages (author_id);
create index chat_messages_chat_id_idx on chat_messages (chat_id);
