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

**standalone**
you can install it with git clone (preferred):

    # change directory into the directory you want `glintcms-starter-intesso` to be created
    git clone https://github.com/glintcms/glintcms-starter-intesso && cd glintcms-starter-intesso && npm run prepublish && npm install



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


# project structure

The directories `lib/*` contain the local modules [bundledDependencies](https://docs.npmjs.com/files/package.json#bundleddependencies) for this starter project.
These modules are like normal unpublished npm modules, that are just contained in this project. It does not really make sense to publish them because they are very project specific.

The advantage to treat them as npm modules are:
- They are self contained and have defined dependencies in the `package.json`.
- It is easier to copy them into another project
- It lets you avoid [deep relative links](https://github.com/substack/browserify-handbook#avoiding-)


**During `development`**

These modules are symlinked into the `node_modules` directory, when running `npm run build`


**In `production`**

When running `npm run build-production` they are copied into the `node_modules` directory



# author

Andi Neck | [@andineck](https://twitter.com/andineck) | andi.neck@intesso.com | intesso


# get involved

Any Feedback is highly appreciated.
Please create an [Issue](https://github.com/glintcms/glintcms-starter-intesso/issues/new) or [PR](https://github.com/glintcms/glintcms-starter-intesso/pulls).
I'm happy to add you as a comitter too.


# license

MIT

