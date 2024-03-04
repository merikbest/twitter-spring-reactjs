-- users
INSERT INTO "chat-test".public.users(id, full_name, username, private_profile, active, about, avatar, muted_direct_messages) VALUES (1, 'John_Doe', 'John_Doe', false, true, 'Hello twitter!', 'https://twitterclonestorage.s3.eu-central-1.amazonaws.com/348b7dbe-3ac5-477f-8483-edc24f53091b_814370.jpg', true);
INSERT INTO "chat-test".public.users(id, full_name, username, private_profile, active, about, avatar, muted_direct_messages) VALUES (2, 'MrCat', 'MrCat', false, true, 'Hello twitter!', 'https://twitterclonestorage.s3.eu-central-1.amazonaws.com/348b7dbe-3ac5-477f-8483-edc24f53091b_814370.jpg', true);
INSERT INTO "chat-test".public.users(id, full_name, username, private_profile, active, about, avatar, muted_direct_messages) VALUES (3, 'MrCat', 'MrCat', true, true, 'Hello twitter!', 'https://twitterclonestorage.s3.eu-central-1.amazonaws.com/348b7dbe-3ac5-477f-8483-edc24f53091b_814370.jpg', true);
INSERT INTO "chat-test".public.users(id, full_name, username, private_profile, active, about, avatar, muted_direct_messages) VALUES (4, 'MrCat', 'MrCat', true, true, 'Hello twitter!', 'https://twitterclonestorage.s3.eu-central-1.amazonaws.com/348b7dbe-3ac5-477f-8483-edc24f53091b_814370.jpg', true);
INSERT INTO "chat-test".public.users(id, full_name, username, private_profile, active, about, avatar, muted_direct_messages) VALUES (5, 'MrCat', 'MrCat', true, true, 'Hello twitter!', 'https://twitterclonestorage.s3.eu-central-1.amazonaws.com/348b7dbe-3ac5-477f-8483-edc24f53091b_814370.jpg', true);
INSERT INTO "chat-test".public.users(id, full_name, username, private_profile, active, about, avatar, muted_direct_messages) VALUES (6, 'MrCat', 'MrCat', false, true, 'Hello twitter!', 'https://twitterclonestorage.s3.eu-central-1.amazonaws.com/348b7dbe-3ac5-477f-8483-edc24f53091b_814370.jpg', true);
INSERT INTO "chat-test".public.users(id, full_name, username, private_profile, active, about, avatar, muted_direct_messages) VALUES (7, 'MrCat', 'MrCat', false, true, 'Hello twitter!', 'https://twitterclonestorage.s3.eu-central-1.amazonaws.com/348b7dbe-3ac5-477f-8483-edc24f53091b_814370.jpg', true);

-- user_subscriptions
INSERT INTO "chat-test".public.user_subscriptions (subscriber_id, user_id) VALUES (1, 2);
INSERT INTO "chat-test".public.user_subscriptions (subscriber_id, user_id) VALUES (2, 1);
INSERT INTO "chat-test".public.user_subscriptions (subscriber_id, user_id) VALUES (4, 2);
INSERT INTO "chat-test".public.user_subscriptions (subscriber_id, user_id) VALUES (4, 1);

-- user_blocked
INSERT INTO "chat-test".public.user_blocked (user_id, blocked_user_id) VALUES (2, 4);
INSERT INTO "chat-test".public.user_blocked (user_id, blocked_user_id) VALUES (5, 2);
INSERT INTO "chat-test".public.user_blocked (user_id, blocked_user_id) VALUES (6, 2);

-- chats
INSERT INTO "chat-test".public.chats (id, creation_date) VALUES (8, '2021-10-03 20:29:55.000000');
INSERT INTO "chat-test".public.chats (id, creation_date) VALUES (10, '2021-10-03 20:29:55.000000');

-- chats_participants
INSERT INTO "chat-test".public.chats_participants (chat_id, user_id, left_chat) VALUES (8, 2, false);
INSERT INTO "chat-test".public.chats_participants (chat_id, user_id, left_chat) VALUES (8, 1, false);
INSERT INTO "chat-test".public.chats_participants (chat_id, user_id, left_chat) VALUES (10, 2, false);
INSERT INTO "chat-test".public.chats_participants (chat_id, user_id, left_chat) VALUES (10, 5, true);

-- chat_messages
INSERT INTO "chat-test".public.chat_messages (id, date, text, author_id, chat_id, tweet_id, is_unread) VALUES (5, '2021-10-03 20:39:55.000000', 'hello from MrCat', 2, 8, 40, true);
INSERT INTO "chat-test".public.chat_messages (id, date, text, author_id, chat_id, tweet_id, is_unread) VALUES (6, '2021-10-03 20:40:19.000000', 'hello from John Doe', 1, 8, null, false);
INSERT INTO "chat-test".public.chat_messages (id, date, text, author_id, chat_id, tweet_id, is_unread) VALUES (7, '2021-10-03 20:41:03.000000', 'test message 2 from John Doe', 1, 8, null, true);
