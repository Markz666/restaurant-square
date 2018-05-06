import React, { Component } from "react";
import RestaurantList from "./RestaurantList";
class RestaurantListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listOfMatchingRestaurants: [],
            foundResults: false
        };
        document.title = "Restaurant Result Page";
    }

    componentDidMount = async() => {
    	console.log("---------componentDidMount");
        const { match } = this.props;
        const restaurant = match.params.restaurantInfo;
        const restaurantInfo = restaurant.split('&');
        const restaurantName = restaurantInfo[0].replace(':', '');
        const location = restaurantInfo[1];
        console.log("---------restaurant: " + restaurantName);
        console.log("location is: " + location);

        if (restaurant) {
            const matches = await fetch('/api/getRestaurants?term=' + restaurantName + "&location=" + location);
            const body = await matches.json();
            if (body.message === 'invalid parameters') {
                this.setState({
                    listOfMatchingRestaurants: [],
                    foundResults: false
                })
            } else {
                this.setState({
                    listOfMatchingRestaurants: body,
                    foundResults: true
                }) 
            }
        }
    };
    isEmpty(obj) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    render() {
        if (!this.props.match.params.restaurantInfo) {
            return <h1>Search for restaurants</h1>;
        }
 
        const restaurants = this.state.listOfMatchingRestaurants;
        // if (this.isEmpty(restaurants)) {
        //     return <h1>Loading...</h1>
        // }
        if (restaurants) {
            if (this.state.foundResults === true) {
                return <RestaurantList restaurantList = {restaurants} />;
            } else {
                return (
                <div>
                    <h1>Loading...</h1> 
                    <p>If the loading time is too long, you may checkout another search term</p>
                </div>);
            }
        }
    }
}

export default RestaurantListContainer;