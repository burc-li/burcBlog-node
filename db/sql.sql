use burcblog;

 create table admin(
 id int(10) auto_increment,
 username varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci,
 password varchar(60),
 PRIMARY key(id)
 )CHARACTER SET utf8 COLLATE utf8_general_ci;

 create table blogs(
 id int(10) auto_increment,
 title varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci,
 content longtext CHARACTER SET utf8 COLLATE utf8_general_ci,
 label varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci,
 author varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci,
 createdate varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci,
 commentcount varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci,
 articletype varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci,
 PRIMARY key(id)
 )CHARACTER SET utf8 COLLATE utf8_general_ci;
 
 create table comments(
 id int(10) auto_increment,
 email varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci,
 content longtext CHARACTER SET utf8 COLLATE utf8_general_ci,
 blogid varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci,
 fromname varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci,
 toname varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci,
 PRIMARY key(id)
 )CHARACTER SET utf8 COLLATE utf8_general_ci;
