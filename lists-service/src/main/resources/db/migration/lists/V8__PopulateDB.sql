-- lists
INSERT INTO lists (id, alt_wallpaper, description, private, name, list_owner_id, wallpaper) VALUES (3, 'https://pbs.twimg.com/media/EXZ27UwVcAIcDfd?format=png&name=small', 'Hello from my list', false, 'Hello World!', 2, null);
INSERT INTO lists (id, alt_wallpaper, description, private, name, list_owner_id, wallpaper) VALUES (2, 'https://pbs.twimg.com/media/EXZ2w_qUcAMwN3x?format=png&name=small', 'Some description', false, 'Internal', 1, null);
INSERT INTO lists (id, alt_wallpaper, description, private, name, list_owner_id, wallpaper) VALUES (1, 'https://pbs.twimg.com/media/EXZ1_hkUYAA56JA?format=png&name=small', 'Random List Description', false, 'Random List', 1, null);
-- lists_members
INSERT INTO lists_members (id, list_id, member_id) VALUES (1, 1, 4);
INSERT INTO lists_members (id, list_id, member_id) VALUES (2, 1, 2);
