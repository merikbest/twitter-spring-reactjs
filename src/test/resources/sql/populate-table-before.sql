alter sequence users_id_seq restart with 10;

-- images
INSERT INTO images (id, src) VALUES (1, 'https://twitterclonestorage.s3.eu-central-1.amazonaws.com/0a6c735d-def8-4587-a29f-221915ef6cb4_ff2d023b3220f93bbc79233614dea542.jpg');
INSERT INTO images (id, src) VALUES (11, 'https://twitterclonestorage.s3.eu-central-1.amazonaws.com/ae83099c-885b-499a-bb6f-5e34e1b69e7d_4ec7201fd370bd9870cdb326f0511f38.jpg');
INSERT INTO images (id, src) VALUES (22, 'https://twitterclonestorage.s3.eu-central-1.amazonaws.com/dfc8a223-45fc-43da-8b7c-f76e2c2507cd_82ecbca14eb4999212c07257f41c70e7.jpg');
INSERT INTO images (id, src) VALUES (33, 'https://twitterclonestorage.s3.eu-central-1.amazonaws.com/348b7dbe-3ac5-477f-8483-edc24f53091b_814370.jpg');
INSERT INTO images (id, src) VALUES (44, 'https://twitterclonestorage.s3.eu-central-1.amazonaws.com/d0e5b95f-acc0-47ef-b499-477f7e5a1a06_PrMnWa2z.jpg');

-- users
-- INSERT INTO users (id, about, activation_code, active, birthday, email, full_name, location, notifications_count, password, password_reset_code, profile_customized, profile_started, registration_date, role, tweet_count, username, website, avatar_id, wallpaper_id) VALUES (1, 'Hello2', null, true, null, 'merikbest2015@gmail.com', 'Vbhjckfd1', 'Kyiv', 0, '$2a$08$T1SpeJPoOfEDpMdhPKMp.elE6XBXIGN2wNMuDNh0vNnsOice4K4cu', null, true, true, '2021-08-01 23:34:32.000000', 'USER', 64, 'Vbhjckfd1', 'https://www.google.com', 11, 22);
INSERT INTO users (id, about, activation_code, active, birthday, email, full_name, location, notifications_count, password, password_reset_code, profile_customized, profile_started, registration_date, role, tweet_count, username, website, avatar_id, wallpaper_id, like_count, media_tweet_count, country, gender, language, muted_direct_messages, phone, private_profile, country_code) VALUES (1, 'Hello2', null, true, null, 'merikbest2015@gmail.com', 'Vbhjckfd1', 'Kyiv', 0, '$2a$08$T1SpeJPoOfEDpMdhPKMp.elE6XBXIGN2wNMuDNh0vNnsOice4K4cu', null, true, true, '2021-08-01 23:34:32.000000', 'USER', 126, 'Vbhjckfd1', 'https://www.google.com', 11, 22, 40, 44, 'UA', 'Cat', 'Ukrainian - українська', true, 666966623, false, 'UA');
-- , pinned_tweet_id, like_count, media_tweet_count, country, gender, language, muted_direct_messages, phone, private_profile, country_code
-- , 44, 40, 44, 'UA', 'Cat', 'Ukrainian - українська', true, 666966623, false, 'UA'
INSERT INTO users (id, about, activation_code, active, birthday, email, full_name, location, notifications_count, password, password_reset_code, profile_customized, profile_started, registration_date, role, tweet_count, username, website, avatar_id, wallpaper_id, like_count, media_tweet_count, country, gender, language, muted_direct_messages, phone, private_profile, country_code) VALUES (2, 'Hello twitter!', null, true, 'Mar 10, 1991', 'test2015@test.test', 'MrCat', 'New York', 3, '$2a$08$T1SpeJPoOfEDpMdhPKMp.elE6XBXIGN2wNMuDNh0vNnsOice4K4cu', null, true, true, '2021-08-01 23:34:32.000000', 'USER', 126, 'MrCat', 'https://www.google.com', 33, 44, 40, 44, 'UA', 'Cat', 'Ukrainian - українська', true, 666966623, false, 'UA');
INSERT INTO users (id, about, activation_code, active, birthday, email, full_name, location, notifications_count, password, password_reset_code, profile_customized, profile_started, registration_date, role, tweet_count, username, website, avatar_id, wallpaper_id, like_count, media_tweet_count, country, gender, language, muted_direct_messages, phone, private_profile, country_code) VALUES (3, 'Hello twitter!', '1234567890', true, 'Mar 10, 1991', 'test2016@test.test', 'MrCat', 'New York', 3, '$2a$08$T1SpeJPoOfEDpMdhPKMp.elE6XBXIGN2wNMuDNh0vNnsOice4K4cu', '1234567890', true, true, '2021-08-01 23:34:32.000000', 'USER', 126, 'MrCat', 'https://www.google.com', 33, 44, 40, 44, 'UA', 'Cat', 'Ukrainian - українська', true, 666966623, false, 'UA');

-- tweets
INSERT INTO tweets (id, addressed_id, addressed_tweet_id, addressed_username, date_time, reply_type, text, user_id, link, link_cover, link_description, link_title, link_cover_size, scheduled_date) VALUES (39, null, null, null, '2021-10-03 20:29:03.00vo0000', 'EVERYONE', 'test tweet',  2, null, null, null, null, null, '3021-10-03 20:33:36.000000');
INSERT INTO tweets (id, addressed_id, addressed_tweet_id, addressed_username, date_time, reply_type, text, user_id, link, link_cover, link_description, link_title, link_cover_size, scheduled_date) VALUES (40, null, null, null, '2021-10-03 20:29:03.00vo0000', 'EVERYONE', 'test tweet',  2, null, null, null, null, null, null);
INSERT INTO tweets (id, addressed_id, addressed_tweet_id, addressed_username, date_time, reply_type, text, user_id, link, link_cover, link_description, link_title, link_cover_size, scheduled_date) VALUES (41, 2, 40, 'MrCat', '2021-10-03 20:31:55.000000', 'EVERYONE', 'test reply', 1, null, null, null, null, null, null);
INSERT INTO tweets (id, addressed_id, addressed_tweet_id, addressed_username, date_time, reply_type, text, user_id, link, link_cover, link_description, link_title, link_cover_size, scheduled_date) VALUES (42, null, null, null, '2021-10-03 20:33:36.000000', 'EVERYONE', 'https://www.youtube.com/watch?v=ewZZNeYDiLo&ab_channel=TeamSESH', 2, 'https://www.youtube.com/watch?v=ewZZNeYDiLo&ab_channel=TeamSESH', 'https://i.ytimg.com/vi/ewZZNeYDiLo/mqdefault.jpg', null, 'Bones - RestInPeace', null, null);
INSERT INTO tweets (id, addressed_id, addressed_tweet_id, addressed_username, date_time, reply_type, text, user_id, link, link_cover, link_description, link_title, link_cover_size, scheduled_date) VALUES (43, null, null, null, '2021-10-03 20:34:15.000000', 'EVERYONE', '#JetBrains https://www.jetbrains.com/ ', 2, 'https://www.jetbrains.com/', 'https://resources.jetbrains.com/storage/products/jetbrains/img/meta/preview.png', 'JetBrains is a cutting-edge software vendor specializing in the creation of intelligent development tools, including IntelliJ IDEA – the leading Java IDE, and the Kotlin programming language.', 'JetBrains', 'LARGE', null);
INSERT INTO tweets (id, addressed_id, addressed_tweet_id, addressed_username, date_time, reply_type, text, user_id, link, link_cover, link_description, link_title, link_cover_size, scheduled_date) VALUES (44, null, null, null, '2021-10-03 20:36:25.000000', 'EVERYONE', 'test quote', 2, null, null, null, null, null, null);
INSERT INTO tweets (id, addressed_id, addressed_tweet_id, addressed_username, date_time, reply_type, text, user_id, link, link_cover, link_description, link_title, link_cover_size, scheduled_date) VALUES (45, null, null, null, '2021-10-03 20:38:51.000000', 'EVERYONE', 'media tweet test', 1, null, null, null, null, null, null);

-- users_tweets
INSERT INTO users_tweets (user_id, tweets_id) VALUES (2, 43);
INSERT INTO users_tweets (user_id, tweets_id) VALUES (2, 42);
INSERT INTO users_tweets (user_id, tweets_id) VALUES (2, 40);
INSERT INTO users_tweets (user_id, tweets_id) VALUES (2, 44);
INSERT INTO users_tweets (user_id, tweets_id) VALUES (1, 41);
INSERT INTO users_tweets (user_id, tweets_id) VALUES (1, 45);

-- pools
INSERT INTO pools (id, date_time) VALUES (2, '2021-10-10 20:29:03.812910');

-- tweet_pool
INSERT INTO tweet_pool (tweet_id, pools_id) VALUES (40 ,2);

-- tweet_quote
INSERT INTO tweet_quote (tweets_id, quote_tweet_id) VALUES (44, 43);
INSERT INTO tweet_quote (tweets_id, quote_tweet_id) VALUES (45, 40);

-- tweets_images
INSERT INTO tweets_images (tweet_id, images_id) VALUES (45, 1);

-- like_tweets
INSERT INTO like_tweets (id, like_tweet_date, tweets_id, users_id) VALUES (80, '2021-10-03 20:31:44.000000', 40, 1);
INSERT INTO like_tweets (id, like_tweet_date, tweets_id, users_id) VALUES (81, '2021-10-03 20:31:44.000000', 45, 2);

-- retweets
INSERT INTO retweets (id, retweet_date, tweets_id, users_id) VALUES (8, '2021-10-03 20:31:47.000000', 40, 1);
INSERT INTO retweets (id, retweet_date, tweets_id, users_id) VALUES (9, '2021-10-03 20:31:47.000000', 45, 2);

-- replies
INSERT INTO replies (tweets_id, reply_id) VALUES (40, 41);

-- user_pinned_tweet
INSERT INTO user_pinned_tweet (user_id, tweet_id) VALUES (2, 40);

-- pool_choices
INSERT INTO pool_choices (id, choice) VALUES (3, 'test 1');
INSERT INTO pool_choices (id, choice) VALUES (4, 'test 2');

-- pools_poll_choices
INSERT INTO pools_poll_choices (poll_id, poll_choices_id) VALUES (2, 3);
INSERT INTO pools_poll_choices (poll_id, poll_choices_id) VALUES (2, 4);

-- pool_choices_voted_user
INSERT INTO pool_choices_voted_user (poll_choice_id, voted_user_id) VALUES (4, 1);

-- tags
INSERT INTO tags (id, tag_name, tweets_quantity) VALUES (2, '#JetBrains', 1);
INSERT INTO tags (id, tag_name, tweets_quantity) VALUES (3, '#test', 1);

-- tweets_tags
INSERT INTO tweets_tags (tags_id, tweets_id) VALUES (2, 43);
INSERT INTO tweets_tags (tags_id, tweets_id) VALUES (3, 40);

-- bookmarks
INSERT INTO bookmarks (id, bookmark_date, tweet_id, users_id) VALUES (2, '2021-10-03 20:35:53.000000', 40, 2);

-- chats
INSERT INTO chats (id) VALUES (8);

-- chat_to_user
INSERT INTO chat_to_user (chat_id, user_id) VALUES (8, 2);
INSERT INTO chat_to_user (chat_id, user_id) VALUES (8, 1);

-- chat_messages
INSERT INTO chat_messages (id, date, text, user_id, chat_id, tweet_id) VALUES (5, '2021-10-03 20:39:55.000000', 'hello from MrCat', 2, 8, 40);
INSERT INTO chat_messages (id, date, text, user_id, chat_id, tweet_id) VALUES (6, '2021-10-03 20:40:19.000000', 'hello from Vbhjckfd1', 1, 8, null);
INSERT INTO chat_messages (id, date, text, user_id, chat_id, tweet_id) VALUES (7, '2021-10-03 20:41:03.000000', 'test message 2 from Vbhjckfd1', 1, 8, null);

-- unread_messages
INSERT INTO unread_messages (user_id, chat_message_id) VALUES (2, 7);
INSERT INTO unread_messages (user_id, chat_message_id) VALUES (1, 5);

-- lists
INSERT INTO lists (id, alt_wallpaper, description, private, name, user_id, wallpaper_id, pinned_date) VALUES (4, 'https://pbs.twimg.com/media/EXZ2rMvVAAAAfrN?format=png&name=small', 'test list description', false, 'test list name', 2, null, '2021-10-03 20:42:53.000000');
INSERT INTO lists (id, alt_wallpaper, description, private, name, user_id, wallpaper_id, pinned_date) VALUES (5, 'https://pbs.twimg.com/media/EXZ2rMvVAAAAfrN?format=png&name=small', 'test list description', false, 'test list name', 1, null, '2021-10-03 20:42:53.000000');
INSERT INTO lists (id, alt_wallpaper, description, private, name, user_id, wallpaper_id, pinned_date) VALUES (6, 'https://pbs.twimg.com/media/EXZ2rMvVAAAAfrN?format=png&name=small', 'test list description', false, 'test list name', 2, null, '2021-10-03 20:42:53.000000');

-- lists_followers
INSERT INTO lists_followers (lists_id, followers_id) VALUES (4, 1);

-- lists_members
INSERT INTO lists_members (lists_id, members_id) VALUES (4, 1);

-- users_user_lists
INSERT INTO users_user_lists (user_id, user_lists_id) VALUES (2, 4);
INSERT INTO users_user_lists (user_id, user_lists_id) VALUES (1, 4);

-- notifications
INSERT INTO notifications (id, date, notification_type, tweet_id, user_id, user_to_follow_id) VALUES (37, '2021-10-03 20:31:44.000000', 'LIKE', 40, 1, null);
INSERT INTO notifications (id, date, notification_type, tweet_id, user_id, user_to_follow_id) VALUES (38, '2021-10-03 20:31:47.000000', 'RETWEET', 40, 1, null);
INSERT INTO notifications (id, date, notification_type, tweet_id, user_id, user_to_follow_id) VALUES (39, '2021-10-03 20:37:12.000000', 'FOLLOW', null, 2, 1);
INSERT INTO notifications (id, date, notification_type, tweet_id, user_id, user_to_follow_id) VALUES (40, '2021-10-03 20:37:20.000000', 'FOLLOW', null, 1, 2);

-- user_subscriptions
INSERT INTO user_subscriptions (subscriber_id, user_id) VALUES (1, 2);
INSERT INTO user_subscriptions (subscriber_id, user_id) VALUES (2, 1);

-- users_bookmarks
INSERT INTO users_bookmarks (user_id, bookmarks_id) VALUES (2, 2);

-- users_notifications
INSERT INTO users_notifications (user_id, notifications_id) VALUES (1, 39);
INSERT INTO users_notifications (user_id, notifications_id) VALUES (2, 37);
INSERT INTO users_notifications (user_id, notifications_id) VALUES (2, 38);
INSERT INTO users_notifications (user_id, notifications_id) VALUES (2, 40);

-- user_blocked
INSERT INTO user_blocked (user_id, blocked_user_id) VALUES (2, 1);

-- user_muted
INSERT INTO user_muted (user_id, muted_user_id) VALUES (2, 1);
