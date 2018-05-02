import React, { Component } from "react";

class SearchForm extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            searchQuery: "",
        };
    }

    onSubmit = e => {
        e.preventDefault();
        if (this.state.searchQuery) {
            this.props.onSearch(this.state.searchQuery);
        }
    };

    onSearchQueryChange = e => {
        this.setState({
            searchQuery: e.target.value
        });
    };

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label htmlFor="restaurantName">
                    Which restaurant or position do you wanna search for?
                    </label>
                    <input
                      type="text"
                      value={this.state.searchQuery}
                      onChange={this.onSearchQueryChange}
                      className="form-control"
                      id="restaurantName"
                      aria-describedby="restaurantHelp"
                      placeholder="Track..."
                    />
                    <small id="trakcHelp" className="form-text text-muted">
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