apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
echo "deb http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb.list
apt-get update
apt-get install -y mongodb-org
cp mongod.conf /etc/mongod.conf
service mongod restart
mongo replica-init.js
