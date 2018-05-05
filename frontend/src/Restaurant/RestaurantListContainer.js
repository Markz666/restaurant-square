import React, { Component } from "react";
import RestaurantList from "./RestaurantList";
class RestaurantListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listOfMatchingRestaurants: []
        };
        document.title = "Restaurant Result Page";
    }

    componentDidMount = async() => {
    	console.log("---------componentDidMount");
        const { match } = this.props;
        console.log(match.params);
        const restaurant = match.params.restaurantInfo;
        const restaurantInfo = restaurant.split('&');
        const restaurantName = restaurantInfo[0].replace(':', '');
        const location = restaurantInfo[1];
        console.log("---------restaurant: " + restaurantName);
        console.log("location is: " + location);

        if (restaurant) {
            const matches = await fetch('/api/getRestaurants?term=' + restaurantName + "&location=" + location);
            const body = await matches.json();
            console.log(body.businesses);
            this.setState({
                listOfMatchingRestaurants: body
            }) 
        }
    };
    isEmpty(obj) {
        for(let key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    render() {
        if (!this.props.match.params.restaurantInfo) {
            return <h1>Search for restaurants</h1>;
        }
        
        const restaurants = this.state.listOfMatchingRestaurants;
        if (this.isEmpty(restaurants)) {
            return <h1>Restaurant Not Found</h1>
        }
        if (restaurants) {
            return <RestaurantList restaurantList = {restaurants} />;
        } else {
            return <h1>Loading......</h1>;
        }
    }
}

export default RestaurantListContainer;