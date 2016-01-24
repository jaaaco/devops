DROP DATABASE $DBNAME;
DROP USER '$USER'@'$HOST';
CREATE DATABASE `leoapart` DEFAULT CHARACTER SET utf8 COLLATE utf8_polish_ci;
create user '$USER'@'$HOST' IDENTIFIED BY '$PASSWORD';

GRANT ALL PRIVILEGES ON leoapart.* TO 'leoapart'@'$HOST';
FLUSH PRIVILEGES;