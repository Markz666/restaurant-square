import React, { Component } from 'react';
import './RestaurantPanel.css';
import favImg from '../img/fav.png'
import goodImg from '../img/good.png'
import badImg from '../img/bad.png'
import {updateUserInfo, checkAuthenticated, getUserInfo} from '../Auth/UserLoginInfo'

class Container extends Component{
    handleClick(){

    }

    render() {
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
                        <div id="renqi" className="progress width-xs">
                            <span id="renqi_s"></span>
                        </div>
                        <div>     </div>
                        <div className="title">level</div>
                        <div id="pingfen" className="progress width-md">
                            <span id="pingfen_s" ></span>
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
                        <span id="t" className="content">introduction</span>
                        <table ></table>
                        <span id="intro" className="content">It is literally weird that you eat popeyes every single day!</span>
                    
                        <span id="comment" className="content">recent comment:</span>
                        <table ></table>
                        <span id="comment1" className="content">haohaohaohaohao    09/07/2016</span>
                        <table ></table>
                        <span id="comment2" className="content">asdasdasdqwdw    09/07/2016</span>
                        <table ></table>
                        <span id="comment3" className="content">AAAAAAAAAAAAAAAA    09/07/2016</span>
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

    }

  render() {
    return (
      <div className="RestaurantPanel">
        <Container />
      </div>
    );
  }
}

async function init()
{
	var url = window.location.href;
	var urls = url.split("?");
	var id = urls[1];
	
    await updatePage(id);
}

function updateComponent(response)
{
    var img = document.getElementById("restaurant_img");
    var title = document.getElementById("title");
    var renqi = document.getElementById("renqi");
    var pingfen = document.getElementById("pingfen");
    var favorite = document.getElementById("favorite");
    var good = document.getElementById("good");
    var bad = document.getElementById("bad");
    var category = document.getElementById("category");
    var location = document.getElementById("location");
    var intro = document.getElementById("intro");

    img.src = response.src;
    title.innerHTML = response.title;
    favorite.innerHTML = response.favorite;
    good.innerHTML = response.good;
    bad.innerHTML = response.bad;
    category.innerHTML = response.category;
    location.innerHTML = response.location;
    intro.innerHTML = response.intro;
}

async function updatePage(imgID)
{
    //event.preventDefault();
    const response = await fetch('api/getRestaurantInfo?id=' + imgID);
    const body = await response.json();
    console.log(body);
    if (response.status !== 200) throw Error(body.message);
    updateComponent(body);
}

init();

export default RestaurantPanel;
