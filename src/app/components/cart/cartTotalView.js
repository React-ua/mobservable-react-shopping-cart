import React from 'react';
import {observer} from 'mobservable-react';

@observer
export default class CartTotalView extends React.Component{
  render () {
    return (
      <div className="ui item bottom attached warning message">
      Total: {("€ " + this.props.cart.total).replace(/(\.\d\d)\d*/,"$1")}
</div>);
      }
    }
