# glintcms-starter-intesso

This is a WebSite implementation with GlintCMS.
It shows how you can use GlintCMS.


# GlintCMS Documentation

- [documentation](https://github.com/glintcms/glintcms)
- [glintcms](http://glintcms.com/)


# prerequisites

make sure you have got [node.js](https://nodejs.org) installed on your system.

so far it has only been tested with node 0.12.7 and 4.0.0 on mac os x and ubuntu 12.04 LTS.

```bash
# for development, nodemon is helpful
npm install -g nodemon
```

# install

> this starter installs a whole web site.
> it's not just a module you would typically install inside an existing app.

you can install it with git clone (preferred):

    # change directory into the directory you want `glintcms-starter-intesso` to be created
    git clone https://github.com/glintcms/glintcms-starter-intesso; cd glint-starter-intesso; npm install;


or via npm install:

    # NOTE: only run this command in an empty directory
    npm install glintcms-starter-intesso; mv node_modules/* ./; cd glintcms-starter-intesso; npm install;


# start

```bash

# build it and run it
npm run build && node start

# start with automatic restart on file changes
npm run www

# if you want to run it with a specific port
export PORT=3000; npm run www

```

This starter web site uses the filesystem as the storage adapter: `glint-adapter-fs`.

Therefore you don't have to install a database to run it.


# use
1. open the website: [http://localhost:8080/](http://localhost:8080/)
2. login via: [http://localhost:8080/login](http://localhost:8080/login)
- user: `content@intesso.com`
- password: `ContentContent`