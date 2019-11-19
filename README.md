# University of Windsor CSS Hub

http://css.uwindsor.ca

## Overview

The University of Windsor Computer Science Society (CSS) Hub website was built to provide students with a hub for event listings and registration for Computer Science students, and eventually was merged with the Discord authorization bot to create one hub for CSS related things. Developing a system in-house allows us to tailor the experience for our specific needs (such as guest limits and guest list for events, and authorization with University of Windsor accounts).

## Contributing

Please feel free to contribute if you see an issue, want to complete something from our [project boards](https://github.com/EricPickup/uwindsor-css-hub/projects), or think of a sweet feature! Simply fork this repo and make a pull request.

If this sounds like gibberish to you, you'll probably want to learn the basics of `git`. Afterwards, you can follow [this tutorial](https://akrabat.com/the-beginners-guide-to-contributing-to-a-github-project/) on contributing to open-source projects on GitHub.

### Rails Setup

You can follow [these instructions](https://www.tutorialspoint.com/ruby-on-rails/rails-installation.htm) to install `ruby` and the `rails` framework.

After installing rails, you need to install the dependencies (gems). Navigate to the project directory and run:

`$ bundle install`

Bundler will install all of the project dependencies (located in `Gemfile`) of the project.

Next you'll need to create the local database using

`$ rails db:setup`

After that you're ready to launch the site using:

`$ rails server`

By default, rails will launch the server at [http://localhost:3000](http://localhost:3000).

### Google OAuth Setup

This is not necessary, however to sign in to your UWindsor email on your local instance and use admin features you will need to set up Google OAuth.

Signing in will allow you to
- Create/modify events
- Modify page content in-site

Follow these steps from Google to create a project and obtain the client ID and secret: https://developers.google.com/adwords/api/docs/guides/authentication#create_a_client_id_and_client_secret
- Your project can be named whatever you like
- This is completely free, don't worry about the billing account options
- Application type is a Web Application
- Under Authorized Redirect URI's, enter `http://localhost:3000/auth/google_oauth2/callback`

Now that you have a Google client ID and client secret, you just need to add those to your environment file where the app reads the keys.

In the rails project, copy the `local_env.example.yml` to a new file called `local_env.yml`. This will be your private file that contains your API credentials - git will ignore this file. Fill in the `GOOGLE_CLIENT` and `GOOGLE_SECRET` fields in `local_env.yml` with your respective credentials.

### Common issues

A few people reported issues with a dependency, `libv8`. This can be fixed by installing the `libv8-dev` package using:
`sudo apt-get install libv8-dev` or `brew install libv8-dev`.

