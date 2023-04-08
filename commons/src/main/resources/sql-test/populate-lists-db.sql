-- lists
INSERT INTO "lists-test".public.lists (id, alt_wallpaper, description, private, name, list_owner_id, wallpaper) VALUES (4, 'https://pbs.twimg.com/media/EXZ2rMvVAAAAfrN?format=png&name=small', 'test list description', false, 'test list name', 2, null);
INSERT INTO "lists-test".public.lists (id, alt_wallpaper, description, private, name, list_owner_id, wallpaper) VALUES (5, 'https://pbs.twimg.com/media/EXZ2rMvVAAAAfrN?format=png&name=small', 'test list description', true, 'test list name', 1, null);
INSERT INTO "lists-test".public.lists (id, alt_wallpaper, description, private, name, list_owner_id, wallpaper) VALUES (6, 'https://pbs.twimg.com/media/EXZ2rMvVAAAAfrN?format=png&name=small', 'test list description', true, 'test list name', 2, null);
INSERT INTO "lists-test".public.lists (id, alt_wallpaper, description, private, name, list_owner_id, wallpaper) VALUES (7, 'https://pbs.twimg.com/media/EXZ2rMvVAAAAfrN?format=png&name=small', 'test list description', true, 'test list name', 1, null);
INSERT INTO "lists-test".public.lists (id, alt_wallpaper, description, private, name, list_owner_id, wallpaper) VALUES (8, 'https://pbs.twimg.com/media/EXZ2rMvVAAAAfrN?format=png&name=small', 'test list description', true, 'test list name', 1, null);
INSERT INTO "lists-test".public.lists (id, alt_wallpaper, description, private, name, list_owner_id, wallpaper) VALUES (9, 'https://pbs.twimg.com/media/EXZ2rMvVAAAAfrN?format=png&name=small', 'test list description', false, 'test list name', 1, null);
INSERT INTO "lists-test".public.lists (id, alt_wallpaper, description, private, name, list_owner_id, wallpaper) VALUES (10, 'https://pbs.twimg.com/media/EXZ2rMvVAAAAfrN?format=png&name=small', 'test list description', false, 'test list name', 6, null);
INSERT INTO "lists-test".public.lists (id, alt_wallpaper, description, private, name, list_owner_id, wallpaper) VALUES (11, 'https://pbs.twimg.com/media/EXZ2rMvVAAAAfrN?format=png&name=small', 'test list description', false, 'test list name', 3, null);

-- pinned_lists
INSERT INTO "lists-test".public.pinned_lists (id, pinned_date, list_id, pinned_user_id) VALUES (1, '2021-10-03 20:42:53.000000', 4, 2);
INSERT INTO "lists-test".public.pinned_lists (id, pinned_date, list_id, pinned_user_id) VALUES (2, '2021-10-03 20:42:53.000000', 6, 2);

-- lists_followers
INSERT INTO "lists-test".public.lists_followers (id, list_id, follower_id) VALUES (1, 4, 1);
INSERT INTO "lists-test".public.lists_followers (id, list_id, follower_id) VALUES (2, 7, 2);

-- lists_members
INSERT INTO "lists-test".public.lists_members (id, list_id, member_id) VALUES (1, 4, 1);
INSERT INTO "lists-test".public.lists_members (id, list_id, member_id) VALUES (2, 5, 1);
INSERT INTO "lists-test".public.lists_members (id, list_id, member_id) VALUES (3, 7, 2);
INSERT INTO "lists-test".public.lists_members (id, list_id, member_id) VALUES (4, 9, 1);
