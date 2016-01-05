#introduction

Welcome to the this sute of the **Learning React** series! Up to this point, we’ve learned how React’s API allows us to create rich stateful components, how to use them in practice, how Facebook’s Flux architecture works & how to make your objects and functions (or React components) reactive.

Today we are going to put all of it together to create a basic shopping cart application. In a typical e-commerce website, the product detail page has several moving parts that rely on one another and React and Mobervable really helps simplify and organize the co-dependency between them.

Our first step to architecting an application is defining what it should do. We want to:

*   Add product to the store with some options
*   Display a product 
*   Change the price when selecting an option
*   Change the product options in the store
*   Display the number of items in the store
*   Add filters to the store
*   Add items to the cart
*   Remove items from the cart
*   Display the number of items in the cart
*   Display the total price of the items in the cart
*   Display the total price for each option in the cart based upon quantity
*   Change our “Add To Cart” button caption to “Sold Out” and disable it when inventory is depleted for a given option
*   Display the cart after adding a product or clicking the “View Cart” button

This is what our finished product should look like:

### Directory Structure


Below, check out our `package.json` file. We will be using the following modules:

*   classnames": "2.2.2"
*   "director": "1.2.8"
*   "mobservable": "^1.0.0"
*   "mobservable-react": "^2.0.0"
*   "react": "^0.14.0"
*   "react-dom": "^0.14.0"

for developpement modules, we will using :
* "babel-core": "^5.4.7"
* "babel-eslint": "^3.1.9"
* "babel-loader": "^5.1.2"
* "eslint-plugin-react": "^2.3.0"
* "mobservable-react-devtools": "^2.0.1"
* "react-hot-loader": "^1.2.7"
* "webpack": "^1.9.6"
* "webpack-dev-server": "^1.8.2"

We can run `npm install` to install all of our dependencies, and then use the `npm start` command to start a process that watches our project and bundles our source on save.

