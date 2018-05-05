import React, { Component } from 'react';
import './RestaurantPanel.css';
import favImg from '../img/fav.png';
import goodImg from '../img/good.png';
import badImg from '../img/bad.png';
import {updateUserInfo, checkAuthenticated} from '../Auth/UserLoginInfo';
import { Redirect } from "react-router-dom";
 
class Container extends Component{
    handleClick(){

    }

    render() {
        if (!checkAuthenticated()) {
            return <Redirect to="/"/>;
        }

        return (
            <div className="container">
                <div>
                    <div className="restaurant_img_container">
                        <img id="restaurant_img" alt=""></img>
                    </div>

                    <div className="restaurant_content_container">
                        <span id="title" className="name">Popeyes</span>
                        <table >
                        </table>
                        <div className="title">hot</div>
                        <div id="hot" className="progress width-xs">
                            <span id="hot_s"></span>
                        </div>
                        <div>     </div>
                        <div className="title">level</div>
                        <div id="rating" className="progress width-md">
                            <span id="rating_s" ></span>
                        </div>
                        <table >
                        </table>
                        <div className="Review">
                            <div className="tbzl clickAction">
                                <div className="tb">
                                    <img src={favImg}  alt=""/>
                                </div>
                                <div className="zlsl">
                                    favorite (
                                    <span id="favorite">806</span>
                                    )
                                </div>
                            </div>
                            <div className="tbzl clickAction">
                                <div className="tb">
                                    <img src={goodImg}  alt=""/>
                                </div>
                                <div className="zlsl">
                                    good (
                                    <span id="good">806</span>
                                    )
                                </div>
                            </div>
                            <div className="tbzl clickAction">
                                <div className="tb">
                                    <img src={badImg}  alt=""/>
                                </div>
                                <div className="zlsl">
                                    bad (
                                    <span id="bad">806</span>
                                    )
                                </div>
                            </div>
                        </div>
                        <table ></table>
                        <span id="category" className="content">category:spanish</span>
                        <table ></table>
                        <span id="location" className="content">location:wahahaha street 3th</span>
                        <table ></table>
                        <span id="status" className="content">status:open</span>
                        <table ></table>
                        <span id="comment" className="content">recent comment:</span>
                        <table ></table>
                        <span id="comment1" className="content">haohaohaohaohao    09/07/2016</span>
                        <table ></table>
                        <span id="comment2" className="content">asdasdasdqwdw    09/07/2016</span>
                        <table ></table>
                        <span id="comment3" className="content">AAAAAAAAAAAAAAAA    09/07/2016</span>
                        <table ></table>
                        <textarea defaultValue="please enter your comment" id="bbxi" name="bbxi" col="100" rows="8"></textarea>
                        <table ></table>
                        <button align="center" id="review" type="button">review</button>
                    </div>
                </div>
            </div>
        );
    }
}



class RestaurantPanel extends Component {
    componentWillMount() {
        init();
    }

  render() {
    return (
      <div className="RestaurantPanel">
        <Container />
      </div>
    );
  }
}

async function init() {
	const url = window.location.href;
	const urls = url.split("?");
	const id = urls[1];
	
    await updatePage(id);
}

function updateComponent(response) {
    const img = document.getElementById("restaurant_img");

    if (img) {
        const title = document.getElementById("title");
        const hot = document.getElementById("hot");
        const rating = document.getElementById("rating");
        const favorite = document.getElementById("favorite");
        const good = document.getElementById("good");
        const bad = document.getElementById("bad");
        const category = document.getElementById("category");
        const location = document.getElementById("location");
        const status = document.getElementById("status");

        img.src = response.src;
        title.innerHTML = response.title;
        favorite.innerHTML = response.favorite;
        good.innerHTML = response.good;
        bad.innerHTML = response.bad;
        category.innerHTML = 'category: ' + response.category;
        location.innerHTML = 'location: ' + response.location;

        let statusStr = 'status: ' + (response.is_closed? 'closed' : 'open');
        status.innerHTML = statusStr;
    }
}

async function updatePage(imgID) {
    const response = await fetch('/api/getRestaurantInfo?id=' + imgID);
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    updateComponent(body);
}



export default RestaurantPanel;
