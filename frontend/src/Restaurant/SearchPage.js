import React, { Component } from "react";
import SearchForm from "./SearchForm";
import { Redirect } from "react-router-dom";

class SearchPage extends Component {
    onSearch = (searchQuery) => {
        window.location.href = "/search/:" + searchQuery;
    };

    render() {
        return (
            <div className="row">
                <div className="col-6">
                    <SearchForm onSearch={this.onSearch}/>;
                </div>
            </div>
        );
    }
}

export default SearchPage;