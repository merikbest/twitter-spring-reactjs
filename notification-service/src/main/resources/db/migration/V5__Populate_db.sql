-- users
INSERT INTO users (id, username, avatar) VALUES (1, 'Random', 'https://perfumeweb2.s3.eu-central-1.amazonaws.com/ae83099c-885b-499a-bb6f-5e34e1b69e7d_4ec7201fd370bd9870cdb326f0511f38.jpg');
INSERT INTO users (id, username, avatar) VALUES (2, 'Cat', 'https://perfumeweb2.s3.eu-central-1.amazonaws.com/348b7dbe-3ac5-477f-8483-edc24f53091b_814370.jpg');
INSERT INTO users (id, username, avatar) VALUES (3, 'Kitty', 'https://perfumeweb2.s3.eu-central-1.amazonaws.com/a7e03e7c-c05f-4e30-ba8c-2271fd0b4b43_779301.jpg');
INSERT INTO users (id, username, avatar) VALUES (4, 'JavaCat', 'https://perfumeweb2.s3.eu-central-1.amazonaws.com/b999d944-c9ec-4a9c-b356-db937211df5c_Ec1OBK3XsAEjVZR.png');
INSERT INTO users (id, username, avatar) VALUES (5, 'Кот Бегемот', 'https://perfumeweb2.s3.eu-central-1.amazonaws.com/68a7b0d5-2b0c-493e-85ff-098725c52ecc_Cl5DjoUWYAAslnd.jfif');

-- tweets
INSERT INTO tweets (id, tweet_type, tweet_text, author_id) VALUES (1, 'TWEET', 'My #FirstTweet :slightly_smiling_face:', 1);
INSERT INTO tweets (id, tweet_type, tweet_text, author_id) VALUES (2, 'TWEET', 'https://www.youtube.com/watch?v=ewZZNeYDiLo&ab_channel=TeamSESH', 1);
INSERT INTO tweets (id, tweet_type, tweet_text, author_id) VALUES (3, 'TWEET', 'https://www.youtube.com/watch?v=-k9qDxyxS3s&ab_channel=BMTHOfficialVEVO', 1);
INSERT INTO tweets (id, tweet_type, tweet_text, author_id) VALUES (4, 'TWEET', 'https://www.youtube.com/watch?v=hTWKbfoikeg&ab_channel=NirvanaVEVO', 1);
INSERT INTO tweets (id, tweet_type, tweet_text, author_id) VALUES (5, 'TWEET', 'Another #FirstTweet', 2);
INSERT INTO tweets (id, tweet_type, tweet_text, author_id) VALUES (6, 'TWEET', '#myCat  :smile_cat:', 2);
INSERT INTO tweets (id, tweet_type, tweet_text, author_id) VALUES (7, 'TWEET', 'Hello #FirstTweet  :sunglasses:', 3);
INSERT INTO tweets (id, tweet_type, tweet_text, author_id) VALUES (8, 'TWEET', '#myCat  :smiley_cat:', 3);
INSERT INTO tweets (id, tweet_type, tweet_text, author_id) VALUES (9, 'TWEET', '#FirstTweet', 4);
INSERT INTO tweets (id, tweet_type, tweet_text, author_id) VALUES (10, 'TWEET', '#myCat  :kissing_cat:', 4);
INSERT INTO tweets (id, tweet_type, tweet_text, author_id) VALUES (11, 'TWEET', 'My #FirstTweet', 5);
INSERT INTO tweets (id, tweet_type, tweet_text, author_id) VALUES (12, 'TWEET', '#myCat  :smiley_cat:', 5);
INSERT INTO tweets (id, tweet_type, tweet_text, author_id) VALUES (13, 'TWEET', '#JavaScript', 4);
INSERT INTO tweets (id, tweet_type, tweet_text, author_id) VALUES (14, 'TWEET', 'Feels Good Man  :sunglasses:', 1);
INSERT INTO tweets (id, tweet_type, tweet_text, author_id) VALUES (15, 'TWEET', 'Hello :wave:', 1);
INSERT INTO tweets (id, tweet_type, tweet_text, author_id) VALUES (16, 'REPLY', 'Feels good man  :sunglasses:', 2);

-- notifications
INSERT INTO notifications (id, created_at, notification_type, tweet_id, user_id, user_to_follow_id, list_id, notified_user_id) VALUES (1, '2021-10-15 21:36:52.000000', 'LIKE', 1, 2, null, null, 1);
INSERT INTO notifications (id, created_at, notification_type, tweet_id, user_id, user_to_follow_id, list_id, notified_user_id) VALUES (2, '2021-10-15 21:37:01.000000', 'LIKE', 2, 2, null, null, 1);
INSERT INTO notifications (id, created_at, notification_type, tweet_id, user_id, user_to_follow_id, list_id, notified_user_id) VALUES (3, '2021-10-15 21:37:03.000000', 'LIKE', 3, 2, null, null, 1);
INSERT INTO notifications (id, created_at, notification_type, tweet_id, user_id, user_to_follow_id, list_id, notified_user_id) VALUES (4, '2021-10-15 21:37:05.000000', 'LIKE', 4, 2, null, null, 1);
INSERT INTO notifications (id, created_at, notification_type, tweet_id, user_id, user_to_follow_id, list_id, notified_user_id) VALUES (5, '2021-10-15 21:37:10.000000', 'LIKE', 7, 2, null, null, 3);
INSERT INTO notifications (id, created_at, notification_type, tweet_id, user_id, user_to_follow_id, list_id, notified_user_id) VALUES (6, '2021-10-15 21:37:11.000000', 'LIKE', 8, 2, null, null, 3);
INSERT INTO notifications (id, created_at, notification_type, tweet_id, user_id, user_to_follow_id, list_id, notified_user_id) VALUES (7, '2021-10-15 21:37:14.000000', 'LIKE', 9, 2, null, null, 4);
INSERT INTO notifications (id, created_at, notification_type, tweet_id, user_id, user_to_follow_id, list_id, notified_user_id) VALUES (8, '2021-10-15 21:37:15.000000', 'LIKE', 10, 2, null, null, 4);
INSERT INTO notifications (id, created_at, notification_type, tweet_id, user_id, user_to_follow_id, list_id, notified_user_id) VALUES (9, '2021-10-15 21:37:17.000000', 'LIKE', 11, 2, null, null, 5);
INSERT INTO notifications (id, created_at, notification_type, tweet_id, user_id, user_to_follow_id, list_id, notified_user_id) VALUES (10, '2021-10-15 21:37:18.000000', 'LIKE', 12, 2, null, null, 5);
INSERT INTO notifications (id, created_at, notification_type, tweet_id, user_id, user_to_follow_id, list_id, notified_user_id) VALUES (11, '2021-10-15 21:43:36.000000', 'LIKE', 5, 1, null, null, 2);
INSERT INTO notifications (id, created_at, notification_type, tweet_id, user_id, user_to_follow_id, list_id, notified_user_id) VALUES (12, '2021-10-15 21:43:39.000000', 'LIKE', 6, 1, null, null, 2);
INSERT INTO notifications (id, created_at, notification_type, tweet_id, user_id, user_to_follow_id, list_id, notified_user_id) VALUES (13, '2021-10-15 21:43:52.000000', 'FOLLOW', null, 1, 2, null, 2);
INSERT INTO notifications (id, created_at, notification_type, tweet_id, user_id, user_to_follow_id, list_id, notified_user_id) VALUES (14, '2021-10-15 21:50:56.000000', 'RETWEET', 10, 1, null, null, 4);
INSERT INTO notifications (id, created_at, notification_type, tweet_id, user_id, user_to_follow_id, list_id, notified_user_id) VALUES (15, '2021-10-15 22:00:37.000000', 'LIKE', 13, 2, null, null, 4);
INSERT INTO notifications (id, created_at, notification_type, tweet_id, user_id, user_to_follow_id, list_id, notified_user_id) VALUES (16, '2021-10-15 22:00:41.000000', 'RETWEET', 13, 2, null, null, 4);
INSERT INTO notifications (id, created_at, notification_type, tweet_id, user_id, user_to_follow_id, list_id, notified_user_id) VALUES (17, '2021-10-15 22:01:19.000000', 'FOLLOW', null, 2, 1, null, 1);
INSERT INTO notifications (id, created_at, notification_type, tweet_id, user_id, user_to_follow_id, list_id, notified_user_id) VALUES (18, '2021-10-15 22:07:48.000000', 'RETWEET', 10, 2, null, null, 4);
INSERT INTO notifications (id, created_at, notification_type, tweet_id, user_id, user_to_follow_id, list_id, notified_user_id) VALUES (19, '2021-10-15 22:10:37.000000', 'RETWEET', 13, 1, null, null, 4);
INSERT INTO notifications (id, created_at, notification_type, tweet_id, user_id, user_to_follow_id, list_id, notified_user_id) VALUES (20, '2021-10-15 22:37:51.000000', 'RETWEET', 8, 1, null, null, 3);
INSERT INTO notifications (id, created_at, notification_type, tweet_id, user_id, user_to_follow_id, list_id, notified_user_id) VALUES (21, '2021-10-15 22:39:04.000000', 'LIKE', 8, 1, null, null, 3);
INSERT INTO notifications (id, created_at, notification_type, tweet_id, user_id, user_to_follow_id, list_id, notified_user_id) VALUES (22, '2021-10-15 22:45:53.000000', 'FOLLOW', null, 1, 5, null, 5);
