import React, { Component } from 'react';
import { getUserInfo } from '../Auth/UserLoginInfo';
class ToggleButton extends Component {
    constructor(props) {
      super(props);
      this.state = {isFavorited: false};
      // This binding is necessary to make `this` work in the callback
      this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount() {
        this.checkFavorite();
    }

    checkFavorite() {
        const url = window.location.href;
        const urls = url.split("?");
        const id = urls[1];
        const userToken = getUserInfo().token;
        fetch('/api/check_fav_status', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: userToken,
                restaurant_id: id
            })
        }).then((response) => {
            const statusCode = String(response.status);
            if (statusCode === "201") {
                this.setState({isFavorited: true});
            } else {
                this.setState({isFavorited: false});
            }
            
        }).catch(error => {
            console.log(error);
        })
    }

    handleFavorite() {
        const url = window.location.href;
        const urls = url.split("?");
        const id = urls[1];
        const userToken = getUserInfo().token;
        console.log(this.state.isFavorited);
        if (this.state.isFavorited === false) {
            fetch('/api/add_to_fav', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: userToken,
                    restaurant_id: id
                })
            })
            .then((response) => {
                console.log(response);
            }) 
            .catch(error => {
                console.log(error);
            })
        } else {
            fetch('/api/remove_fav', {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: userToken,
                    restaurant_id: id
                })
            })
            .then((response) => {
                console.log(response);
            }) 
            .catch(error => {
                console.log(error);
            })
        }
        
    }

    handleClick() {
        this.handleFavorite();
        this.setState(prevState => ({
            isFavorited: !prevState.isFavorited
      	}));
    }
  
    render() {
      return (
        <button onClick={this.handleClick}>
          {this.state.isFavorited ? 'Unfavorite' : 'Favorite'}
        </button>
      );
    }
  }
  
export default ToggleButton;