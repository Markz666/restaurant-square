import React, { Component } from "react";
import RestaurantList from "./RestaurantList";
class RestaurantListContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listOfMatchingRestaurants: []
        };
    }

    componentDidMount = async() => {
    	console.log("---------componentDidMount");
        const { match } = this.props;
        console.log(match.params);
        const restaurant = match.params.restaurantName;
        const location = match.params.restaurantLocation;
        console.log("---------restaurant:" + restaurant);
        console.log("location is: " + location);
        if (restaurant) {
            fetch('/api/getRestaurants?term=' + restaurant + "&location" + location)
            .then(response => {
                console.log(response.body);
            })
        }
        // if (restaurant) {
        //     const matches = await fetch('api/getRestaurants?term=' + restaurant);
        //     const body = await matches.json();
        //     console.log("---------componentDidMount:"+body);
        //     this.setState({
        //         listOfMatchingRestaurants: body
        //     });
        // }
    };
 

    componentWillReceiveProps = async newProps => {
        const currentMatch = this.props.match;
        const currentRestaurants = currentMatch.params.restaurantName;

        const newMatch = newProps.match;
        const newRestaurants = newMatch.params.restaurantName;
        if (newRestaurants && newRestaurants !== currentRestaurants) {
            const matches = await fetch('api/getRestaurants', {
                body: JSON.stringify({
                    term: newRestaurants,
                    location: 'jersey city, nj'
                })
            })
            const body = await matches.json();
            this.setState({
                listOfMatchingRestaurants: body
            });
        }
    };

    

    render() {
        if (!this.props.match.params.restaurantName) {
            return <h1>Search for restaurants</h1>;
        }
        const restaurants = this.state.listOfMatchingRestaurants;
        // console.log(tracks);
        return <RestaurantList restaurantList={restaurants} />;
    }
}

export default RestaurantListContainer;