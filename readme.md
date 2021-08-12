> ⚠ **this is just a beta v0.0.1**, expect errors ; and some messing functionality

<div  align="center">
    <img src="./statics/icon.png" width="180px" height="180px" alt="file-browser icon" />
</div>

<h1  align="center" >File Browser</h1>

![file-browser version](https://img.shields.io/badge/dynamic/json?label=version&query=version&url=https%3A%2F%2Fraw.githubusercontent.com%2FAbachouch%2Ffile-browser%2Fmain%2Fpackage.json)
![alt ima](https://img.shields.io/badge/platform-win-lightgray)
![alt ima](https://img.shields.io/github/issues/Abachouch/file-browser)

A minimal file explorer designed for **front-end developers** 🎉 , built with [React](https://reactjs.org) and [Electron](https://www.electronjs.org)

## technologies

**file-browser** is an Electron js application therefore it uses web technologies (JavaScript, HTML, and CSS ) like any other website,

[![react version](https://img.shields.io/badge/dynamic/json?color=green&label=react&query=dependencies.react&url=https%3A%2F%2Fraw.githubusercontent.com%2FAbachouch%2Ffile-browser%2Fmain%2Fpackage.json)](https://reactjs.org)
[![electron version](https://img.shields.io/badge/dynamic/json?label=electron&query=devDependencies.electron&url=https%3A%2F%2Fraw.githubusercontent.com%2FAbachouch%2Ffile-browser%2Fmain%2Fpackage.json)](https://www.electronjs.org)
[![webpack version](https://img.shields.io/badge/dynamic/json?label=webpack&query=devDependencies.webpack&url=https%3A%2F%2Fraw.githubusercontent.com%2FAbachouch%2Ffile-browser%2Fmain%2Fpackage.json)](https://webpack.js.org)
[![sass version](https://img.shields.io/badge/dynamic/json?label=sass&query=devDependencies.sass&url=https%3A%2F%2Fraw.githubusercontent.com%2FAbachouch%2Ffile-browser%2Fmain%2Fpackage.json)](https://sass-lang.com)
[![nedb-promises version](https://img.shields.io/badge/nedb--promises-^5.0.0-success)](https://github.com/louischatriot/nedb)
[![node-disk-info version](https://img.shields.io/badge/node--disk--info-^1.3.0-success)](https://www.npmjs.com/package/node-disk-info)
[![electron-builder version](https://img.shields.io/badge/electron--builder-^22.11.7-success)](https://github.com/electron-userland/electron-builder)
[![@reduxjs/toolkit version](https://img.shields.io/badge/@reduxjs/toolkit-^1.6.0-success)](https://redux.js.org)

## Usage

first clone or download projects code to your local directory , then install dependencies

```
# Clone the repository
git clone https://github.com/Abachouch/file-browser.git

# Go into the repository
cd file-browser

# Install the dependencies
yarn
```

to start electron app

```
# first build the react app
yarn build

# then run electron
yarn start
```

to generate `file-browser Setup 0.0.1.exe` (for now its windows only 😁)

```
yarn build
yarn dist
```

in the dist folder click on the executable 🚀 (enjoy)

## Features :

- [x] run scripts in package.json
- [x] save folders as projects
- [x] filter files by type
- [x] pin Folders
- [x] tag files
- [x] copy svg code
- [x] show text files
- [x] open in external apps
- [x] builtin audio player
- [x] themes ( dark / light / blue )

![img](./screenshots/Screenshot%202021-08-08%20181557.png)

## TODO

- [ ] save files in moodboards
- [ ] get color palete from images
- [ ] create new a nodejs Project
- [ ] git integration
- [ ] resize image for web
- [ ] highlight code
- [ ] control the view of image preview
- [ ] build for linux

---

## Screenshots

![img](./screenshots/filebrowser_folder.png)

![img](./screenshots/filebrowser_empty_folder.png)

![img](./screenshots/run%20script%20720.gif)

## License

GNU/GPL Version 3
