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


# 主题表
create table `bbs_topic`(
     id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT COMMENT '主题id',
     title varchar(50) not null COMMENT '主题的名称',
     descr varchar(50) not null  COMMENT '描述',
     icon varchar(50) not null COMMENT '主题的icon',
     `password` varchar(32) not null COMMENT '主题的密码，用于隐藏或者修改时使用',
    `hidden` tinyint default 1 COMMENT '1表示显示,0表示隐藏',
    `topic_time` int UNSIGNED default 0 COMMENT '主题发表的时间' 
)ENGINE=MYISAM CHARSET=utf8;


# 帖子表
CREATE TABLE `bbs_list`(
     id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT COMMENT '帖子id',
     topic_id INT UNSIGNED COMMENT '属于哪个主题',
     user_id INT UNSIGNED  COMMENT '属于哪个用户发表的主题',
     title VARCHAR(50) NOT NULL COMMENT '帖子的名称',
     content TEXT NOT NULL COMMENT '帖子的内容',
     `pub_time` INT UNSIGNED DEFAULT 0 COMMENT '发表的时间',
     `is_top` TINYINT DEFAULT 0 COMMENT '1表示置顶,0表示正常'
)ENGINE=MYISAM CHARSET=utf8;
CREATE INDEX topic_key ON bbs_list(topic_id);
CREATE INDEX user_key ON bbs_list(user_id);

# 回复表
CREATE TABLE `bbs_comment`(
     id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT COMMENT '回复id',
     topic_id INT UNSIGNED COMMENT '属于哪个主题',
     list_id INT UNSIGNED  COMMENT '属于哪个发起的帖子',
     user_id INT UNSIGNED  COMMENT '属于哪个用户回复',
     `re_time` INT UNSIGNED DEFAULT 0 COMMENT '回复的时间',
     content TEXT NOT NULL COMMENT '回复的内容'
)ENGINE=MYISAM CHARSET=utf8;
CREATE INDEX topic_key ON bbs_comment(topic_id);
CREATE INDEX user_key ON bbs_comment(user_id);
CREATE INDEX list_key ON bbs_comment(list_id);
