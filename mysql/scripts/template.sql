DROP `$DATABASE`;
DROP USER '$USER'@'$HOST';
CREATE DATABASE `$DATABASE` DEFAULT CHARACTER SET $CHARSET COLLATE $COLLATE;
create user '$USER'@'$HOST' IDENTIFIED BY '$PASSWORD';

GRANT ALL PRIVILEGES ON `$DATABASE`.* TO '$USER'@'$HOST';

