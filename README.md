![](.common/images/nsbanner.png?raw=true)

# NS60603 React Programming using TypeScript - Student Files

<img align="right" width="100" height="100" src="./.common/images/React-icon.svg" />
This project contains the lab framework for the React Programming using TypeScript class.
You may clone the framework or download a zip of the framework on this page.
There are working solutions for all of the labs, and example projects, that may be a good reference for building React programs
with TypeScript even if you are not interested in the course.

Do the rapidly changing landscape of React, TypeScript, and web application programming in general, this material is updated frequently.
Feel free to come back and download new versions whenever you want to.

## License

The lab framework code is licensed under the MIT license. The corresponding courseware is not. You may use and modify all or part of it as you choose, as long as attribution to the source is provided per the license. See the details in the [license file](React_Programming_TS/LICENSE.md) or at the [Open Source Initiative](https://opensource.org/licenses/MIT)

## Class Setup

Administrative access may be required to install some tools. If you are taking the class online, you may want to consider using dual
monitors or working in an environment with a projection screen to follow what the instructor demonstrates.

### Required Software Configuration

* Node.js version 10, available at https://nodejs.org; all of the labs in the current version have been tested with Node 10.14.1. They may work with slightly earlier or later versions (9? 11?) of Node installed. As a developer if you need to run different versions of node for different projects, you may want to look at the **Node Version Manager**, available for Windows at https://github.com/coreybutler/nvm-windows and for the Mac at https://github.com/creationix/nvm (or using HomeBrew at https://www.wdiaz.org/how-to-install-nvm-with-homebrew/).
* The FREE Microsoft Visual Studio Code IDE - get the latest version at https://code.visualstudio.com/.
* Chrome or Firefox browser with the React Dev Tools. Look to the [Chrome Web Store](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) or the [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/) to install the tools.
* Access to https://npmjs.org, https://registry.npmjs.org, and https://github.com. 

## Student Files Folder Layout

```
Student_Files
│
└── React_Programming_TS
    └── Examples
    │    └── 02_Components
    │    └── ...
    │ 
    └── Labs
    │       .gitignore
    │ 
    └── Resources
    │    └── 02_Components
    │    └── ...
    │ 
    └── Solutions
        └── 01_React
        └── 02_Components
        └── ...
```

* All courses have a separate folder under Student_Files so they can exist side-by-side.
* Each lab folder has a number and a name, to remind you of what the lab was about.
* The Labs folder is an empty space to do your work.
* You can always copy the solution of a previous lab as the starting point for a new lab.

## Running the Solutions

Working in each solution folder at the command line use *npm install* to load the npm packages for the project, then launch the project
with *npm start*. The *WebPack* build tool that runs (and stays running) will launch a browser to display the project page.

Starting with the *04_State* project, the web service providing coffee shop data must be running before the project starts.
Run this from the *Resources/WebService* folder by running *npm install* to load all the dependencies, and then *npm start* to launch
the service.

<hr>
Copyright © 2018 NextStep IT Training. All rights reserved.