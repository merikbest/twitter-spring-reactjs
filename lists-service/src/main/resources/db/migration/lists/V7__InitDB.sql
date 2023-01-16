create sequence lists_seq start 100 increment 1;
create sequence lists_followers_seq start 100 increment 1;
create sequence lists_members_seq start 100 increment 1;
create sequence lists_wallpaper_seq start 100 increment 1;
create sequence pinned_lists_seq start 100 increment 1;

create table lists
(
    id            int8 not null,
    name          varchar(255),
    description   varchar(255),
    private       boolean,
    alt_wallpaper varchar(255),
    wallpaper_id  int8,
    list_owner_id int8,
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
create table lists_wallpaper
(
    id  int8 not null,
    src varchar(255),
    primary key (id)
);
create table pinned_lists
(
    id             bigserial not null,
    pinned_date    timestamp,
    list_id        int8,
    pinned_user_id int8,
    primary key (id)
);
