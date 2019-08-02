import React, { Component } from "react";
import { connect } from "react-redux";

import { appendPizzaList } from "./store/actions";

import fetchPizzas from "./services/fetchPizzas";
import PizzaItem from "./PizzaItem";
import PizzaLoading from "./PizzaLoading";

class PizzaList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredPizzas: [],
      loading: true,
      showFilterLabel: false
    };
  }

  componentDidMount() {
    // retrieve pizzas from the store if possible
    if (this.props.pizzas.length > 0) {
      this.setState({
        filteredPizzas: this.props.pizzas,
        loading: false
      });
      return;
    }
    // fetch pizzas from backend
    fetchPizzas().then(pizzas => {
      this.props.appendPizzaList(pizzas);
      this.setState({
        filteredPizzas: pizzas,
        loading: false
      });
    });
  }

  shouldComponentUpdate(_nextProps, nextState) {
    return (
      JSON.stringify(this.state.filteredPizzas) !==
      JSON.stringify(nextState.filteredPizzas)
    );
  }

  onFilter = e => {
    const { pizzas } = this.props;
    const filter = e.target.value.toLowerCase();
    const filteredPizzas = pizzas.filter(({ name }) =>
      name.toLowerCase().includes(filter)
    );
    const showFilterLabel = pizzas.length !== filteredPizzas.length;
    this.setState({ filteredPizzas, showFilterLabel });
  };

  render() {
    const { loading, showFilterLabel, filteredPizzas } = this.state;
    if (loading) {
      return <PizzaLoading />;
    }
    return (
      <>
        <div className="filter-container">
          <h1 className="title is-h1">Nos Délicieuses Pizzas</h1>
          <div className="field">
            <label className="label">Filtrer: </label>
            <div className="control">
              <input
                className="input is-primary"
                type="text"
                placeholder="nom de la pizza"
                onChange={this.onFilter}
              />
            </div>
          </div>
          {showFilterLabel && (
            <article class="message is-success">
              <div className="message-body">
                {`${
                  filteredPizzas.length ? filteredPizzas.length : "Aucune"
                } pizza(s) trouvée(s)`}
              </div>
            </article>
          )}
        </div>

        <div className="columns is-multiline">
          {filteredPizzas.map(pizza => (
            <div key={pizza.id} className="column is-4-desktop is-6-tablet">
              <PizzaItem pizza={pizza} />
            </div>
          ))}
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  pizzas: state.pizzaReducer.pizzas
});

const mapDispatchToProps = dispatch => ({
  appendPizzaList: pizzas => dispatch(appendPizzaList(pizzas))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PizzaList);
