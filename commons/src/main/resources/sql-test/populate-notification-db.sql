-- users
INSERT INTO "notification-test".public.users (id, username, avatar) VALUES (1, 'John_Doe', 'https://twitterclonestorage.s3.eu-central-1.amazonaws.com/348b7dbe-3ac5-477f-8483-edc24f53091b_814370.jpg');
INSERT INTO "notification-test".public.users (id, username, avatar) VALUES (2, 'MrCat', 'https://twitterclonestorage.s3.eu-central-1.amazonaws.com/348b7dbe-3ac5-477f-8483-edc24f53091b_814370.jpg');

-- tweets
INSERT INTO "notification-test".public.tweets (id, tweet_type, tweet_text, author_id) VALUES (40, 'TWEET', 'test tweet',  2);
INSERT INTO "notification-test".public.tweets (id, tweet_type, tweet_text, author_id) VALUES (45, 'TWEET', 'media tweet test', 1);
INSERT INTO "notification-test".public.tweets (id, tweet_type, tweet_text, author_id) VALUES (46, 'TWEET', 'hello world1', 2);
INSERT INTO "notification-test".public.tweets (id, tweet_type, tweet_text, author_id) VALUES (47, 'TWEET', 'hello world2', 2);
INSERT INTO "notification-test".public.tweets (id, tweet_type, tweet_text, author_id) VALUES (48, 'TWEET', 'hello world3', 2);

-- notifications
INSERT INTO "notification-test".public.notifications (id, created_at, notification_type, tweet_id, user_id, user_to_follow_id, list_id, notified_user_id) VALUES (37, '2021-10-03 20:31:44.000000', 'LIKE', 40, 1, null, null, 2);
INSERT INTO "notification-test".public.notifications (id, created_at, notification_type, tweet_id, user_id, user_to_follow_id, list_id, notified_user_id) VALUES (38, '2021-10-03 20:31:47.000000', 'RETWEET', 40, 1, null, null, 2);
INSERT INTO "notification-test".public.notifications (id, created_at, notification_type, tweet_id, user_id, user_to_follow_id, list_id, notified_user_id) VALUES (39, '2021-10-03 20:37:12.000000', 'FOLLOW', null, 2, 1, null, 1);
INSERT INTO "notification-test".public.notifications (id, created_at, notification_type, tweet_id, user_id, user_to_follow_id, list_id, notified_user_id) VALUES (40, '2021-10-03 20:37:20.000000', 'FOLLOW', null, 1, 2, null, 2);
INSERT INTO "notification-test".public.notifications (id, created_at, notification_type, tweet_id, user_id, user_to_follow_id, list_id, notified_user_id) VALUES (41, '2021-10-03 20:38:51.000000', 'TWEET', 46, 2, null, null, 2);
INSERT INTO "notification-test".public.notifications (id, created_at, notification_type, tweet_id, user_id, user_to_follow_id, list_id, notified_user_id) VALUES (42, '2021-10-03 20:39:51.000000', 'TWEET', 47, 2, null, null, 2);
INSERT INTO "notification-test".public.notifications (id, created_at, notification_type, tweet_id, user_id, user_to_follow_id, list_id, notified_user_id) VALUES (43, '2021-10-03 20:40:51.000000', 'TWEET', 48, 2, null, null, 2);
INSERT INTO "notification-test".public.notifications (id, created_at, notification_type, tweet_id, user_id, user_to_follow_id, list_id, notified_user_id) VALUES (44, '2021-10-03 20:40:51.000000', 'TWEET', 45, 2, null, null, 1);
INSERT INTO "notification-test".public.notifications (id, created_at, notification_type, tweet_id, user_id, user_to_follow_id, list_id, notified_user_id) VALUES (45, '2021-10-03 20:40:51.000000', 'MENTION', 45, 1, null, null, 2);
