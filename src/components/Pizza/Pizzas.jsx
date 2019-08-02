import React from "react";

import PizzaList from "./PizzaList";
import Cart from "../Cart/Cart";

export default function Pizzas() {
  return (
    <section className="section main-container">
      <div className="container">
        <div className="columns is-multiline">
          <div className="column is-10-desktop is-12-tablet">
            <PizzaList />
          </div>
          <div className="column is-2-desktop is-12-tablet">
            <Cart />
          </div>
        </div>
      </div>
    </section>
  );
}
