-- inserindo usuários
INSERT INTO tb_user (name, email) VALUES ('Matheus', 'matheusfloliveira@gmail.com');
INSERT INTO tb_user (name, email) VALUES ('Theo', 'theo@gmail.com');
INSERT INTO tb_user (name, email) VALUES ('Davi', 'davi@gmail.com');
INSERT INTO tb_user (name, email) VALUES ('Ana', 'ana.souza@gmail.com');
INSERT INTO tb_user (name, email) VALUES ('Luiza', 'luiza.lima@gmail.com');
INSERT INTO tb_user (name, email) VALUES ('Pedro', 'pedro.silva@gmail.com');
INSERT INTO tb_user (name, email) VALUES ('João', 'joao.mendes@gmail.com');
INSERT INTO tb_user (name, email) VALUES ('Carla', 'carla.freitas@gmail.com');
INSERT INTO tb_user (name, email) VALUES ('Rafael', 'rafael.pereira@gmail.com');
INSERT INTO tb_user (name, email) VALUES ('Beatriz', 'beatriz.costa@gmail.com');

-- inserindo recursos
INSERT INTO tb_resource (quantity, description, status) VALUES (5 , 'teste', 'e um teste');

-- inserindo salas de aula
INSERT INTO tb_classroom (block, capacity, class_number, status, dates, schedules) VALUES ('A', 150, '100', 'Em manutencao', '2023-08-23', '2023-08-23 08:00:00');
INSERT INTO tb_classroom (block, capacity, class_number, status, dates, schedules) VALUES ('D', 50, '200', 'Disponivel', '2023-08-24', '2023-08-24 09:30:00');
INSERT INTO tb_classroom (block, capacity, class_number, status, dates, schedules) VALUES ('A', 70, '300', 'Ocupada', '2023-08-25', '2023-08-25 10:00:00');
INSERT INTO tb_classroom (block, capacity, class_number, status, dates, schedules) VALUES ('B', 45, '400', 'Disponivel', '2023-08-26', '2023-08-26 14:00:00');
INSERT INTO tb_classroom (block, capacity, class_number, status, dates, schedules) VALUES ('C', 120, '500', 'Reservada', '2023-08-27', '2023-08-27 11:30:00');
INSERT INTO tb_classroom (block, capacity, class_number, status, dates, schedules) VALUES ('A', 200, '600', 'Em manutencao', '2023-08-28', '2023-08-28 16:00:00');
INSERT INTO tb_classroom (block, capacity, class_number, status, dates, schedules) VALUES ('E', 80, '700', 'Disponivel', '2023-08-29', '2023-08-29 18:00:00');
INSERT INTO tb_classroom (block, capacity, class_number, status, dates, schedules) VALUES ('B', 90, '800', 'Ocupada', '2023-08-30', '2023-08-30 19:00:00');
INSERT INTO tb_classroom (block, capacity, class_number, status, dates, schedules) VALUES ('C', 60, '900', 'Disponivel', '2023-08-31', '2023-08-31 07:00:00');
INSERT INTO tb_classroom (block, capacity, class_number, status, dates, schedules) VALUES ('E', 100, '1000', 'Reservada', '2023-09-01', '2023-09-01 13:00:00');

-- atribuindo as salas de aula aos seus usuários
INSERT INTO tb_users_classrooms (classroom_id, user_id) VALUES (1, 1);
INSERT INTO tb_users_classrooms (classroom_id, user_id) VALUES (2, 1);

INSERT INTO tb_users_classrooms (classroom_id, user_id) VALUES (3, 2);
INSERT INTO tb_users_classrooms (classroom_id, user_id) VALUES (4, 2);

INSERT INTO tb_users_classrooms (classroom_id, user_id) VALUES (5, 3);
INSERT INTO tb_users_classrooms (classroom_id, user_id) VALUES (6, 3);

INSERT INTO tb_users_classrooms (classroom_id, user_id) VALUES (7, 4);
INSERT INTO tb_users_classrooms (classroom_id, user_id) VALUES (7, 5);

INSERT INTO tb_users_classrooms (classroom_id, user_id) VALUES (8, 6);
INSERT INTO tb_users_classrooms (classroom_id, user_id) VALUES (9, 7);

INSERT INTO tb_users_classrooms (classroom_id, user_id) VALUES (10, 8);
INSERT INTO tb_users_classrooms (classroom_id, user_id) VALUES (10, 9);

INSERT INTO tb_users_classrooms (classroom_id, user_id) VALUES (5, 10);

INSERT INTO tb_users_resources (resource_id, user_id) VALUES (1, 1);
