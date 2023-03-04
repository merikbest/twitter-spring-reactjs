-- topics
INSERT INTO "topic-test".public.topics (id, topic_category, topic_name) VALUES (1001, null, 'Elon Musk');
INSERT INTO "topic-test".public.topics (id, topic_category, topic_name) VALUES (1002, null, 'Technology');
INSERT INTO "topic-test".public.topics (id, topic_category, topic_name) VALUES (1003, null, 'Web development');
INSERT INTO "topic-test".public.topics (id, topic_category, topic_name) VALUES (1004, null, 'Entertainment');
INSERT INTO "topic-test".public.topics (id, topic_category, topic_name) VALUES (1005, null, 'Digital creators');
INSERT INTO "topic-test".public.topics (id, topic_category, topic_name) VALUES (1006, null, 'Kanye West');
INSERT INTO "topic-test".public.topics (id, topic_category, topic_name) VALUES (1007, 'GAMING', 'Animal Crossing');
INSERT INTO "topic-test".public.topics (id, topic_category, topic_name) VALUES (1008, 'GAMING', 'Minecraft');
INSERT INTO "topic-test".public.topics (id, topic_category, topic_name) VALUES (1009, 'GAMING', 'MrBeast');
INSERT INTO "topic-test".public.topics (id, topic_category, topic_name) VALUES (1010, 'GAMING', 'PewDiePie');
INSERT INTO "topic-test".public.topics (id, topic_category, topic_name) VALUES (1011, null, 'Science');
INSERT INTO "topic-test".public.topics (id, topic_category, topic_name) VALUES (1012, null, 'Cats');
INSERT INTO "topic-test".public.topics (id, topic_category, topic_name) VALUES (1013, null, 'Dogs');
INSERT INTO "topic-test".public.topics (id, topic_category, topic_name) VALUES (1014, null, 'Bitcoin');
INSERT INTO "topic-test".public.topics (id, topic_category, topic_name) VALUES (1016, null, 'Xbox');
INSERT INTO "topic-test".public.topics (id, topic_category, topic_name) VALUES (1017, 'GAMING', 'Game');
INSERT INTO "topic-test".public.topics (id, topic_category, topic_name) VALUES (1018, 'GAMING', 'Cyberpunk 2077');
INSERT INTO "topic-test".public.topics (id, topic_category, topic_name) VALUES (1019, 'ONLY_ON_TWITTER', 'Funny Tweets');
INSERT INTO "topic-test".public.topics (id, topic_category, topic_name) VALUES (1020, 'ONLY_ON_TWITTER', 'Viral Tweets');
INSERT INTO "topic-test".public.topics (id, topic_category, topic_name) VALUES (1021, 'ONLY_ON_TWITTER', 'Based on your searches');
INSERT INTO "topic-test".public.topics (id, topic_category, topic_name) VALUES (1022, 'ONLY_ON_TWITTER', 'Spaces You Might Like');
INSERT INTO "topic-test".public.topics (id, topic_category, topic_name) VALUES (1023, 'ONLY_ON_TWITTER', 'Popular images');
INSERT INTO "topic-test".public.topics (id, topic_category, topic_name) VALUES (1024, 'ONLY_ON_TWITTER', 'Popular videos');
INSERT INTO "topic-test".public.topics (id, topic_category, topic_name) VALUES (1025, 'ONLY_ON_TWITTER', 'Days of celebration');
INSERT INTO "topic-test".public.topics (id, topic_category, topic_name) VALUES (1026, 'ONLY_ON_TWITTER', 'On this day');
INSERT INTO "topic-test".public.topics (id, topic_category, topic_name) VALUES (1027, 'GAMING', 'Game development');
INSERT INTO "topic-test".public.topics (id, topic_category, topic_name) VALUES (1028, 'GAMING', 'Among Us');

-- topic_followers
INSERT INTO "topic-test".public.topic_followers (id, topic_id, user_id) VALUES (1, 1008, 2);
INSERT INTO "topic-test".public.topic_followers (id, topic_id, user_id) VALUES (2, 1017, 2);
INSERT INTO "topic-test".public.topic_followers (id, topic_id, user_id) VALUES (3, 1013, 2);
INSERT INTO "topic-test".public.topic_followers (id, topic_id, user_id) VALUES (4, 1012, 2);

-- topic_not_interested
INSERT INTO "topic-test".public.topic_not_interested (id, topic_id, user_id) VALUES (1, 1018, 2);
INSERT INTO "topic-test".public.topic_not_interested (id, topic_id, user_id) VALUES (2, 1019, 2);
