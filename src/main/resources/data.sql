INSERT INTO tb_user (name, email) VALUES ('Matheus', 'matheusfloliveira@gmail.com');
INSERT INTO tb_user (name, email) VALUES ('Theo', 'theo@gmail.com');

INSERT INTO tb_classroom (class_number, block, capacity) VALUES ('100', 'A', 150);
INSERT INTO tb_classroom (class_number, block, capacity) VALUES ('200', 'A', 150);
INSERT INTO tb_classroom (class_number, block, capacity) VALUES ('300', 'A', 150);
INSERT INTO tb_classroom (class_number, block, capacity) VALUES ('300', 'B', 150);

INSERT INTO tb_users_classrooms (classroom_id, user_id) VALUES (1, 1);
INSERT INTO tb_users_classrooms (classroom_id, user_id) VALUES (2, 1);
INSERT INTO tb_users_classrooms (classroom_id, user_id) VALUES (3, 2);
INSERT INTO tb_users_classrooms (classroom_id, user_id) VALUES (4, 2);

