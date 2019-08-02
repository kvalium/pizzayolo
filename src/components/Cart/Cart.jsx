import React from "react";
import { connect } from "react-redux";

import { flushCart } from "./store/actions";

export function Cart({ cart, flushCart }) {
  return (
    <>
      <h2 className="title is-h2">Mon Panier</h2>
      <ul>
        {cart.map(pizza => (
          <li key={pizza.id}>{pizza.name}</li>
        ))}
      </ul>
      <hr />
      <p>
        <b>{`Total: ${cart.reduce((acc, pizza) => acc + pizza.price, 0)} €`}</b>
      </p>
      <br />
      <button className="button is-warning" onClick={() => flushCart()}>
        Vider le panier
      </button>
    </>
  );
}

const mapStateToProps = state => ({
  cart: state.cartReducer.cart
});

const mapDispatchToProps = dispatch => ({
  flushCart: () => dispatch(flushCart())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
