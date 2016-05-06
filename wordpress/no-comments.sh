#!/bin/bash

# mysql credential
user="root"
pass="YOUR_PASS_HERE"

# list of all databases
all_dbs="$(mysql -u $user -p$pass -Bse 'show databases')"

for db in $all_dbs
     do
        if test $db != "information_schema"
            then if test $db != "mysql"
            then mysql -u$user -p$pass $db -sN -e "UPDATE wp_posts SET comment_status = 'closed'; DELETE FROM wp_comments;"
        fi
    fi
     done
