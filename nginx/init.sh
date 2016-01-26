apt-get update
apt-get upgrade -y
apt-get install nginx

cp nginx.conf /etc/nginx.conf
cp apache-forward /etc/nginx/sites-enabled/
cp faillover /etc/nginx/sites-enabled/
cp www/* /var/www/
rm /etc/nginx/sites-enabled/default
service nginx restart
chown www-data /var/www/*
chmod 0600 /var/www/*
