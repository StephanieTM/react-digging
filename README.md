# readme

## start-up

- Development
  - Developing through webpack-dev-server (with HMR turned on)
    - execute command `yarn` to install dependencies
    - execute command `yarn run dev` to start devServer
    - visit `http://localhost:3000`
    - start developing
  - Developing with stand-alone node web server
    - execute command `yarn` to install dependencies
    - execute command `yarn run watch` to start webpack and watch files
    - execute command `yarn run server` to start web server on which bundled files would be hosted
    - visit `http://localhost:3000`
    - start developing

- Production
  - Server production app with node web server
    - execute command `yarn` to install dependencies
    - execute command `yarn run build` to generate bundle files
    - execute command `yarn run server` to start web server on which bundled files would be hosted
    - visit `http://localhost:3000`
