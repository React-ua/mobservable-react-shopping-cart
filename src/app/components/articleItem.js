import React from 'react';
import {observer} from 'mobservable-react';
import {ShoppingCartEntry} from '../stores/shopModel'

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
				<td className="collapsing">
					{ article.inStock? <a className="ui tag black label " onClick = {this.handleToggle}>Buy</a> : <a className="ui tag black label disabled" >Buy</a>

					}

				</td>
				<td>  <label onDoubleClick={this.handleEdit}>
					{article.name}
				</label>
				<input
					ref="editField"
					className=
					{ this.props.viewModel.articleBeingEdited == article ?
				"" : "edit"
						}
					value={this.state.editText}
					onBlur={this.handleSubmit}
					onChange={this.handleChange}
					onKeyDown={this.handleKeyDown}
					/>
			</td>
			<td>{article.price}</td>
			<td>{article.inStock ? "No" : "Yes"}</td>
			<td className="selectable negative">
				<a href="#" onClick={this.handleDestroy}>Remove</a>
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
