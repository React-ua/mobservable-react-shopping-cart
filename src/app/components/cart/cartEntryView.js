import React from 'react';
import {observer} from 'mobservable-react';


@observer
export default class CartEntryView extends React.Component{
  constructor(props){
    super(props);
    this.removeArticle= this.removeArticle.bind(this);
  }
  render () {
    console.log("Rendering CartEntryView test " + this.props);
    return (
      <div className="item">
        <div className="ui small image">
          <img src="http://placehold.it/350x150"/>
        </div>

        <div className="content">
          <div className="header">{this.props.entry.article.name}</div>

            <div className="ui right floated button" onClick={this.removeArticle}>
            &laquo;
            </div>
          <div className="meta">
            <span className="price">{this.props.entry.amount}x</span>
            <span className="stay">Item(s)</span>
          </div>
        </div>
      </div>)
    }

    removeArticle() {
      const {shoppingCart} = this.props;
      console.log(shoppingCart.entries);
       if (--this.props.entry.amount < 1)
        shoppingCart.entries.splice(shoppingCart.entries.indexOf(this.props.entry), 1);
   }
  }
