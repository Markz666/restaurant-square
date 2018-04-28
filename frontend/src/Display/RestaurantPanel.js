import React, { Component } from 'react';
import './RestaurantPanel.css';
import favImg from '../img/fav.png'
import goodImg from '../img/good.png'
import badImg from '../img/bad.png'

class Container extends Component{
    handleClick(){

    }

    render() {
        return (
            <div class="container">
                <div>
                    <div class="restaurant_img_container">
                        <img id="restaurant_img" alt=""></img>
                    </div>

                    <div class="restaurant_content_container">
                        <span id="title" class="name">Popeyes</span>
                        <table >
                        </table>
                        <div class="title">hot</div>
                        <div id="renqi" class="progress width-xs">
                            <span id="renqi_s"></span>
                        </div>
                        <div>     </div>
                        <div class="title">level</div>
                        <div id="pingfen" class="progress width-md">
                            <span id="pingfen_s" ></span>
                        </div>
                        <table >
                        </table>
                        <div class="Review">
                            <div class="tbzl clickAction">
                                <div class="tb">
                                    <img src={favImg}  alt=""/>
                                </div>
                                <div class="zlsl">
                                    favorite (
                                    <span id="favorite">806</span>
                                    )
                                </div>
                            </div>
                            <div class="tbzl clickAction">
                                <div class="tb">
                                    <img src={goodImg}  alt=""/>
                                </div>
                                <div class="zlsl">
                                    good (
                                    <span id="favorite">806</span>
                                    )
                                </div>
                            </div>
                            <div class="tbzl clickAction">
                                <div class="tb">
                                    <img src={badImg}  alt=""/>
                                </div>
                                <div class="zlsl">
                                    bad (
                                    <span id="favorite">806</span>
                                    )
                                </div>
                            </div>
                        </div>
                        <table ></table>
                        <span id="category" class="content">category:spanish</span>
                        <table ></table>
                        <span id="location" class="content">location:wahahaha street 3th</span>
                        <table ></table>
                        <span id="t" class="content">introduction</span>
                        <table ></table>
                        <span id="intro" class="content">It is literally weird that you eat popeyes every single day!</span>
                    
                        <span id="comment" class="content">recent comment:</span>
                        <table ></table>
                        <span id="comment1" class="content">haohaohaohaohao    09/07/2016</span>
                        <table ></table>
                        <span id="comment2" class="content">asdasdasdqwdw    09/07/2016</span>
                        <table ></table>
                        <span id="comment3" class="content">AAAAAAAAAAAAAAAA    09/07/2016</span>
                        <textarea id="bbxi" name="bbxi" col="100" rows="8" >asdasdasdasdasd</textarea>
                        <table ></table>
                        <button align="center" id="review" type="button">review</button>
                    </div>
                </div>
            </div>
        );
    }
}



class RestaurantPanel extends Component {
  render() {
    return (
      <div className="RestaurantPanel">
        <Container />
      </div>
    );
  }
}

export default RestaurantPanel;
