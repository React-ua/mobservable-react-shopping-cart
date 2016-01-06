![](https://raw.githubusercontent.com/loverajoel/jstips/master/resources/jstips-header-blog.gif)
# Introduction

Welcome to the this suite of the **Learning React** series! Up to this point, we’ve learned how React’s API allows us to create rich stateful components, how to use them in practice, how Facebook’s Flux architecture works & how to make your objects and functions (or React components) reactive.

Today we are going to put all of it together to create a basic shopping cart application. In a typical e-commerce website, the product detail page has several moving parts that rely on one another and React and Mobervable really helps simplify and organise the co-dependency between them.

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

```
src/
--index.js                         // Main application
--app/  
---css/
---- index.css
---actions/
---- FluxCartActions.js           // Our app's action creators
---components/
---- cart/                        // Cart Component
---- article/                      //  product Component

---stores/
------  shopModel.js             // Product Store
------  viewModel.js.js          // view Store
---utils.js                    // some utils : id generator, local storage ..
index.html
server.js
package.json
```
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

# shop Model : Article

In the interests of keeping us focused on React, we will be using a simple data model for our articles (products) that we are going to display.

Lets have a look at what our article model looks like :
```
class Article {
	constructor(store,id, name, price, inStock) {
			this.store = store;
			this.id = id;
			this.name = name;
			this.price = price;
			this.inStock = inStock;
	}

	setName(name) {
		this.name = name;
	}

	toJson() {
		return {
			id: this.id,
			name: this.name,
			price: this.price,
			inStock: this.inStock
		};
	}

	static fromJson(store, json) {
		return new Article(store, json.id, json.name, json.price, json.inStock);
	}
}
```
As you can see above, we define a article that has some property. Our schema mirrors the type of data you might typically get back from a call to a restful API. We go ahead and store/load this data into localStorage.

See below how our shop Model grabs our data from localStorage :

```
export class ShopModel {
	constructor(key) {
			this.key= is;
			this.articles= [];
			this.activeArticleCount= () => this.articles.reduce(
					(sum, article) => sum + (article.inStock ? 1 : 0),
					0
				);
			this.soldOut= () => this.articles.length - this.activeArticleCount;

		this.readFromLocalStorage();
		this.subscribeLocalStorageToModel();
	}

	readFromLocalStorage(model) {
		this.articles = Utils.getDataFromLocalStore(this.key).map(
			data => Article.fromJson(this, data)
		);
	}

	subscribeLocalStorageToModel(model) {
		autorun(() =>
			Utils.storeDataToLocalStore(this.key, this.articles.map(article => article.toJson()))
		);
	}
}
```

So now that we have our sample articles data, and a sample local storage call, how do we use this to bootstrap our application with “server” data?

It’s really as simple as just initialising our data. Our main index.js file, shown below, is responsible for this process:
```
var shopModel = new ShopModel(‘mobservable-react-shopping’);
var viewModel = new ViewModel();
// Some available articles
var articles = [
    [« Funny Bunnies », 17.63],
    [« Awesome React », 23.95],
    [« Second hand Netbook », 50.00]
];
if (shopModel.articles[0] == null) {
articles.map((item) => {shopModel.addArticle(item[0], item[1])})
}
ReactDOM.render(
	<ShoppingApp shopModel={shopModel} viewModel={viewModel} />,
	document.getElementById(‘shoppingapp’)
);

```

# Stores

Now that we have our main application defined, it is time to complete our Stores. Each Store manages application state for a domain within an application, so we are going to create one for our shop and one for our UI view. Let’s start with our ShopStore.
> see source of our final [ShopStore](https://github.com/React-ua/mobservable-react-shopping-cart/blob/master/src/app/stores/shopModel.js)

Above, we define two private methods, `readFromLocalStorage` and `subscribeLocalStorageToModel`. We use `readFromLocalStorage` to, unsurprisingly, load our saved article data into our shopModel object. Our `subscribeLocalStorageToModel` method is used to save article in local storage.

We can add data using the methods `addArticle`, which return their respective internal objects. These methods can be called after require‘ing our Store within a view.

Lastly, we use Mobservable  to enable our data structures to become observable.

Next up, let’s create our constructor function for shoppingCart:
```
export function ShoppingCart (){
		extendObservable(this, {
			 entries: [],
			 total: function () {
					 return (this.entries.reduce(function(sum, entry) {
							 return sum + entry.price;
					 }, 0));
			 }
	 })
	}
```

Above, we use the entries array to store the products that are currently in our cart, and the total function that Returns the total price of all of our cart items
Now that we have our Stores built.

We added `ShoppingCartEntry` to observe all the entry of the cart :
```
export function  ShoppingCartEntry (article){
		this.id = autoNumber++;
		extendObservable(this, {article: article, amount:1,
			price: function() {
		            return this.article ? this.article.price * this.amount : 0;
		        }
		})
	}
```

Now that we have our Stores built, its time to get our hands dirty and build out our Views.

# Main View : shoppingApp.js

Our main View is our top level component that listens for changes on our stores and then updates our application’s state by calling our the mobservable functions in the Store. This state is then passed down to child components via props.

This component is responsible for :

* Setting our applications state by calling two instances of Stores (shopStore and viewStore)
* Composing child components and passing state properties via props
* Listening for Store’s change even
* Setting the router

```
import React from ‘react’;
import {observer} from ‘mobservable-react’;
import {Router} from ‘director’;

import ArticleEntry from ‘./articleEntry’;
import ArticleOverview from ‘./articleOverview’;
import ArticleFooter from ‘./articleFooter’;
import CartView from ‘./cart/cartView’;
import * as ViewModel from ‘../stores/viewModel’;

@observer
export default class ShoppingApp extends React.Component {
	render() {
		const {shopModel, viewModel, shoppingCart } = this.props;
		console.log(shoppingCart);
		return (
			<div className=« ui two column entered grid »>
				<div className=« column » >
					<header className=« header »>
						<h1>ShoppingApp</h1>

						<ArticleEntry shopModel={shopModel} />
					</header>
				</div>
				<div className=« ui horizontal divider »>
	shopping list
</div>
					<div className=« ui raised very faded segment »>
				<div className=« column  row »>
					<div className=« column » >
						<p>Double-click to edit a article</p>
						<ArticleOverview shopModel={shopModel} viewModel={viewModel} shoppingCart={shoppingCart} />
						<ArticleFooter shopModel={shopModel} viewModel={viewModel} />

					</div>
				</div>
				</div>
				<div className=« ui right floated compact segment »>
				<div className=« column row »>
					<div className=« column » >
						<h3>Your shopping cart</h3>
						<CartView cart={shoppingCart} />
					</div>
				</div>
			</div>
			</div>
		);
	}

	componentDidMount() {
		var viewModel = this.props.viewModel;
		//  Assign routes to an object literal.
		var router = Router({
			‘/‘: function() { viewModel.articleFilter = ViewModel.ALL_ARTICLES; },
			‘/active’: function() { viewModel.articleFilter = ViewModel.ACTIVE_ARTICLES; },
			‘/soldout’: function() { viewModel.articleFilter = ViewModel.SOLDOUT_ARTICLES ; },
			‘/last’: [function() { viewModel.articleFilter = ViewModel.LAST_ARTICLES; }]
		});
		// Instantiate the router.
		router.init(‘/‘);
	}
}

ShoppingApp.propTypes = {
	viewModel: React.PropTypes.object.isRequired,
	shopModel: React.PropTypes.object.isRequired
}
```
We start by creating a decorator function @observer. The observer function / decorator can be used to turn ReactJS components into reactive components. It wraps the component’s render function in `mobservable.autorun` to make sure that any data that is used during the rendering of a component forces a rendering upon change. It is available through the separate mobservable-react package. 


In our render method, we compose our component using the `ArticleEntry`, `ArticleOverview`, `ArticleFooter` and `CartView` components. Here, we pass our state props down to them using component properties, or props.

We use for routing `Director` : the first element to define is the constructor like this `var router = Router(routes);`.
the Routing table is an object literal that contains nested route definitions. A potentially nested set of key/value pairs. The keys in the object literal represent each potential part of the URL. The values in the object literal contain references to the functions that should be associated with them.

All the function are updating the articleFilter in viewModel.

# Article View

It’s time to get down to the meat and potatoes of this app, and that is our Article view. We want to take the props that got passed from our main View, and make a rich, interactive product display.

Lets get this party started.

```
import React from ‘react’;
import {observer} from ‘mobservable-react’;
import * as ViewModel from ‘../stores/viewModel’;

import ArticleItem from ‘./ArticleItem’;

@observer
export default class ArticleOverview extends React.Component {
	render() {
		const {shopModel, viewModel, shoppingCart} = this.props;
		if (shopModel.articles.length === 0)
			return null;
		return (<table className=« ui compact celled definition table »>
  <thead className=« full-width »>
    <tr>
      <th></th>
      <th>Name</th>
      <th>Price</th>
      <th>SoldOut</th>
      <th></th>
    </tr>
  </thead>
	<tbody>

	{this.getVisibleArticle().map(article =>
		(<ArticleItem
			key={article.id}
			article={article}
			viewModel={viewModel}
			shoppingCart={shoppingCart}
		/>)
	)}
</tbody>
</table>)
	}

	getVisibleArticle() {
		let articles = this.props.shopModel.articles
		let last = articles[articles.length -1]

		return articles.filter(article => {
			switch (this.props.viewModel.articleFilter) {
				case ViewModel.ACTIVE_ARTICLES:
					return article.inStock;
				case ViewModel.SOLDOUT_ARTICLES:
					return !article.inStock;
				case ViewModel.LAST_ARTICLES:
					return article == last;
				default:
					return true;
			}
		});
	}

	toggleAll = (event) => {
		var checked = event.target.checked;
		this.props.shopModel.toggleAll(checked);
	}
}


ArticleOverview.propTypes = {
	viewModel: React.PropTypes.object.isRequired,
	shopModel: React.PropTypes.object.isRequired
}
```
Prior to our render method, we define filter methods that we bind to articles in our component. the filter  returns the articles, we can then map watch article to `ArticleItem` component.

```
import React from ‘react’;
import {observer} from ‘mobservable-react’;
import {ShoppingCartEntry} from ‘../stores/shopModel’

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

@observer
export default class ArticleItem extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {editText: props.article.name};
	}

	render() {
		const {viewModel, article, key, shoppingCart} = this.props;
		return (
			<tr >
				<td className=« collapsing »>
					{ article.inStock? <a className=« ui tag black label «  onClick = {this.handleToggle}>Buy</a> : <a className=« ui tag black label disabled » >Buy</a>

					}

				</td>
				<td>  <label onDoubleClick={this.handleEdit}>
					{article.name}
				</label>
				<input
					ref=« editField »
					className=
					{ this.props.viewModel.articleBeingEdited == article ?
				«  » : « edit »
						}
					value={this.state.editText}
					onBlur={this.handleSubmit}
					onChange={this.handleChange}
					onKeyDown={this.handleKeyDown}
					/>
			</td>
			<td>{article.price}</td>
			<td>{article.inStock ? « No » : « Yes »}</td>
			<td className=« selectable negative »>
				<a href=« # » onClick={this.handleDestroy}>Remove</a>
			</td>
		</tr>
	);
}

handleSubmit = (event) => {
	const val = this.state.editText.trim();
	if (val) {
		this.props.article.setName(val);
		this.setState({editText: val});
	} else {
		this.handleDestroy();
	}
	this.props.viewModel.articleBeingEdited = null;
}

handleDestroy = () => {
	this.props.article.destroy();
	this.props.viewModel.articleBeingEdited = null;
}

handleEdit = () => {
	const article = this.props.article;
	this.props.viewModel.articleBeingEdited = article;
	this.setState({editText: article.name});
}

handleKeyDown = (event) => {
	if (event.which === ESCAPE_KEY) {
		this.setState({editText: this.props.article.name});
		this.props.viewModel.articleBeingEdited = null;
	} else if (event.which === ENTER_KEY) {
		this.handleSubmit(event);
	}
}

handleChange = (event) => {
	this.setState({editText: event.target.value});
}

handleToggle = (event) => {
	const {viewModel, article, shoppingCart} = this.props;
	console.log(this.props);
        var existingEntry = shoppingCart.entries.find(function(entry) {
            return entry.article === this.props.article;
        }, this);
        if (existingEntry)
            existingEntry.amount += 1;
        else
            shoppingCart.entries.unshift(new ShoppingCartEntry(this.props.article));
    }

}

ArticleItem.propTypes = {
	article: React.PropTypes.object.isRequired,
	viewModel: React.PropTypes.object.isRequired
}

```



handleEdit – update the product name in th product is currently selected
handleToggle – Adds the currently selected product to the cart 

Inside of our render method, we check if the product are available to sell (its) by checking if  he is available in articles inventory. We use this to toggle the “Add To Cart” button’s state.

# Cart View

Gotta have a cart. So lets put one together. In our app, when a article is added to the cart, a single line item represents the quantity of that article can be increased, but it won’t create new line items. Instead, the quantity being purchased is displayed and the line item’s price adjusts accordingly.

```
import React from ‘react’;
import {observer} from ‘mobservable-react’;


@observer
export default class CartEntryView extends React.Component{
  constructor(props){
    super(props);
    this.removeArticle= this.removeArticle.bind(this);
  }
  render () {
    console.log(« Rendering CartEntryView test «  + this.props);
    return (
      <div className=« item »>
        <div className=« ui small image »>
          <img src=« http://placehold.it/350x150 »/>
        </div>

        <div className=« content »>
          <div className=« header »>{this.props.entry.article.name}</div>

            <div className=« ui right floated button » onClick={this.removeArticle}>
            &laquo;
            </div>
          <div className=« meta »>
            <span className=« price »>{this.props.entry.amount}x</span>
            <span className=« stay »>Item(s)</span>
          </div>
        </div>
      </div>)
    }

    removeArticle() {
      const {shoppingCart} = this.props;
      console.log(shoppingCart.entries);
       if (—this.props.entry.amount < 1)
        shoppingCart.entries.splice(shoppingCart.entries.indexOf(this.props.entry), 1);
   }
  }

```
And now we have a cart! Our cart component has three event methods:


removeArticle – Removes item from the cart and closes the cart
When rendering our cart, we use the map method to render out our line items. 

Notice on the `CartView` component, we added the key attribute. This is a special attribute used when adding dynamic children to a component. It is used internally in React to uniquely identify said children, so that they retain the proper order and state during reconciliation. If you remove this and open your console, you can see that React will throw a warning telling you that key hasn’t been set, and you will likely experience rendering anomalies.

```
import React from ‘react’;
import {observer} from ‘mobservable-react’;
import CartEntryView from ‘./cartEntryView’;
import CartTotalView from ‘./cartTotalView’;


@observer
export default class CartView extends React.Component {
  renderEntry(entry){
    const shoppingCart = this.props.cart;
    return (<CartEntryView  shoppingCart={shoppingCart}  entry={entry} key={entry.id} />);
  }
  render () {
    return (<div  className=« ui items »>
    {this.props.cart.entries.map(this.renderEntry.bind(this))}
    <div>
        <CartTotalView cart={this.props.cart} />
    </div>
</div>
    )
  }
}

```

For our style we use semantic-ui Framework, all that we are doing is adding semantic class, and letting CSS do the rest.

# Wrap Up

To see our app in action check out the link to the [demo](). Add items to the shopping store with inStock checked or unchecked to see our buttons’ states change and the totals of article update in the store.
Also, add items to the cart until to see our the totals update in the cart.

Don’t stop there though, take the demo source and try to add some new features to our cart, like a selectable options for article. 

This marks the end of the Learning React series, and I hope everybody has had as much fun learning it as I did writing it. I’m of the firm belief that 2016 will be the year of React, so take what you have learned here, get out there and build some cool stuff.