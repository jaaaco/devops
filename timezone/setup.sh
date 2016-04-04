apt-get update
apt-get install curl python tzdata -y
apt-get install --reinstall tzdata
echo "Europe/Warsaw" > /etc/timezone
dpkg-reconfigure --frontend noninteractive tzdata
