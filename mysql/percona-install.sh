cd /tmp
apt-get update
wget https://repo.percona.com/apt/percona-release_0.1-3.$(lsb_release -sc)_all.deb
dpkg -i percona-release_0.1-3.$(lsb_release -sc)_all.deb
apt-get install -y percona-server-server-5.6
/usr/bin/mysql_secure_installation
rm percona-release_0.1-3.$(lsb_release -sc)_all.deb
