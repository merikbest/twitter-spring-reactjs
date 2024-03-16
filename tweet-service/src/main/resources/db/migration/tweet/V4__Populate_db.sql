-- users
INSERT INTO users(id, full_name, username, private_profile, active, about, avatar, muted_direct_messages, pinned_tweet_id) VALUES (1, 'Random', 'Random', true, true, null, 'https://perfumeweb2.s3.eu-central-1.amazonaws.com/ae83099c-885b-499a-bb6f-5e34e1b69e7d_4ec7201fd370bd9870cdb326f0511f38.jpg', true, 1);
INSERT INTO users(id, full_name, username, private_profile, active, about, avatar, muted_direct_messages, pinned_tweet_id) VALUES (2, 'MrCat', 'Cat', true, true, 'Hello twitter!', 'https://perfumeweb2.s3.eu-central-1.amazonaws.com/348b7dbe-3ac5-477f-8483-edc24f53091b_814370.jpg', false, null);
INSERT INTO users(id, full_name, username, private_profile, active, about, avatar, muted_direct_messages, pinned_tweet_id) VALUES (3, 'Kitty', 'Kitty', true, true, 'Hello twitter!', 'https://perfumeweb2.s3.eu-central-1.amazonaws.com/a7e03e7c-c05f-4e30-ba8c-2271fd0b4b43_779301.jpg', true, null);
INSERT INTO users(id, full_name, username, private_profile, active, about, avatar, muted_direct_messages, pinned_tweet_id) VALUES (4, 'JavaCat', 'JavaCat', false, true, 'Hello twitter!', 'https://perfumeweb2.s3.eu-central-1.amazonaws.com/b999d944-c9ec-4a9c-b356-db937211df5c_Ec1OBK3XsAEjVZR.png', false, null);
INSERT INTO users(id, full_name, username, private_profile, active, about, avatar, muted_direct_messages, pinned_tweet_id) VALUES (5, 'КотБегемот', 'Кот Бегемот', false, true, 'Hello twitter!', 'https://perfumeweb2.s3.eu-central-1.amazonaws.com/68a7b0d5-2b0c-493e-85ff-098725c52ecc_Cl5DjoUWYAAslnd.jfif', false, null);
-- user_subscriptions
INSERT INTO user_subscriptions (subscriber_id, user_id) VALUES (1, 2);
INSERT INTO user_subscriptions (subscriber_id, user_id) VALUES (1, 3);
INSERT INTO user_subscriptions (subscriber_id, user_id) VALUES (1, 4);
INSERT INTO user_subscriptions (subscriber_id, user_id) VALUES (1, 5);
INSERT INTO user_subscriptions (subscriber_id, user_id) VALUES (2, 1);
INSERT INTO user_subscriptions (subscriber_id, user_id) VALUES (5, 1);
-- tweets
INSERT INTO tweets (id, addressed_id, addressed_tweet_id, addressed_username, date_time, link, link_cover, link_cover_size, link_description, link_title, reply_type, scheduled_date, tweet_text, author_id, deleted, poll_id, list_id, image_description, gif_image_id) VALUES (1, null, null, null, '2021-10-15 21:20:15.000000', null, null, null, null, null, 'EVERYONE', null, 'My #FirstTweet :slightly_smiling_face:', 1, false, null, null, null, null);
INSERT INTO tweets (id, addressed_id, addressed_tweet_id, addressed_username, date_time, link, link_cover, link_cover_size, link_description, link_title, reply_type, scheduled_date, tweet_text, author_id, deleted, poll_id, list_id, image_description, gif_image_id) VALUES (7, null, null, null, '2021-10-15 21:20:27.000000', null, null, null, null, null, 'EVERYONE', null, 'Hello #FirstTweet  :sunglasses:', 3, false, null, null, null, null);
INSERT INTO tweets (id, addressed_id, addressed_tweet_id, addressed_username, date_time, link, link_cover, link_cover_size, link_description, link_title, reply_type, scheduled_date, tweet_text, author_id, deleted, poll_id, list_id, image_description, gif_image_id) VALUES (13, null, null, null, '2021-10-15 21:57:21.000000', null, null, null, null, null, 'EVERYONE', null, '#JavaScript', 4, false, null, null, null, null);
INSERT INTO tweets (id, addressed_id, addressed_tweet_id, addressed_username, date_time, link, link_cover, link_cover_size, link_description, link_title, reply_type, scheduled_date, tweet_text, author_id, deleted, poll_id, list_id, image_description, gif_image_id) VALUES (10, null, null, null, '2021-10-15 21:21:48.000000', null, null, null, null, null, 'EVERYONE', null, '#myCat  :kissing_cat:', 4, false, null, null, null, null);
INSERT INTO tweets (id, addressed_id, addressed_tweet_id, addressed_username, date_time, link, link_cover, link_cover_size, link_description, link_title, reply_type, scheduled_date, tweet_text, author_id, deleted, poll_id, list_id, image_description, gif_image_id) VALUES (12, null, null, null, '2021-10-15 21:23:41.000000', null, null, null, null, null, 'MENTION', null, '#myCat  :smiley_cat:', 5, false, null, null, null, null);
INSERT INTO tweets (id, addressed_id, addressed_tweet_id, addressed_username, date_time, link, link_cover, link_cover_size, link_description, link_title, reply_type, scheduled_date, tweet_text, author_id, deleted, poll_id, list_id, image_description, gif_image_id) VALUES (11, null, null, null, '2021-10-15 21:22:23.000000', null, null, null, null, null, 'EVERYONE', null, 'My #FirstTweet', 5, false, null, null, null, null);
INSERT INTO tweets (id, addressed_id, addressed_tweet_id, addressed_username, date_time, link, link_cover, link_cover_size, link_description, link_title, reply_type, scheduled_date, tweet_text, author_id, deleted, poll_id, list_id, image_description, gif_image_id) VALUES (16, null, 10, 'JavaCat', '2021-10-15 22:21:30.000000', null, null, null, null, null, 'EVERYONE', null, 'Feels good man  :sunglasses:', 2, false, null, null, null, null);
INSERT INTO tweets (id, addressed_id, addressed_tweet_id, addressed_username, date_time, link, link_cover, link_cover_size, link_description, link_title, reply_type, scheduled_date, tweet_text, author_id, deleted, poll_id, list_id, image_description, gif_image_id) VALUES (8, null, null, null, '2021-10-15 21:20:30.000000', null, null, null, null, null, 'FOLLOW', null, '#myCat  :smiley_cat:', 3, false, null, null, null, null);
INSERT INTO tweets (id, addressed_id, addressed_tweet_id, addressed_username, date_time, link, link_cover, link_cover_size, link_description, link_title, reply_type, scheduled_date, tweet_text, author_id, deleted, poll_id, list_id, image_description, gif_image_id) VALUES (9, null, null, null, '2021-10-15 21:20:33.000000', null, null, null, null, null, 'EVERYONE', null, '#FirstTweet', 4, false, null, null, null, null);
INSERT INTO tweets (id, addressed_id, addressed_tweet_id, addressed_username, date_time, link, link_cover, link_cover_size, link_description, link_title, reply_type, scheduled_date, tweet_text, author_id, deleted, poll_id, list_id, image_description, gif_image_id) VALUES (6, null, null, null, '2021-10-15 21:20:26.000000', null, null, null, null, null, 'EVERYONE', null, '#myCat  :smile_cat:', 2, false, null, null, null, null);
INSERT INTO tweets (id, addressed_id, addressed_tweet_id, addressed_username, date_time, link, link_cover, link_cover_size, link_description, link_title, reply_type, scheduled_date, tweet_text, author_id, deleted, poll_id, list_id, image_description, gif_image_id) VALUES (5, null, null, null, '2021-10-15 21:20:24.000000', null, null, null, null, null, 'EVERYONE', null, 'Another #FirstTweet', 2, false, null, null, null, null);
INSERT INTO tweets (id, addressed_id, addressed_tweet_id, addressed_username, date_time, link, link_cover, link_cover_size, link_description, link_title, reply_type, scheduled_date, tweet_text, author_id, deleted, poll_id, list_id, image_description, gif_image_id) VALUES (15, null, null, null, '2021-10-15 22:11:59.000000', null, null, null, null, null, 'EVERYONE', null, 'Hello :wave:', 1, false, null, null, null, null);
INSERT INTO tweets (id, addressed_id, addressed_tweet_id, addressed_username, date_time, link, link_cover, link_cover_size, link_description, link_title, reply_type, scheduled_date, tweet_text, author_id, deleted, poll_id, list_id, image_description, gif_image_id) VALUES (14, null, null, null, '2021-10-15 22:10:14.000000', null, null, null, null, null, 'MENTION', null, 'Feels Good Man  :sunglasses:', 1, false, null, null, null, null);
INSERT INTO tweets (id, addressed_id, addressed_tweet_id, addressed_username, date_time, link, link_cover, link_cover_size, link_description, link_title, reply_type, scheduled_date, tweet_text, author_id, deleted, poll_id, list_id, image_description, gif_image_id) VALUES (4, null, null, null, '2021-10-15 21:20:22.000000', 'https://www.youtube.com/watch?v=hTWKbfoikeg&ab_channel=NirvanaVEVO', 'https://i.ytimg.com/vi/hTWKbfoikeg/mqdefault.jpg', null, null, 'Nirvana - Smells Like Teen Spirit (Official Music Video)', 'EVERYONE', null, 'https://www.youtube.com/watch?v=hTWKbfoikeg&ab_channel=NirvanaVEVO', 1, false, null, null, null, null);
INSERT INTO tweets (id, addressed_id, addressed_tweet_id, addressed_username, date_time, link, link_cover, link_cover_size, link_description, link_title, reply_type, scheduled_date, tweet_text, author_id, deleted, poll_id, list_id, image_description, gif_image_id) VALUES (3, null, null, null, '2021-10-15 21:20:21.000000', 'https://www.youtube.com/watch?v=-k9qDxyxS3s&ab_channel=BMTHOfficialVEVO', 'https://i.ytimg.com/vi/-k9qDxyxS3s/mqdefault.jpg', null, null, 'Bring Me The Horizon - Shadow Moses (Official Video)', 'EVERYONE', null, 'https://www.youtube.com/watch?v=-k9qDxyxS3s&ab_channel=BMTHOfficialVEVO', 1, false, null, null, null, null);
INSERT INTO tweets (id, addressed_id, addressed_tweet_id, addressed_username, date_time, link, link_cover, link_cover_size, link_description, link_title, reply_type, scheduled_date, tweet_text, author_id, deleted, poll_id, list_id, image_description, gif_image_id) VALUES (2, null, null, null, '2021-10-15 21:20:18.000000', 'https://www.youtube.com/watch?v=ewZZNeYDiLo&ab_channel=TeamSESH', 'https://i.ytimg.com/vi/ewZZNeYDiLo/mqdefault.jpg', null, null, 'Bones - RestInPeace', 'EVERYONE', null, 'https://www.youtube.com/watch?v=ewZZNeYDiLo&ab_channel=TeamSESH', 1, false, null, null, null, null);
-- tweet_images
INSERT INTO tweet_images (id, src) VALUES (1, 'https://perfumeweb2.s3.eu-central-1.amazonaws.com/0a6c735d-def8-4587-a29f-221915ef6cb4_ff2d023b3220f93bbc79233614dea542.jpg');
INSERT INTO tweet_images (id, src) VALUES (4, 'https://perfumeweb2.s3.eu-central-1.amazonaws.com/25e1a117-8eac-4156-9cc3-2311319082af_EH0yOTgWwAAXPdT.png');
INSERT INTO tweet_images (id, src) VALUES (6, 'https://perfumeweb2.s3.eu-central-1.amazonaws.com/ac48eb0e-73e7-4887-a523-47c5a557d1ad_Ec1OBK3XsAEjVZR.png');
INSERT INTO tweet_images (id, src) VALUES (8, 'https://perfumeweb2.s3.eu-central-1.amazonaws.com/a2692fac-4b70-4828-845c-2fe439473f82_Cl5DjoUWYAAslnd.jfif');
-- tweets_images
INSERT INTO tweets_images (tweet_id, images_id) VALUES (6, 1);
INSERT INTO tweets_images (tweet_id, images_id) VALUES (8, 4);
INSERT INTO tweets_images (tweet_id, images_id) VALUES (10, 6);
INSERT INTO tweets_images (tweet_id, images_id) VALUES (12, 8);
-- tweet_quote
INSERT INTO tweet_quote (quote_tweet_id, tweet_id) VALUES (13, 15);
-- replies
INSERT INTO replies (tweet_id, reply_id) VALUES (10, 16);
-- quotes
INSERT INTO quotes (tweet_id, quote_id) VALUES (13, 15);
-- liked_tweets
INSERT INTO liked_tweets (liked_tweet_date, tweet_id, user_id) VALUES ('2021-10-15 21:36:52.000000', 1, 2);
INSERT INTO liked_tweets (liked_tweet_date, tweet_id, user_id) VALUES ('2021-10-15 21:37:01.000000', 2, 2);
INSERT INTO liked_tweets (liked_tweet_date, tweet_id, user_id) VALUES ('2021-10-15 21:37:03.000000', 3, 2);
INSERT INTO liked_tweets (liked_tweet_date, tweet_id, user_id) VALUES ('2021-10-15 21:37:05.000000', 4, 2);
INSERT INTO liked_tweets (liked_tweet_date, tweet_id, user_id) VALUES ('2021-10-15 21:37:06.000000', 5, 2);
INSERT INTO liked_tweets (liked_tweet_date, tweet_id, user_id) VALUES ('2021-10-15 21:37:08.000000', 6, 2);
INSERT INTO liked_tweets (liked_tweet_date, tweet_id, user_id) VALUES ('2021-10-15 21:37:10.000000', 7, 2);
INSERT INTO liked_tweets (liked_tweet_date, tweet_id, user_id) VALUES ('2021-10-15 21:37:11.000000', 8, 2);
INSERT INTO liked_tweets (liked_tweet_date, tweet_id, user_id) VALUES ('2021-10-15 21:37:14.000000', 9, 2);
INSERT INTO liked_tweets (liked_tweet_date, tweet_id, user_id) VALUES ('2021-10-15 21:37:15.000000', 10, 2);
INSERT INTO liked_tweets (liked_tweet_date, tweet_id, user_id) VALUES ('2021-10-15 21:37:17.000000', 11, 2);
INSERT INTO liked_tweets (liked_tweet_date, tweet_id, user_id) VALUES ('2021-10-15 21:37:18.000000', 12, 2);
INSERT INTO liked_tweets (liked_tweet_date, tweet_id, user_id) VALUES ('2021-10-15 21:43:36.000000', 5, 1);
INSERT INTO liked_tweets (liked_tweet_date, tweet_id, user_id) VALUES ('2021-10-15 21:43:39.000000', 6, 1);
INSERT INTO liked_tweets (liked_tweet_date, tweet_id, user_id) VALUES ('2021-10-15 22:00:37.000000', 13, 2);
INSERT INTO liked_tweets (liked_tweet_date, tweet_id, user_id) VALUES ('2021-10-15 22:08:53.000000', 1, 1);
INSERT INTO liked_tweets (liked_tweet_date, tweet_id, user_id) VALUES ('2021-10-15 22:39:04.000000', 8, 1);
-- retweets
INSERT INTO retweets (retweet_date, tweet_id, user_id) VALUES ('2021-10-15 21:50:56.000000', 10, 1);
INSERT INTO retweets (retweet_date, tweet_id, user_id) VALUES ('2021-10-15 22:00:41.000000', 13, 2);
INSERT INTO retweets (retweet_date, tweet_id, user_id) VALUES ('2021-10-15 22:07:48.000000', 10, 2);
-- bookmarks
INSERT INTO bookmarks (bookmark_date, tweet_id, user_id) VALUES ('2022-02-10 21:09:18.000000', 8, 1);
INSERT INTO bookmarks (bookmark_date, tweet_id, user_id) VALUES ('2022-02-10 21:09:28.000000', 15, 1);
