import React, { Component } from "react";
import { Link } from "react-router-dom";

class RestaurantList extends Component {
    render() {
        return (
          <div className="container">
            <div className="row">
              {this.props.restaurantList.map(restaurant => {
                return (
                    <div className="col-xs-4" id="showdiv" key={restaurant.id}>
                      <ul>
                        <Link key={restaurant.id} to={`/display/?${restaurant.id}`}>
                          {restaurant.name}
                        </Link>
                        <h5><b>Categories: </b>{
                          restaurant.categories.map(category => {
                            return category.title + " ";
                          })
                        }</h5>
            
                        <h5><b>Rating:</b> {restaurant.rating}</h5>
                        <h5><b>Review count:</b> {restaurant.review_count}</h5>
                        <h5><b>Status:</b> <span className="focus">{restaurant.is_closed ? 'closed' : 'open'}</span></h5>
                        <h5><b>Location:</b> {restaurant.location.address1 + ", " + restaurant.location.city + ", " + restaurant.location.state + ", " + restaurant.location.country + ", " + restaurant.location.zip_code}</h5>
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