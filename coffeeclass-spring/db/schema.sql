drop table if exists registration;
drop table if exists users;
drop table if exists courselist;

create table courselist(
	courseid serial primary key,
	title text not null,
	description text not null
);

create table users(
	userid serial primary key,
	firstname text not null,
	lastname text not null,
	username text not null,
	password text not null,
	phone text not null
);

create table registration(
	regid serial primary key,
	user_id integer references users(userid) on delete cascade,
	course_id integer references courselist(courseid) on delete cascade
);
