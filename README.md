# SmartSous

## Dev Branch
  - For development; development server
  - `npm install` in root folder to get eslint code linting.
  - Make sure npm version is >=3.0.0 and <5.x.x for best results.

## Requirements
  - Functional
    - Users can enter a food and the quantity
    - Users can browse recipes
    - Recipes with some ingredients matching the user’s inventory will be suggested
    - Check others people’s inventory
    - Adjust recipe based on the number of people entered
    - Message a friend
  

## Client
  - **Note**: `npm ERR: missing peer dependencies` is normal, as we are using an alpha version of React. This should not affect the app.
  - Go into client folder
  - Make sure that watchman is installed
  - `npm install`
  - `npm start` to look at front end

### Best Practices
  - styles folder contain common fonts, colors, constants. Otherwise, create a new component and reuse it with a StyleSheet inside the component
  - screen folder contains the different screens the app has.
    - Screens are essentially 'container' items for our components
    - Screens should only have minimal styling; Positional styling, etc.
  - components folder contain functional components that can be used in multiple places throughout the app.
    - If the component does not need state, use a pure function instead of a class.
  - config folder contains settings, such as server URL, or routes.
  - Index.js is the entry point into our app.
## Server
  -
