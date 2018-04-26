## A boilerplate for simple static react app

## Instructions

### To run the app locally

1. Make sure you have `node` and `npm` installed, if not refer to below.
    - Mac users: https://changelog.com/posts/install-node-js-with-homebrew-on-os-x
    - Windows users: http://blog.teamtreehouse.com/install-node-js-npm-windows

2. Alternatively, use [yarn](https://yarnpkg.com/en/) for faster dependency installation
    and more stable dependency management. You can use `yarn` in the place of `npm`.
    ```
    $ yarn install
    ```
    instead of
    ```
    $ npm install
    ```
    - Instructions for installation: https://yarnpkg.com/lang/en/docs/install/

3. Clone the repository.
    - Using SSH (recommended):
    ```
    $ git clone git@github.com:MisaOgura/react-static-app-boilerplate.git
    ```
    - Using HTTPS:
    ```
    $ git clone https://github.com/MisaOgura/react-static-app-boilerplate.git
    ```

4. Move into the cloned directory.
    ```
    $ cd react-static-app-boilerplate
    ```

5. Install dependencies.
    ```
    $ npm/yarn install
    ```

6. Run the app locally in a _development_ mode.
    ```
    $ npm/yarn start
    ```

This should automatically open up a window in a browser. If not, visit
`http://localhost:8080/`: you should see a `hello world` message.

7. Use the repo as a starting point of your app!


### To run tests

The project uses [Jest](https://facebook.github.io/jest/) as a test runner.
It comes with useful features like parallel testing, intelligent test watching
and coverage report.

1. Install dependencies, if you haven't done yet.

2. Run all the tests once.
    ```
    $ npm/yarn test
    ```
    - Also runs `standard` ([JavaScript Standard Style](https://standardjs.com/))
    at the end to highlight any linting errors.

3. Run tests in a watch mode.
    ```
    $ npm/yarn test:watch
    ```

Happy TDD!


## Contributions

Please feel free to raise PRs or open issues to help improve the boilerplate.


## Authour

Misa Ogura
