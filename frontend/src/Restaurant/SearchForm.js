import React, { Component } from "react";

class SearchForm extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            nameQuery: "",
            locationQuery: ""
        };
    }

    onSubmit = e => {
        e.preventDefault();
        if (this.state.nameQuery && this.state.locationQuery) {
            console.log("on submit");
            this.props.onSearch(this.state.nameQuery, this.state.locationQuery);
        }
    };

    onNameQueryChange = e => {
        this.setState({
            nameQuery: e.target.value
        });
    };

    onLocationQueryChange = e => {
        this.setState({
            locationQuery: e.target.value
        })
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label htmlFor="restaurantName">
                    Which restaurant or position do you wanna search for?
                    </label>
                    <div className="searchInputs">
                    <input
                      type="text"
                      value={this.state.nameQuery}
                      onChange={this.onNameQueryChange}
                      className="form-control"
                      id="restaurantName"
                      aria-describedby="restaurantHelp"
                      placeholder="Restaurant..."
                    />
                    <input
                      type="text"
                      value={this.state.locationQuery}
                      onChange={this.onLocationQueryChange}
                      className="form-control"
                      id="restaurantLocation"
                      placeholder="Location..."
                    />
                    </div>
                    <small id="restaurantHelp" className="form-text text-muted">
                    Every one has a favorite restaurant; which do you want to search for?
                    </small>
                </div>
                <button type="submit" className="btn btn-primary">
                Search for restaurant
                </button>
            </form>
        );
    }
}

export default SearchForm;