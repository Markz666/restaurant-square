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
        console.log(match);
        const restaurant = match.params.restaurantName;
        console.log("---------restaurant:"+restaurant);
        if (restaurant) {
            const matches = await fetch('api/getRestaurants', {
                body: JSON.stringify({
                    term: restaurant,
                    location: 'jersey city, nj'
                })
            })
            const body = await matches.json();
            console.log("---------componentDidMount:"+body);
            this.setState({
                listOfMatchingRestaurants: body
            });
        }
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