# Android Filetransfer

**Clone and run for a quick way to see an AFT in action.**

## To Use

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/gbssg/android-filetransfer.git
# Go into the repository
cd android-filetransfer
# Install dependencies and run the app
npm install && npm start
```

#### First-ever installation

If you havent used any Node.js project before, follow the following steps below and above such as installing
Git and Node.js.

```bash
# Mac OS X only!
sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}

git clone https://github.com/gbssg/android-filetransfer.git
cd android-filetransfer

npm install -g npm && npm install -g bower gulp
npm install && gulp && npm start
```

## Useful Links (Docs)

* **Client-Side ressources**
    * Angular.js [ng:route](https://docs.angularjs.org/api/ngRoute) directive (Routing System)
    * Angular.js [ng:include](https://docs.angularjs.org/api/ng/directive/ngInclude) directive (Partials)
    * Angular.js [ng:animate](https://docs.angularjs.org/api/ngAnimate) directive (View transitions)
    * Angular.js [ng:repeat](https://docs.angularjs.org/api/ng/directive/ngRepeat) directive (Loops)
    * Angular.js [ng:bind](https://docs.angularjs.org/api/ng/directive/ngBind) directive (Input binding)
    * Angular.js [ng:click](https://docs.angularjs.org/api/ng/directive/ngClick) directive (On-Click)
    * Angular.js [ng:controller](https://docs.angularjs.org/api/ng/directive/ngController) directive (MVC-Controller)
    * Angular.js [ng:if](https://docs.angularjs.org/api/ng/directive/ngIf) directive (Conditionals)
    * Angular.js [$http](https://docs.angularjs.org/api/ng/provider/$httpProvider) service (AJAX)
    * Angular.js [$scope](https://docs.angularjs.org/guide/scope) application model (Base)
* **Server-Side ressources**
    * Electron [API Documentation](http://electron.atom.io/docs/) for application-core ressources
    * ECMAScript 6 [Guide and How-To basics](http://www.2ality.com/2015/08/getting-started-es6.html)
    * Repository of the [node-usb](https://github.com/nonolith/node-usb) module for accessing device infos and r/w process
    * Repository of the [node-usb-detection](https://github.com/MadLittleMods/node-usb-detection) module to view connected usb devices and list them with a name and extended information
    * List of [USB ID's](http://www.linux-usb.org/usb.ids) for Product and Vendor
* **Version Control with Git**
    * Guide [Git for dummies](https://rogerdudler.github.io/git-guide/index.de.html) with examples and explenations
* **Unit-Testing ressources**
    * Assertion with the [chai](http://chaijs.com/api/bdd/) library
    * Test-suite [mocha](https://mochajs.org/) used for running tests and reporting results

#### License [Apache License Version 2](LICENSE)
