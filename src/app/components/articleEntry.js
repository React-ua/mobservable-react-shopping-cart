import React from 'react';
import ReactDOM from 'react-dom';
import {observer} from 'mobservable-react';

const ENTER_KEY = 13;

@observer
export default class ArticleEntry extends React.Component {
	render() {
		return (
<div className="ui inverted segment">
	<div className="ui inverted form">
		<div className="two fields">
			<div className="field">
				<label>Name</label>
				<input 	ref="newArticleName" placeholder="What needs to be sale?" type="text" onKeyDown={this.handleNewArticleKeyDown}
				autoFocus={true}/>
			</div>
			<div className="field">
				<label>
					Price
				</label>
				<input ref ="newArticlePrice" placeholder="Price" type="number" 	 onKeyDown={this.handleNewArticleKeyDown}/>
			</div>
		</div>
		<div className="inline field">

			<div className="ui checkbox">
				<input
					ref ="inStock"
					type="checkbox"
			/>
				<label>
					In Stock
				</label>
			</div>
		</div>
	</div>
</div>
);
}


handleNewArticleKeyDown = (event) => {
	if (event.keyCode !== ENTER_KEY) {
		return;
	}

	event.preventDefault();

	var newName = ReactDOM.findDOMNode(this.refs.newArticleName).value.trim();
	var newPrice = ReactDOM.findDOMNode(this.refs.newArticlePrice).value.trim();
var isInStock = ReactDOM.findDOMNode(this.refs.inStock).checked;
	if (newName) {
		this.props.shopModel.addArticle(newName,newPrice, isInStock  );
		ReactDOM.findDOMNode(this.refs.newArticleName).value = '';
	}
}
}

ArticleEntry.propTypes = {
	shopModel: React.PropTypes.object.isRequired
}
