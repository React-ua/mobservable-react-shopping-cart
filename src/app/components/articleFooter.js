import React from 'react';
import {observer} from 'mobservable-react';
import {pluralize} from '../utils';
import * as ViewModel from '../stores/viewModel';
var cx = require('classnames');

@observer
export default class ArticleFooter extends React.Component {
	render() {
		const shopModel = this.props.shopModel;
		if (!shopModel.activeArticleCount && !shopModel.soldOut)
		return null;

		return (
			<footer className="footer">
				<div className="ui menu">
					<div className="ui labeled button" tabindex="0">
						<div className="ui red button">
							<i className="Shop icon"></i> In stock
							</div>
							<a className="ui basic red right pointing label">
								{shopModel.activeArticleCount}
							</a>

						</div>

						{this.renderFilterLink(ViewModel.ALL_ARTICLES, "", "All")}
						{this.renderFilterLink(ViewModel.ACTIVE_ARTICLES, "active", "Active")}
						{this.renderFilterLink(ViewModel.LAST_ARTICLES, "last", "Last")}
						{this.renderFilterLink(ViewModel.SOLDOUT_ARTICLES, "soldout", "SoldOut")}
						{ shopModel.soldOut === 0
							? null
							: 	<a
							className="item"
							onClick={this.clearSoldOut}>
							Clear soldOut
						</a>
					}
				</div>

			</footer>
		);
	}

	renderFilterLink(filterName, url, caption) {
		let className = cx("item", {active: (filterName ===  this.props.viewModel.articleFilter) });
		console.log(className);
		return (

			<a href={"#/" + url}
				className={className}>
				{caption}
			</a>
		)
	}

	clearSoldOut = () => {
		this.props.shopModel.clearSoldOut();
	}
}

ArticleFooter.propTypes = {
	viewModel: React.PropTypes.object.isRequired,
	shopModel: React.PropTypes.object.isRequired
}
