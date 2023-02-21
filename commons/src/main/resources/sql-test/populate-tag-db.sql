-- tags
INSERT INTO "tag-test".public.tags (id, tag_name, tweets_quantity) VALUES (2, '#JetBrains', 2);
INSERT INTO "tag-test".public.tags (id, tag_name, tweets_quantity) VALUES (3, '#test', 1);

-- tweet_tags
INSERT INTO "tag-test".public.tweet_tags (id, tag_id, tweet_id) VALUES (1, 2, 43);
INSERT INTO "tag-test".public.tweet_tags (id, tag_id, tweet_id) VALUES (2, 3, 40);
