# University of Windsor CSS Hub

http://css.uwindsor.ca

## Overview

The University of Windsor Computer Science Society (CSS) Hub website was built to provide students with a hub for event listings and registration for Computer Science students, and eventually was merged with the Discord authorization bot to create one hub for CSS related things. Developing a system in-house allows us to tailor the experience for our specific needs (such as guest limits and guest list for events, and authorization with University of Windsor accounts).

## Contributing

Please feel free to contribute if you see an issue, want to complete something from our [project boards](https://github.com/EricPickup/uwindsor-css-hub/projects), or think of a sweet feature! Simply fork this repo and make a pull request.

If this sounds like gibberish to you, you'll probably want to learn the basics of `git`. Afterwards, you can follow [this tutorial](https://akrabat.com/the-beginners-guide-to-contributing-to-a-github-project/) on contributing to open-source projects on GitHub.

### Setup

You can follow [these instructions](https://www.tutorialspoint.com/ruby-on-rails/rails-installation.htm) to install `ruby` and the `rails` framework.

After installing rails, you need to install the dependencies (gems). Navigate to the project directory and run:

`$ bundle install`

Bundler will install all of the project dependencies (located in `Gemfile`) of the project.

Next you'll need to create the local database using

`$ rails db:setup`

After that you're ready to launch the site using:

`$ rails server`

By default, rails will launch the server at [http://localhost:3000](http://localhost:3000).
