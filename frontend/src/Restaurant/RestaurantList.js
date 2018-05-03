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
                        <Link key={restaurant.id} to={`/restaurant/${restaurant.id}`}>
                          {restaurant.name}
                        </Link>
                        <h5><b>Artist: </b> 
                        <Link key={restaurant.album.artists[0].id} to={`/artists/${restaurant.album.artists[0].id}`}>
                          {restaurant.album.artists[0].name}
                        </Link></h5>
            
                        <h5>popularity: {restaurant.popularity}</h5>
                        <h5><b>Album: </b>
                        <Link key={restaurant.album.id} to={`/albums/${restaurant.album.id}`}>
                         {restaurant.album.name}
                        </Link></h5>
                        <img className="img" src={restaurant.album.images[0].url} alt={restaurant.name}/>;
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