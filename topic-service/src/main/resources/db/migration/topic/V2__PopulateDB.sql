-- topics
INSERT INTO topics (id, topic_category, topic_name) VALUES (1001, null, 'Elon Musk');
INSERT INTO topics (id, topic_category, topic_name) VALUES (1002, null, 'Technology');
INSERT INTO topics (id, topic_category, topic_name) VALUES (1003, null, 'Web development');
INSERT INTO topics (id, topic_category, topic_name) VALUES (1004, null, 'Entertainment');
INSERT INTO topics (id, topic_category, topic_name) VALUES (1005, null, 'Digital creators');
INSERT INTO topics (id, topic_category, topic_name) VALUES (1006, null, 'Kanye West');
INSERT INTO topics (id, topic_category, topic_name) VALUES (1007, 'GAMING', 'Animal Crossing');
INSERT INTO topics (id, topic_category, topic_name) VALUES (1008, 'GAMING', 'Minecraft');
INSERT INTO topics (id, topic_category, topic_name) VALUES (1009, 'GAMING', 'MrBeast');
INSERT INTO topics (id, topic_category, topic_name) VALUES (1010, 'GAMING', 'PewDiePie');
INSERT INTO topics (id, topic_category, topic_name) VALUES (1011, null, 'Science');
INSERT INTO topics (id, topic_category, topic_name) VALUES (1012, null, 'Cats');
INSERT INTO topics (id, topic_category, topic_name) VALUES (1013, null, 'Dogs');
INSERT INTO topics (id, topic_category, topic_name) VALUES (1014, null, 'Bitcoin');
INSERT INTO topics (id, topic_category, topic_name) VALUES (1016, null, 'Xbox');
INSERT INTO topics (id, topic_category, topic_name) VALUES (1017, 'GAMING', 'Game');
INSERT INTO topics (id, topic_category, topic_name) VALUES (1018, 'GAMING', 'Cyberpunk 2077');
INSERT INTO topics (id, topic_category, topic_name) VALUES (1019, 'ONLY_ON_TWITTER', 'Funny Tweets');
INSERT INTO topics (id, topic_category, topic_name) VALUES (1020, 'ONLY_ON_TWITTER', 'Viral Tweets');
INSERT INTO topics (id, topic_category, topic_name) VALUES (1021, 'ONLY_ON_TWITTER', 'Based on your searches');
INSERT INTO topics (id, topic_category, topic_name) VALUES (1022, 'ONLY_ON_TWITTER', 'Spaces You Might Like');
INSERT INTO topics (id, topic_category, topic_name) VALUES (1023, 'ONLY_ON_TWITTER', 'Popular images');
INSERT INTO topics (id, topic_category, topic_name) VALUES (1024, 'ONLY_ON_TWITTER', 'Popular videos');
INSERT INTO topics (id, topic_category, topic_name) VALUES (1025, 'ONLY_ON_TWITTER', 'Days of celebration');
INSERT INTO topics (id, topic_category, topic_name) VALUES (1026, 'ONLY_ON_TWITTER', 'On this day');
INSERT INTO topics (id, topic_category, topic_name) VALUES (1027, 'GAMING', 'Game development');
INSERT INTO topics (id, topic_category, topic_name) VALUES (1028, 'GAMING', 'Among Us');

-- users
INSERT INTO users(id, full_name, username, private_profile) VALUES (1, 'Random', 'Random', true);
INSERT INTO users(id, full_name, username, private_profile) VALUES (2, 'MrCat', 'Cat', true);
INSERT INTO users(id, full_name, username, private_profile) VALUES (3, 'Kitty', 'Kitty', true);
INSERT INTO users(id, full_name, username, private_profile) VALUES (4, 'JavaCat', 'JavaCat', false);
INSERT INTO users(id, full_name, username, private_profile) VALUES (5, 'КотБегемот', 'Кот Бегемот', false);

-- user_subscriptions
INSERT INTO user_subscriptions (subscriber_id, user_id) VALUES (1, 2);
INSERT INTO user_subscriptions (subscriber_id, user_id) VALUES (1, 3);
INSERT INTO user_subscriptions (subscriber_id, user_id) VALUES (1, 4);
INSERT INTO user_subscriptions (subscriber_id, user_id) VALUES (1, 5);
INSERT INTO user_subscriptions (subscriber_id, user_id) VALUES (2, 1);
INSERT INTO user_subscriptions (subscriber_id, user_id) VALUES (5, 1);
