groupadd sftponly
cat sshd_addon >> /etc/ssh/sshd_config
service ssh restart
