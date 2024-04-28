-- users
INSERT INTO users(id, full_name, username, private_profile, active, about, avatar) VALUES (1, 'Random', 'Random', true, true, null, 'https://perfumeweb2.s3.eu-central-1.amazonaws.com/ae83099c-885b-499a-bb6f-5e34e1b69e7d_4ec7201fd370bd9870cdb326f0511f38.jpg');
INSERT INTO users(id, full_name, username, private_profile, active, about, avatar) VALUES (2, 'MrCat', 'Cat', true, true, 'Hello twitter!', 'https://perfumeweb2.s3.eu-central-1.amazonaws.com/348b7dbe-3ac5-477f-8483-edc24f53091b_814370.jpg');
INSERT INTO users(id, full_name, username, private_profile, active, about, avatar) VALUES (3, 'Kitty', 'Kitty', true, true, 'Hello twitter!', 'https://perfumeweb2.s3.eu-central-1.amazonaws.com/a7e03e7c-c05f-4e30-ba8c-2271fd0b4b43_779301.jpg');
INSERT INTO users(id, full_name, username, private_profile, active, about, avatar) VALUES (4, 'JavaCat', 'JavaCat', false, true, 'Hello twitter!', 'https://perfumeweb2.s3.eu-central-1.amazonaws.com/b999d944-c9ec-4a9c-b356-db937211df5c_Ec1OBK3XsAEjVZR.png');
INSERT INTO users(id, full_name, username, private_profile, active, about, avatar) VALUES (5, 'КотБегемот', 'Кот Бегемот', false, true, 'Hello twitter!', 'https://perfumeweb2.s3.eu-central-1.amazonaws.com/68a7b0d5-2b0c-493e-85ff-098725c52ecc_Cl5DjoUWYAAslnd.jfif');

-- user_subscriptions
INSERT INTO user_subscriptions (subscriber_id, user_id) VALUES (1, 2);
INSERT INTO user_subscriptions (subscriber_id, user_id) VALUES (1, 3);
INSERT INTO user_subscriptions (subscriber_id, user_id) VALUES (1, 4);
INSERT INTO user_subscriptions (subscriber_id, user_id) VALUES (1, 5);
INSERT INTO user_subscriptions (subscriber_id, user_id) VALUES (2, 1);
INSERT INTO user_subscriptions (subscriber_id, user_id) VALUES (5, 1);

-- lists
INSERT INTO lists (id, alt_wallpaper, description, private, list_name, list_owner_id, wallpaper) VALUES (1, 'https://pbs.twimg.com/media/EXZ1_hkUYAA56JA?format=png&name=small', 'Random List Description', false, 'Random List', 1, null);
INSERT INTO lists (id, alt_wallpaper, description, private, list_name, list_owner_id, wallpaper) VALUES (2, 'https://pbs.twimg.com/media/EXZ2w_qUcAMwN3x?format=png&name=small', 'Some description', false, 'Internal', 1, null);
INSERT INTO lists (id, alt_wallpaper, description, private, list_name, list_owner_id, wallpaper) VALUES (3, 'https://pbs.twimg.com/media/EXZ27UwVcAIcDfd?format=png&name=small', 'Hello from my list', false, 'Hello World!', 2, null);

-- lists_members
INSERT INTO lists_members (list_id, member_id) VALUES (1, 4);
INSERT INTO lists_members (list_id, member_id) VALUES (1, 2);
