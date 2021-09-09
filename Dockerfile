# the ruby version we use
FROM ruby:2.6.7

# arguements
# for docker compose
ARG BUNDLER_VERSION

ARG DATABASE_URL
ARG PG_MAJOR

ARG NODE_MAJOR
ARG YARN_VERSION

WORKDIR /app

# Common dependencies
RUN apt-get update -qq \
  && DEBIAN_FRONTEND=noninteractive apt-get install -yq --no-install-recommends \
    build-essential \
    gnupg2 \
    curl \
    less \
    git \
  && apt-get clean \
  && rm -rf /var/cache/apt/archives/* \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* \
  && truncate -s 0 /var/log/*log

# Download MIME types database for mimemagic
RUN apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get -yq dist-upgrade && \
  DEBIAN_FRONTEND=noninteractive apt-get install -yq --no-install-recommends \
    shared-mime-info \
  && cp /usr/share/mime/packages/freedesktop.org.xml ./ \
  && apt-get remove -y --purge shared-mime-info \
  && apt-get clean \
  && rm -rf /var/cache/apt/archives/* \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* \
  && truncate -s 0 /var/log/*log \
  && mkdir -p /usr/share/mime/packages \
  && cp ./freedesktop.org.xml /usr/share/mime/packages/


# Add PostgreSQL to sources list
RUN curl -sSL https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add - \
  && echo 'deb http://apt.postgresql.org/pub/repos/apt/ buster-pgdg main' $PG_MAJOR > /etc/apt/sources.list.d/pgdg.list

# Add NodeJS to sources list
RUN curl -sL https://deb.nodesource.com/setup_$NODE_MAJOR.x | bash -

# Add Yarn to the sources list
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
  && echo 'deb http://dl.yarnpkg.com/debian/ stable main' > /etc/apt/sources.list.d/yarn.list

# Application dependencies
RUN apt-get update -qq && \
  DEBIAN_FRONTEND=noninteractive apt-get install -yq --no-install-recommends \
    libpq-dev \
		libv8-dev \
    postgresql-client-$PG_MAJOR

# install node
RUN DEBIAN_FRONTEND=noninteractive apt-get install -yq nodejs && node --version

RUN npm install -g yarn@$YARN_VERSION

RUN apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
    truncate -s 0 /var/log/*log

# Configure bundler
ENV LANG=C.UTF-8 \
  BUNDLE_JOBS=4 \
  BUNDLE_RETRY=3

# Uncomment this line if you want to run binstubs without prefixing with `bin/` or `bundle exec`
ENV PATH /app/bin:$PATH

# Upgrade RubyGems and install required Bundler version
RUN gem update --system && \
    gem install bundler:$BUNDLER_VERSION

COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock

# install gems
RUN bundle install
