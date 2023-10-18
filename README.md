# FinalFront

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.0.

## Prerequisites
1. Install [Node.js](https://nodejs.org/en/download/).
2. Install [Angular CLI] (https://cli.angular.io/).
3. Install [Git](https://git-scm.com/downloads).
4. Install [Visual Studio Code](https://code.visualstudio.com/download).


## Cloning the repository
1. Open a terminal.
2. Navigate to the directory where you want to clone the repository.
3. Run `git clone url-to-hithup-repository` to clone the repository.


## Development server
1. Run `npm install` to install all dependencies.
2. Run `npm run start` to start the development server.
3. Navigate to `http://localhost:4200/` to view the application.

## Production server
1. Run `npm install` to install all dependencies.
2. Run `npm run build` to build the project.
3. Run `npm run start:prod` to start the production server.

## Configuring the proxy server for local development\
1. Create a file named `proxy.conf.json` in the root directory of the project.
2. Add the following content to the file:
```
{
  "/api": {
    "target": "http://localhost:8080",
    "secure": false
  }
}
```
3. Run `npm run start:proxy` to start the development server with the proxy configuration.
4. Navigate to `http://localhost:4200/` to view the application.

