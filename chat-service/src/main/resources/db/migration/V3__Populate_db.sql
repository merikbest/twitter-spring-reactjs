-- users
INSERT INTO users(id, full_name, username, private_profile, active, about, avatar, muted_direct_messages) VALUES (1, 'Random', 'Random', true, true, null, 'https://perfumeweb2.s3.eu-central-1.amazonaws.com/ae83099c-885b-499a-bb6f-5e34e1b69e7d_4ec7201fd370bd9870cdb326f0511f38.jpg', true);
INSERT INTO users(id, full_name, username, private_profile, active, about, avatar, muted_direct_messages) VALUES (2, 'MrCat', 'Cat', true, true, 'Hello twitter!', 'https://perfumeweb2.s3.eu-central-1.amazonaws.com/348b7dbe-3ac5-477f-8483-edc24f53091b_814370.jpg', false);
INSERT INTO users(id, full_name, username, private_profile, active, about, avatar, muted_direct_messages) VALUES (3, 'Kitty', 'Kitty', true, true, 'Hello twitter!', 'https://perfumeweb2.s3.eu-central-1.amazonaws.com/a7e03e7c-c05f-4e30-ba8c-2271fd0b4b43_779301.jpg', true);
INSERT INTO users(id, full_name, username, private_profile, active, about, avatar, muted_direct_messages) VALUES (4, 'JavaCat', 'JavaCat', false, true, 'Hello twitter!', 'https://perfumeweb2.s3.eu-central-1.amazonaws.com/b999d944-c9ec-4a9c-b356-db937211df5c_Ec1OBK3XsAEjVZR.png', false);
INSERT INTO users(id, full_name, username, private_profile, active, about, avatar, muted_direct_messages) VALUES (5, 'КотБегемот', 'Кот Бегемот', false, true, 'Hello twitter!', 'https://perfumeweb2.s3.eu-central-1.amazonaws.com/68a7b0d5-2b0c-493e-85ff-098725c52ecc_Cl5DjoUWYAAslnd.jfif', false);

-- user_subscriptions
INSERT INTO user_subscriptions (subscriber_id, user_id) VALUES (1, 2);
INSERT INTO user_subscriptions (subscriber_id, user_id) VALUES (1, 3);
INSERT INTO user_subscriptions (subscriber_id, user_id) VALUES (1, 4);
INSERT INTO user_subscriptions (subscriber_id, user_id) VALUES (1, 5);
INSERT INTO user_subscriptions (subscriber_id, user_id) VALUES (2, 1);
INSERT INTO user_subscriptions (subscriber_id, user_id) VALUES (5, 1);

-- chats
INSERT INTO chats (id, creation_date) VALUES (8, '2021-10-03 20:29:55.000000');
INSERT INTO chats (id, creation_date) VALUES (10, '2021-10-03 20:29:55.000000');

-- chat_participants
INSERT INTO chats_participants (chat_id, user_id, left_chat) VALUES (8, 2, false);
INSERT INTO chats_participants (chat_id, user_id, left_chat) VALUES (8, 1, false);
INSERT INTO chats_participants (chat_id, user_id, left_chat) VALUES (10, 2, false);
INSERT INTO chats_participants (chat_id, user_id, left_chat) VALUES (10, 5, true);

-- chat_messages
INSERT INTO chat_messages (id, date, text, is_unread, author_id, chat_id, tweet_id)VALUES (5, '2021-10-03 20:39:55.000000', 'hello from MrCat', false, 2, 8, 6);
INSERT INTO chat_messages (id, date, text, is_unread, author_id, chat_id, tweet_id)VALUES (6, '2021-10-03 20:40:19.000000', 'hello from John Doe', false, 1, 8, null);
INSERT INTO chat_messages (id, date, text, is_unread, author_id, chat_id, tweet_id)VALUES (7, '2021-10-03 20:41:03.000000', 'test message 2 from John Doe', false, 1, 8, null);
