import React, { Component } from "react";
import { Link } from "react-router-dom";

class RestaurantList extends Component {
    render() {
        return (
          <div className="container">
            <div className="row">
              {this.props.trackList.map(track => {
                return (
                    <div className="col-xs-4" key={track.id}>
                      <ul>
                        <Link key={track.id} to={`/track/${track.id}`}>
                          {track.name}
                        </Link>
                        <h5><b>Artist: </b> 
                        <Link key={track.album.artists[0].id} to={`/artists/${track.album.artists[0].id}`}>
                          {track.album.artists[0].name}
                        </Link></h5>
            
                        <h5>popularity: {track.popularity}</h5>
                        <h5><b>Album: </b>
                        <Link key={track.album.id} to={`/albums/${track.album.id}`}>
                         {track.album.name}
                        </Link></h5>
                        <img className="img" src={track.album.images[0].url} alt={track.name}/>;
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