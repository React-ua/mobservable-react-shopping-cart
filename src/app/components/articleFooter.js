import React from 'react';
import {observer} from 'mobservable-react';
import {pluralize} from '../utils';
import * as ViewModel from '../stores/viewModel';

@observer
export default class ArticleFooter extends React.Component {
	render() {
		const shopModel = this.props.shopModel;
		if (!shopModel.activeArticleCount && !shopModel.soldOut)
			return null;

		const activeArticleWord = pluralize(shopModel.activeArticleCount, 'item');

		return (
			<footer className="footer">
				<span className="todo-count">
					<strong>{shopModel.activeArticleCount}</strong> {activeArticleWord} left
				</span>
				<ul className="filters">
						{this.renderFilterLink(ViewModel.ALL_ARTICLES, "", "All")}
						{this.renderFilterLink(ViewModel.ACTIVE_ARTICLES, "active", "Active")}
						{this.renderFilterLink(ViewModel.LAST_ARTICLES, "last", "Last")}
						{this.renderFilterLink(ViewModel.COMPLETED_ARTICLES, "completed", "completed")}
				</ul>
				{ shopModel.soldOut === 0
					? null
					: 	<button
							className="clear-completed"
							onClick={this.clearSoldOut}>
							Clear completed
						</button>
				}
			</footer>
		);
	}

	renderFilterLink(filterName, url, caption) {
		return (<li>
			<a href={"#/" + url}
				className={filterName ===  this.props.viewModel.articleFilter ? "selected" : ""}>
				{caption}
			</a>
			{' '}
		</li>)
	}

	clearSoldOut = () => {
		this.props.shopModel.clearSoldOut();
	}
}

ArticleFooter.propTypes = {
	viewModel: React.PropTypes.object.isRequired,
	shopModel: React.PropTypes.object.isRequired
}
