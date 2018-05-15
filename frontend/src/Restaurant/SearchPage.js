import React, { Component } from "react";
import SearchForm from "./SearchForm";

class SearchPage extends Component {
    constructor(props) {
        super(props);
        document.title = "Search Page";
    }
    onSearch = (nameQuery, locationQuery) => {
        window.location.href = "/search/" + nameQuery + '&' + locationQuery;    
    };

    render() {
        return (
            <div className="row">
                <div className="col-6">
                    <SearchForm onSearch={this.onSearch}/>
                </div>
            </div>
        );
    }
}

export default SearchPage;