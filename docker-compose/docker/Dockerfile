FROM php:8.0-apache

# Install base dependencies
RUN apt-get update && apt-get install -y -q --no-install-recommends \
        apt-transport-https \
        build-essential \
        ca-certificates \
        curl \
        git \
        libssl-dev \
        wget \
        vim \
    && rm -rf /var/lib/apt/lists/*

# Install APACHE
RUN apt-get update && apt-get install -y \
        libfreetype6-dev \
        libjpeg62-turbo-dev \
        libpng-dev \
    && docker-php-ext-install -j$(nproc) iconv \
    && docker-php-ext-configure gd --with-freetype=/usr/include/ --with-jpeg=/usr/include/ \
    && docker-php-ext-install -j$(nproc) gd

COPY ./000-default.conf /etc/apache2/sites-available/

# Add user
ARG PUID=1000
ENV PUID ${PUID}
ARG PGID=1001
ENV PGID ${PGID}
ARG APP_USER=app_user
ENV APP_USER ${APP_USER}

RUN groupadd -g ${PGID} ${APP_USER} && \
    useradd -l -u ${PUID} -g ${APP_USER} -m ${APP_USER} && \
    usermod -p "*" ${APP_USER} -s /bin/bash

# Install Node
USER ${APP_USER}

ARG NODE_VERSION=16.13.2
ENV NODE_VERSION ${NODE_VERSION}
ARG NVM_DIR=/home/${APP_USER}/.nvm
ENV NVM_DIR ${NVM_DIR}

RUN mkdir -p $NVM_DIR && \
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash \
    && . ${NVM_DIR}/nvm.sh \
    && nvm install ${NODE_VERSION} \
    && nvm use ${NODE_VERSION} \
    && nvm alias ${NODE_VERSION} \
    && npm config set fetch-retries 2 \
    && npm config set fetch-retry-factor 10 \
    && npm config set fetch-retry-mintimeout 10000 \
    && npm config set fetch-retry-maxtimeout 60000 \
    && ln -s `npm bin --global` /home/${APP_USER}/.node-bin

RUN echo "" >> ~/.bashrc && \
    echo 'export NVM_DIR="$HOME/.nvm"' >> ~/.bashrc && \
    echo '[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm' >> ~/.bashrc

USER root

ENV PATH $PATH:/home/${APP_USER}/.node-bin

COPY ./.npmrc /root/.npmrc
COPY ./.npmrc /home/${APP_USER}/.npmrc

# Set project owner
ARG PROJECT_PATH=/var/www/html
ENV PROJECT_PATH ${PROJECT_PATH}
RUN chown ${PUID}:${PGID} -R ${PROJECT_PATH}