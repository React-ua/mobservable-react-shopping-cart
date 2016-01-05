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


