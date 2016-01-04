import React from 'react';
import {observer} from 'mobservable-react';
import {Router} from 'director';

import ArticleEntry from './articleEntry';
import ArticleOverview from './articleOverview';
import ArticleFooter from './articleFooter';
import CartView from './cart/cartView';
import * as ViewModel from '../stores/viewModel';

@observer
export default class ShoppingApp extends React.Component {
	render() {
		const {shopModel, viewModel, shoppingCart } = this.props;
		console.log(shoppingCart);
		return (
			<div className="ui two column centered grid">
				<div className="column" >
					<header className="header">
						<h1>ShoppingApp</h1>

						<ArticleEntry shopModel={shopModel} />
					</header>
				</div>
				<div className="ui horizontal divider">
	shopping list
</div>
					<div className="ui raised very paded segment">
				<div className="column  row">
					<div className="column" >
						<p>Double-click to edit a article</p>
						<ArticleOverview shopModel={shopModel} viewModel={viewModel} shoppingCart={shoppingCart} />
						<ArticleFooter shopModel={shopModel} viewModel={viewModel} />

					</div>
				</div>
				</div>
				<div className="ui right floated compact segment">
				<div className="column row">
					<div className="column" >
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
			'/': function() { viewModel.articleFilter = ViewModel.ALL_ARTICLES; },
			'/active': function() { viewModel.articleFilter = ViewModel.ACTIVE_ARTICLES; },
			'/soldout': function() { viewModel.articleFilter = ViewModel.SOLDOUT_ARTICLES ; },
			'/last': [function() { viewModel.articleFilter = ViewModel.LAST_ARTICLES; }]
		});
		// Instantiate the router.
		router.init('/');
	}
}

ShoppingApp.propTypes = {
	viewModel: React.PropTypes.object.isRequired,
	shopModel: React.PropTypes.object.isRequired
}
