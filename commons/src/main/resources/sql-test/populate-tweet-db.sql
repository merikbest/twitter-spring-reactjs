-- tweet_images
INSERT INTO "tweet-test".public.tweet_images (id, src) VALUES (1, 'https://twitterclonestorage.s3.eu-central-1.amazonaws.com/0a6c735d-def8-4587-a29f-221915ef6cb4_ff2d023b3220f93bbc79233614dea542.jpg');

-- polls
INSERT INTO "tweet-test".public.polls (id, date_time) VALUES (2, '2222-10-10 20:29:03.812910');
INSERT INTO "tweet-test".public.polls (id, date_time) VALUES (8, '2021-10-10 20:29:03.812910');

-- tweets
INSERT INTO "tweet-test".public.tweets (id, addressed_id, addressed_tweet_id, addressed_username, date_time, reply_type, text, author_id, link, link_cover, link_description, link_title, link_cover_size, scheduled_date, deleted, poll_id, list_id, image_description, gif_image_id) VALUES (39, null, null, null, '2021-10-03 20:29:03.00vo0000', 'EVERYONE', 'test tweet',  2, null, null, null, null, null, '3021-10-03 20:33:36.000000', false, null, null, null, null);
INSERT INTO "tweet-test".public.tweets (id, addressed_id, addressed_tweet_id, addressed_username, date_time, reply_type, text, author_id, link, link_cover, link_description, link_title, link_cover_size, scheduled_date, deleted, poll_id, list_id, image_description, gif_image_id) VALUES (40, null, null, null, '2021-10-03 20:29:03.00vo0000', 'EVERYONE', 'test tweet',  2, null, null, null, null, null, null, false, 2, null, null, null);
INSERT INTO "tweet-test".public.tweets (id, addressed_id, addressed_tweet_id, addressed_username, date_time, reply_type, text, author_id, link, link_cover, link_description, link_title, link_cover_size, scheduled_date, deleted, poll_id, list_id, image_description, gif_image_id) VALUES (41, 2, 40, 'MrCat', '2021-10-03 20:31:55.000000', 'EVERYONE', 'test reply', 1, null, null, null, null, null, null, false, null, null, null, null);
INSERT INTO "tweet-test".public.tweets (id, addressed_id, addressed_tweet_id, addressed_username, date_time, reply_type, text, author_id, link, link_cover, link_description, link_title, link_cover_size, scheduled_date, deleted, poll_id, list_id, image_description, gif_image_id) VALUES (42, null, null, null, '2021-10-03 20:33:36.000000', 'EVERYONE', 'https://www.youtube.com/watch?v=ewZZNeYDiLo&ab_channel=TeamSESH', 2, 'https://www.youtube.com/watch?v=ewZZNeYDiLo&ab_channel=TeamSESH', 'https://i.ytimg.com/vi/ewZZNeYDiLo/mqdefault.jpg', null, 'Bones - RestInPeace', null, null, false, null, null, null, null);
INSERT INTO "tweet-test".public.tweets (id, addressed_id, addressed_tweet_id, addressed_username, date_time, reply_type, text, author_id, link, link_cover, link_description, link_title, link_cover_size, scheduled_date, deleted, poll_id, list_id, image_description, gif_image_id) VALUES (43, null, null, null, '2021-10-03 20:34:15.000000', 'EVERYONE', '#JetBrains https://www.jetbrains.com/ ', 2, 'https://www.jetbrains.com/', 'https://resources.jetbrains.com/storage/products/jetbrains/img/meta/preview.png', 'JetBrains is a cutting-edge software vendor specializing in the creation of intelligent development tools, including IntelliJ IDEA – the leading Java IDE, and the Kotlin programming language.', 'JetBrains', 'LARGE', null, false, null, null, null, null);
INSERT INTO "tweet-test".public.tweets (id, addressed_id, addressed_tweet_id, addressed_username, date_time, reply_type, text, author_id, link, link_cover, link_description, link_title, link_cover_size, scheduled_date, deleted, poll_id, list_id, image_description, gif_image_id) VALUES (44, null, null, null, '2021-10-03 20:36:25.000000', 'EVERYONE', 'test quote', 2, null, null, null, null, null, null, false, null, null, null, null);
INSERT INTO "tweet-test".public.tweets (id, addressed_id, addressed_tweet_id, addressed_username, date_time, reply_type, text, author_id, link, link_cover, link_description, link_title, link_cover_size, scheduled_date, deleted, poll_id, list_id, image_description, gif_image_id) VALUES (45, null, null, null, '2021-10-03 20:38:51.000000', 'EVERYONE', 'media tweet test', 1, null, null, null, null, null, null, false, null, null, null, null);
INSERT INTO "tweet-test".public.tweets (id, addressed_id, addressed_tweet_id, addressed_username, date_time, reply_type, text, author_id, link, link_cover, link_description, link_title, link_cover_size, scheduled_date, deleted, poll_id, list_id, image_description, gif_image_id) VALUES (46, null, null, null, '2021-10-03 20:38:51.000000', 'EVERYONE', 'hello world1', 2, null, null, null, null, null, null, false, null, null, null, null);
INSERT INTO "tweet-test".public.tweets (id, addressed_id, addressed_tweet_id, addressed_username, date_time, reply_type, text, author_id, link, link_cover, link_description, link_title, link_cover_size, scheduled_date, deleted, poll_id, list_id, image_description, gif_image_id) VALUES (47, null, null, null, '2021-10-03 20:39:51.000000', 'EVERYONE', 'hello world2', 2, null, null, null, null, null, null, false, null, null, null, null);
INSERT INTO "tweet-test".public.tweets (id, addressed_id, addressed_tweet_id, addressed_username, date_time, reply_type, text, author_id, link, link_cover, link_description, link_title, link_cover_size, scheduled_date, deleted, poll_id, list_id, image_description, gif_image_id) VALUES (48, null, null, null, '2021-10-03 20:40:51.000000', 'EVERYONE', 'hello world3', 2, null, null, null, null, null, null, false, null, null, null, null);
INSERT INTO "tweet-test".public.tweets (id, addressed_id, addressed_tweet_id, addressed_username, date_time, reply_type, text, author_id, link, link_cover, link_description, link_title, link_cover_size, scheduled_date, deleted, poll_id, list_id, image_description, gif_image_id) VALUES (49, null, null, null, '2021-10-03 20:40:51.000000', 'EVERYONE', 'hello world3', 2, null, null, null, null, null, null, true, null, null, null, null);
INSERT INTO "tweet-test".public.tweets (id, addressed_id, addressed_tweet_id, addressed_username, date_time, reply_type, text, author_id, link, link_cover, link_description, link_title, link_cover_size, scheduled_date, deleted, poll_id, list_id, image_description, gif_image_id) VALUES (50, null, null, null, '2021-10-03 20:40:51.000000', 'EVERYONE', 'hello world3', 3, null, null, null, null, null, null, false, null, null, null, null);
INSERT INTO "tweet-test".public.tweets (id, addressed_id, addressed_tweet_id, addressed_username, date_time, reply_type, text, author_id, link, link_cover, link_description, link_title, link_cover_size, scheduled_date, deleted, poll_id, list_id, image_description, gif_image_id) VALUES (51, null, null, null, '2021-10-03 20:40:51.000000', 'EVERYONE', 'hello world3', 6, null, null, null, null, null, null, false, null, null, null, null);

-- tagged_image_users
INSERT INTO "tweet-test".public.tagged_image_users (tweet_id, tagged_image_user_id) VALUES (45, 1);
INSERT INTO "tweet-test".public.tagged_image_users (tweet_id, tagged_image_user_id) VALUES (45, 2);

-- tweet_quote
INSERT INTO "tweet-test".public.tweet_quote (tweet_id, quote_tweet_id) VALUES (44, 43);
INSERT INTO "tweet-test".public.tweet_quote (tweet_id, quote_tweet_id) VALUES (45, 40);

-- tweets_images
INSERT INTO "tweet-test".public.tweets_images (tweet_id, images_id) VALUES (45, 1);


-- liked_tweets (like_tweets)
INSERT INTO "tweet-test".public.liked_tweets (id, liked_tweet_date, tweet_id, user_id) VALUES (80, '2021-10-03 20:31:44.000000', 40, 1);
INSERT INTO "tweet-test".public.liked_tweets (id, liked_tweet_date, tweet_id, user_id) VALUES (81, '2021-10-03 20:31:44.000000', 45, 2);

-- retweets
INSERT INTO "tweet-test".public.retweets (id, retweet_date, tweet_id, user_id) VALUES (8, '2021-10-03 20:31:47.000000', 40, 1);
INSERT INTO "tweet-test".public.retweets (id, retweet_date, tweet_id, user_id) VALUES (9, '2021-10-03 20:31:47.000000', 45, 2);

-- replies
INSERT INTO "tweet-test".public.replies (tweet_id, reply_id) VALUES (40, 41);

-- quotes
INSERT INTO "tweet-test".public.quotes (tweet_id, quote_id) VALUES (44, 43);
INSERT INTO "tweet-test".public.quotes (tweet_id, quote_id) VALUES (45, 40);

-- poll_choices
INSERT INTO "tweet-test".public.poll_choices (id, choice) VALUES (9, 'test 1');
INSERT INTO "tweet-test".public.poll_choices (id, choice) VALUES (10, 'test 2');
INSERT INTO "tweet-test".public.poll_choices (id, choice) VALUES (11, 'test 3');
INSERT INTO "tweet-test".public.poll_choices (id, choice) VALUES (12, 'test 4');

-- polls_poll_choices
INSERT INTO "tweet-test".public.polls_poll_choices (poll_id, poll_choices_id) VALUES (2, 9);
INSERT INTO "tweet-test".public.polls_poll_choices (poll_id, poll_choices_id) VALUES (2, 10);
INSERT INTO "tweet-test".public.polls_poll_choices (poll_id, poll_choices_id) VALUES (8, 11);
INSERT INTO "tweet-test".public.polls_poll_choices (poll_id, poll_choices_id) VALUES (8, 12);

-- poll_choice_voted (pool_choices_voted_user)
INSERT INTO "tweet-test".public.poll_choice_voted (id, poll_choice_id, voted_user_id) VALUES (1, 10, 1);

-- bookmarks
INSERT INTO "tweet-test".public.bookmarks (id, bookmark_date, tweet_id, user_id) VALUES (2, '2021-10-03 20:35:53.000000', 40, 2);
