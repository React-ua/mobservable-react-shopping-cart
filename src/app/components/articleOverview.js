import React from 'react';
import {observer} from 'mobservable-react';
import * as ViewModel from '../stores/viewModel';

import ArticleItem from './ArticleItem';

@observer
export default class ArticleOverview extends React.Component {
	render() {
		const {shopModel, viewModel, shoppingCart} = this.props;
		if (shopModel.articles.length === 0)
			return null;
		return (<table className="ui compact celled definition table">
  <thead className="full-width">
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
					return !article.completed;
				case ViewModel.COMPLETED_ARTICLES:
					return article.completed;
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
