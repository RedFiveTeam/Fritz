FROM dgs1sdt/blackpearl

USER root

# setup_env
ENV FRITZ_DB_URL=jdbc:mysql://localhost:3306/fritzdev?useSSL=false
ENV FRITZ_DB_USERNAME=fritz
ENV FRITZ_CI=true

ENTRYPOINT service mysql start &&\
    mysql -u root -e "create database fritz;" || true &&\
    mysql -u root -e "create user 'fritz'@'localhost';" || true &&\
    mysql -u root -e "GRANT ALL PRIVILEGES ON fritz.* TO 'fritz'@'localhost';" || true &&\
    /bin/bash