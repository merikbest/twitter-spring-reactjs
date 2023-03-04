create sequence lists_seq start 100 increment 1;
create sequence lists_followers_seq start 100 increment 1;
create sequence lists_members_seq start 100 increment 1;
create sequence lists_wallpaper_seq start 100 increment 1;
create sequence pinned_lists_seq start 100 increment 1;

create table lists
(
    id            int8 not null,
    name          varchar(255) not null,
    description   varchar(255),
    private       boolean default false,
    alt_wallpaper varchar(255),
    wallpaper     varchar(255),
    list_owner_id int8 not null,
    primary key (id)
);
create table lists_followers
(
    id          int8 not null,
    list_id     int8 not null,
    follower_id int8 not null,
    primary key (id)
);
create table lists_members
(
    id        int8 not null,
    list_id   int8 not null,
    member_id int8 not null,
    primary key (id)
);
create table pinned_lists
(
    id             bigserial not null,
    pinned_date    timestamp default current_timestamp,
    list_id        int8,
    pinned_user_id int8,
    primary key (id)
);

create index lists_list_owner_id_idx on lists (list_owner_id);
create index lists_followers_list_id_idx on lists_followers (list_id);
create index lists_followers_follower_id_idx on lists_followers (follower_id);
create index lists_members_list_id_idx on lists_members (list_id);
create index lists_members_member_id_idx on lists_members (member_id);
create index pinned_lists_list_id_idx on pinned_lists (list_id);
create index pinned_lists_pinned_user_id_idx on pinned_lists (pinned_user_id);
