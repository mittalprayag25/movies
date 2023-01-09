# MoviesChill

A simple app to browse movies from TMDB

```sh
yarn && yarn start
```

Can now see application running at http://localhost:7007/

## Task Acceptance Criteria

### As a movie critic

```
I want to Rate movies that I have watched out of 5
So that I can remember what I've watched and what I liked
```

#### Scenario: Rate a movie for the first time

```
Given I am viewing movie details of a single movie
When I have not rated this movie before
Then I am prompted to rate this movie out of 5
```

#### Scenario: Viewing a rated movie

```
Given I am viewing all movies
When I have rated a movie
Then I see the rating out of 5 next to that movie
```

```
Given I am viewing movie details of a single movie
When I have rated this movie previously
Then I can see the movie's rating
```

#### Scenario: Editing a movie's review

```
Given I am viewing movie details of a single movie
When I click to edit the rating
Then I am able to change the movie's rating
```

#### Scenario: Using a different browser

```
Given I am using a different browser to the one I had used previously
When I attempt to view the ratings I have given
Then I am unable to find them
```

```
Given I am using a the same browser that I used to rate my movies
When I refresh the page
Then I am able to see the ratings
```

### Hints

- We are looking to see how you compose components. There are a few off the shelf rating components feel free to use them, but to impress us maybe write your own components for this exercise.
- Look at the npm scripts we have provided in the project, some may be useful to you.
- Ideally, the code solution should fit in with the rest of the application as far as code style and persistence flow.
- Make sure your code is 'production ready', i.e., you would (hypothetical) be happy to support your solution with actual users using it.

### A note about the codebase

This codebase is not emblematic of code in our production systems.
The Movies codebase while small, intentionally includes some complexities and technologies meant to be challenging to work with.
The codebase is intended to be tricky, that's why it's a test :)

Whilst we at Hyphen Group do use React heavily our production code is, typically, much cleaner and more modern.
We focus heavily on page speed and website performance, something that this Movie codebase does not demonstrate.
For example, our current preferred stack uses NextJs, Preact, and Tailwind for much of our page rendering, and a graphql API to our backend systems.

If you have any suggestions for how you would improve the Movie codebase, include these in your submission.

### Scope of improvement for better architecture and codeing practices

1. Use of Ramda to very high extent that code seems almost unreadable to developers at first go, Code can be more readable, understandable and maintainable that new developers when join should not face issues and should ramp up quickly. Javascript libraries for array or object operations can be used more to give sense of clarity

2. Use of library like with-resources that have very less support can be avoided as if get stuck somewhere needs references and also the lib should have good maintainers and recognition.
3. Jest snapshots already there , though we can add Cypress for end to end testing and visual snapshots
4. try to make micro front end architecture - To start with having a module as npm package. This can help to make smaller agile teams with focus on particular module or feature and once done can be plug and play in the main project. It increases the reusability and bring micro front end culture and avoids monolith.
5. Multiple tools that can help here that can bundle the module as npm package and used in package.json when required. (This can have set of screens as well for e.g. payment module that have various payment methods)
6. Can make a design library that be used by various teams as components like : Buttons, Text, scrollviews, CHeckboxes, otp, dialogs etc. This library can be a npm package. Storybook shows the implementation
7. Theming can be added to the context of react app so that theming is controllable by a click or option.
8. Can make logic reusable to React Native and React web apps by having comming logic layer and design layer that can choose between web and mobile as per rendering.
9. Seperating the CSS files, js file can be huge for high use of css in components
10. Could use Preact for smaller modules (for speed and performance) and export as npm packages and can be used in React Super App project. It should not effect the whole architecture if the application
