import React, { Component } from "react";
import { Link } from "react-router-dom";

class RestaurantList extends Component {
    render() {
        return (
          <div className="container">
            <div className="row">
              {this.props.restaurantList.map(restaurant => {
                return (
                    <div className="col-xs-4" key={restaurant.id}>
                      <ul>
                        <Link key={restaurant.id} to={`/display/${restaurant.id}`}>
                          {restaurant.name}
                        </Link>
                        <h5><b>categories: </b>{
                          restaurant.categories.map(category => {
                            return category.title + " "
                          })
                        }</h5>
            
                        <h5>rating: {restaurant.rating}</h5>
                        <h5>review count: {restaurant.review_count}</h5>
                        <h5>status: {restaurant.is_closed ? 'closed' : 'open'}</h5>
                        <h5>location: {restaurant.location.address1 + ", " + restaurant.location.city + ", " + restaurant.location.state + ", " + restaurant.location.country + ", " + restaurant.location.zip_code}</h5>
                        <img className="restaurant_list_img" src={restaurant.image_url} alt={restaurant.name}/>;
                      </ul>
                    </div>
                );
              })}
              </div>
        </div>
        );
    }
}

export default RestaurantList;