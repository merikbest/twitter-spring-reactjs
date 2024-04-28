-- tags
INSERT INTO tags (id, tag_name, tweets_quantity) VALUES (1, '#FirstTweet', 5);
INSERT INTO tags (id, tag_name, tweets_quantity) VALUES (2, '#myCat', 4);
INSERT INTO tags (id, tag_name, tweets_quantity) VALUES (3, '#JavaScript', 1);

-- tweet_tags
INSERT INTO tweet_tags (id, tag_id, tweet_id) VALUES (1, 1, 1);
INSERT INTO tweet_tags (id, tag_id, tweet_id) VALUES (2, 1, 5);
INSERT INTO tweet_tags (id, tag_id, tweet_id) VALUES (3, 1, 7);
INSERT INTO tweet_tags (id, tag_id, tweet_id) VALUES (4, 1, 9);
INSERT INTO tweet_tags (id, tag_id, tweet_id) VALUES (5, 1, 11);
INSERT INTO tweet_tags (id, tag_id, tweet_id) VALUES (6, 2, 6);
INSERT INTO tweet_tags (id, tag_id, tweet_id) VALUES (7, 2, 8);
INSERT INTO tweet_tags (id, tag_id, tweet_id) VALUES (8, 2, 10);
INSERT INTO tweet_tags (id, tag_id, tweet_id) VALUES (9, 2, 12);
INSERT INTO tweet_tags (id, tag_id, tweet_id) VALUES (10, 3, 13);
