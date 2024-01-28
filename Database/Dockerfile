#inherit image from an image containing linux debian os + mysql
FROM mysql:5

# copy the sql file into the init folderfor running it once
COPY ./vacations.sql /docker-entrypoint-initdb.d