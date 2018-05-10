import React, { Component } from "react";
import { Link } from "react-router-dom";

class RestaurantList extends Component {
    render() {
        return (
          <div className="container">
            <h1>These are the restaurants that you may interested in:</h1>
            <div className="row">
              {this.props.restaurantList.map(restaurant => {
                return (
                    <div className="col-xs-4" id="showdiv" key={restaurant.id}>
                      <ul>
                        <Link key={restaurant.id} to={`/display/?${restaurant.id}`}>
                          <p id="restaurantTitle">{restaurant.name}</p>
                        </Link>
                        <p><b>Categories: </b>{
                          restaurant.categories.map(category => {
                            return category.title + " ";
                          })
                        }</p>
            
                        <p><b>Rating:</b> {restaurant.rating}</p>
                        <p><b>Review count:</b> {restaurant.review_count}</p>
                        <p><b>Status:</b> <span className="focus">{restaurant.is_closed ? 'closed' : 'open'}</span></p>
                        <p><b>Location:</b> {restaurant.location.address1 + ", " + restaurant.location.city + ", " + restaurant.location.state + ", " + restaurant.location.country + ", " + restaurant.location.zip_code}</p>
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