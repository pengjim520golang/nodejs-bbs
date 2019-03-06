CREATE TABLE `bbs_users`(
    id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT COMMENT '用户id',
    username VARCHAR(32) NOT NULL COMMENT '账号',
    nickname VARCHAR(10) DEFAULT NULL COMMENT '论坛昵称',
    `password` VARCHAR(32) NOT NULL COMMENT '密码',
    thumbnail VARCHAR(50) DEFAULT NULL COMMENT '头像',
    gender VARCHAR(2) DEFAULT NULL COMMENT '性别',
    register_time INT UNSIGNED DEFAULT 0
)ENGINE=MYISAM CHARSET=utf8;
# 设置用户名唯一
CREATE UNIQUE INDEX uname ON bbs_users(username);

# 插入测试用户 pengjin

insert into `bbs_users`(username,`password`,register_time)values('pengjin',md5('123456'),1551684762)