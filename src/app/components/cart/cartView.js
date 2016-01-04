import React from 'react';
import {observer} from 'mobservable-react';
import CartEntryView from './cartEntryView';
import CartTotalView from './cartTotalView';


@observer
export default class CartView extends React.Component {
  renderEntry(entry){
    const shoppingCart = this.props.cart;
    return (<CartEntryView  shoppingCart={shoppingCart}  entry={entry} key={entry.id} />);
  }
  render () {
    return (<div  className="ui items">
    {this.props.cart.entries.map(this.renderEntry.bind(this))}
    <div>
        <CartTotalView cart={this.props.cart} />
    </div>
</div>
    )
  }
}
