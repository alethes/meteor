# Fork description

This fork is gonna be dedicated to one thing and one thing only: killing performance issues of the Meteor tool.
---------------------------------------------------------------------------------------------------------------

The purpose of this project is to come up with and test various improvements to the Meteor bundler, linker and compiler. I'm putting strong emphasis on the repeated builds triggered after file changes. The main goal is to streamline the Meteor development process and shorten the excruciating code update cycle.

Many great improvements are currently being made by the Meteor Development Group. In particular, recent changes on the devel branch drastically reduced the run time of the constraint solver. However, the performance of the build process is still extremely suboptimal, repeating virtually all the work on every file change.

For a start, it'd be good to get the Meteor tool make use of the DRY principle. Why process all the files again and again after every change in the code? Let's make some use of the work that's already been done...

All optimizations prototyped in this fork will be listed below along with the speed improvements (registered in a large example app using coffeescript, stylus and jade) compared to the plain devel version of Meteor.

Currently prototyped optimizations:
-------------------------------------------------------
* **Source item cache** (enable with: `METEOR_SOURCE_CACHE=1`) - stores the results of already compiled source items in memory. The prepared resources are reused during builds for different architectures (os, webbrowser, cordova) and, most importantly, in subsequent builds. In the example app, it leads to around 50x speed-up in source item processing time (down from ~7s to ~150ms), virtually erradicating the largest bottleneck of the current build process. **Performance gain: ~1.1x (initial build) or ~1.8x (repeated builds)**
* **Prelink cache** - (enable with: `METEOR_PRELINK_CACHE=1`) stores the prelinked JS files in memory. Requires source item cache. Makes repeated prelinking around 2 times faster. **Performance gain: ~1.1x (initial build) or ~1.3x (repeated builds)**
* **Option to disable Cordova builds** (enable with: `METEOR_DISABLE_CORDOVA=1` - disables builds for one of three standard 'architectures'. Irrelevant in purely server-side apps/packages. **Performance gain: ~1.5x** 
* **Option to disable browser builds** (enable with: `METEOR_DISABLE_BROWSER=1` - disables builds for Cordova - one of three standard 'architectures'. Irrelevant in purely server-side apps/packages. **Performance gain: ~1.5x** 

Example command
----------------
Here's an example command, enabling optimizations for a typical web app:
`METEOR_SOURCE_CACHE=1 METEOR_DISABLE_CORDOVA=1 MONGO_URL=mongodb://localhost/test meteor`

Known issues
-------------------------------------------------------
* When source cache or prelink cache is used, interrupting a build causes an error that breaks the cache(s). To prevent incorrect builds, the caches(s) is/are emptied whenever the app returns an error. In effect the first build after a crash can't benefit from caching.

# Meteor

Meteor is an ultra-simple environment for building modern web
applications.

With Meteor you write apps:

* in pure JavaScript
* that send data over the wire, rather than HTML
* using your choice of popular open-source libraries

Documentation is available at http://docs.meteor.com/

## Quick Start

Install Meteor:

    curl https://install.meteor.com | /bin/sh

Create a project:

    meteor create try-meteor

Run it:

    cd try-meteor
    meteor

Deploy it to the world, for free:

    meteor deploy try-meteor.meteor.com

## Slow Start (for developers)

If you want to run on the bleeding edge, or help develop Meteor, you
can run Meteor directly from a git checkout.

    git clone git://github.com/meteor/meteor.git
    cd meteor

If you're the sort of person who likes to build everything from scratch,
you can build all the Meteor dependencies (node.js, npm, mongodb, etc)
with the provided script. This requires git, a C and C++ compiler,
autotools, and scons. If you do not run this script, Meteor will
automatically download pre-compiled binaries when you first run it.

    # OPTIONAL
    ./scripts/generate-dev-bundle.sh

Now you can run meteor directly from the checkout (if you did not
build the dependency bundle above, this will take a few moments to
download a pre-build version).

    ./meteor --help

From your checkout, you can read the docs locally. The `/docs` directory is a
meteor application, so simply change into the `/docs` directory and launch
the app:

    cd docs/
    ../meteor

You'll then be able to read the docs locally in your browser at
`http://localhost:3000/`.

Note that if you run Meteor from a git checkout, you cannot pin apps to specific
Meteor releases or run using different Meteor releases using `--release`.

## Uninstalling Meteor

Aside from a short launcher shell script, Meteor installs itself inside your
home directory. To uninstall Meteor, run:

    rm -rf ~/.meteor/
    sudo rm /usr/local/bin/meteor

## Developer Resources

Building an application with Meteor?

* Announcement list: sign up at http://www.meteor.com/
* Ask a question: http://stackoverflow.com/questions/tagged/meteor
* Meteor help and discussion mailing list: https://groups.google.com/group/meteor-talk
* IRC: `#meteor` on `irc.freenode.net`

Interested in contributing to Meteor?

* Core framework design mailing list: https://groups.google.com/group/meteor-core
* Contribution guidelines: https://github.com/meteor/meteor/tree/devel/Contributing.md

We are hiring!  Visit https://www.meteor.com/jobs to
learn more about working full-time on the Meteor project.
