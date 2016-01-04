import {ShopModel, Article, ShoppingCart, ShoppingCartEntry} from './stores/shopModel';
import ViewModel from './stores/viewModel';
import ShoppingApp from './components/shoppingApp.js';
import React from 'react';
import ReactDOM from 'react-dom';

// Enable the dev tools:
// import 'mobservable-react-devtools';


var shopModel = new ShopModel('mobservable-react-shopping');
var viewModel = new ViewModel();
// Some available articles
var articles = [
    ["Funny Bunnies", 17.63],
    ["Awesome React", 23.95],
    ["Second hand Netbook", 50.00]
];
if (shopModel.articles[0] == null) {
articles.map((item) => {shopModel.addArticle(item[0], item[1])})
}

// Our shopping cart
var shoppingCart = new ShoppingCart();
// With a demo item inside

shoppingCart.entries.push(new ShoppingCartEntry(shopModel.articles[0]));
console.log(shoppingCart.entries[0]);

ReactDOM.render(
	<ShoppingApp shopModel={shopModel} viewModel={viewModel} shoppingCart={shoppingCart}/>,
	document.getElementById('shoppingapp')
);
