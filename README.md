## Code Test for PwC

### Notes

Time spent just under 3 hours.

If I had more time I would address the accessibility.

I've made a number of trade offs for the sake of time I haven't used StyledComponents, I've just used good old fashioned CSS modules.

Note styling on whole is just very basic, I've only covered off mobile. Tablet and Desktop seemed overkill.

For state management I've used React Context, IMO it would have been too much to use Redux, RxJs, or XState on something as trivial as a todo application.

To get started run the following commands (I'm assuming you have NVM installed, if not make sure are running atleast node 12 or higher)

```
  nvm use
  npm i
  npm run start
```

Site should start running on port: 3000, check before hand you don't have anything running on this otherwise the site will not start.

To execute the unit tests

```
   npm rum test
 ```

To run the e2e tests

```
  npm run cypress
 ```

*  App needs to be up and running on you localhost for the e2e tests to run