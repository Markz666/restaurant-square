import React, { Component } from 'react';
import './RestaurantPanel.css';
import favImg from '../img/fav.png';
import goodImg from '../img/good.png';
import badImg from '../img/bad.png';
import { checkAuthenticated, getUserInfo } from '../Auth/UserLoginInfo';
import { Redirect } from 'react-router-dom';
import ToggleButton from './ToggleButton';

class ContactForm extends React.Component {
    constructor(props) {
　　　　super(props);
　　　　this.state = {
　　　　     uploadedFile: '',
            comment: '',
            uploadedFileName: ''
　　　　};

        console.log("contru");
    }

    handleChange(files){
        console.log("------handle change");
        console.log(files[0]);
        
        let file = files[0];
        let ContactForm = this;
        if (window.FileReader && file) {    
            let reader = new FileReader();    
            reader.readAsDataURL(file);    
            //监听文件读取结束后事件    
            reader.onloadend = function (e) {
                ContactForm.setState({uploadedFile:e.target.result});
                ContactForm.setState({uploadedFileName:file.name});
            }
        } 
        else{
            console.log("error happened");
        }
    }

    onChangeCommentText = e => {
        this.setState({comment:e.target.value});
    }

    sendComment() {
        let file = this.state.uploadedFile;
        let comment = this.state.comment;
        let name = this.state.uploadedFileName;
        const resId = getRestaurantId();
        
        if (comment == "" && file == ""){
            alert("please input valid comment");
        }

        fetch('/api/uploadComment', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({comment:comment, imgData:file, name:name, token:getUserInfo().token, resId:resId}),
        })
        .then((response) => {
            console.log(response);
        }) 
        .catch(error => {
            console.log(error);
        })
    }

    render() {
　　　　return (
                <div> 
                    <textarea placeholder="please enter your comment" id="commentText" value={this.state.comment} onChange={this.onChangeCommentText} name="bbxi" required></textarea>
                    <table ></table>
                    <input type="file" accept="image/x-png, image/jpeg" id="files" multiple="" onChange={(e) => this.handleChange(e.target.files)}/>
                    <button align="center" onClick={this.sendComment.bind(this)} id="review" type="button">review</button>
                </div>
            )
　　    }
    }

class Container extends Component {
    handleFavorite(event) {
        event.preventDefault();
        const url = window.location.href;
        const urls = url.split("?");
        const id = urls[1];
        const userToken = getUserInfo().token;
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
                        <span id="title" className="name"></span>
                        <table >
                        </table>
                        <div className="title" id="hotTitle">hot</div>
                        <div id="hot" className="progress width-xs">
                            <span id="hot_s"></span>
                        </div>
                        <div className="title" id="levelTitle">level</div>
                        <div id="rating" className="progress width-md">
                            <span id="rating_s" ></span>
                        </div>
                        <table >
                        </table>
                        <div className="Review">
                            <div className="tbzl">
                                {/* <div className="tb">
                                    <img src={favImg} onClick={this.handleFavorite} alt="fav"/>
                                </div> */}
                                <div className="tb">
                                    <ToggleButton/>
                                </div>
                                <div className="scoringText">
                                    favorite (
                                    <span id="favorite"></span>
                                    )
                                </div>
                            </div>
                            <div className="tbzl clickAction">
                                <div className="tb">
                                    <img src={goodImg}  alt="good"/>
                                </div>
                                <div className="scoringText">
                                    good (
                                    <span id="good"></span>
                                    )
                                </div>
                            </div>
                            <div className="tbzl clickAction">
                                <div className="tb">
                                    <img src={badImg}  alt="bad"/>
                                </div>
                                <div className="scoringText">
                                    bad (
                                    <span id="bad"></span>
                                    )
                                </div>
                            </div>
                        </div>
                        <table ></table>
                        <span id="category" className="content"></span>
                        <table ></table>
                        <span id="location" className="content"></span>
                        <table ></table>
                        <span id="status" className="content"></span>
                        <table ></table>
                        <span id="comment" className="content">Recent comments:</span>
                        <table ></table>
                        <span id="comment1" className="content">Tremendous    03/07/2018</span>
                        <table ></table>
                        <span id="comment2" className="content">Awesome    02/07/2018</span>
                        <table ></table>
                        <span id="comment3" className="content">Perfect    09/07/2017</span>
                        <table ></table>
                        <ContactForm />
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
    const id = getRestaurantId();
    
    await updatePage(id);
}

function getRestaurantId()
{
    const url = window.location.href;
    const urls = url.split("?");
    const id = urls[1];

    return id;
}

function updateComponent(response) {
    const img = document.getElementById("restaurant_img");

    if (img) {
        const title = document.getElementById("title");
        const favorite = document.getElementById("favorite");
        const hot = document.getElementById("hot_s");
        const rating = document.getElementById("rating_s");
        const good = document.getElementById("good");
        
        const bad = document.getElementById("bad");
        const category = document.getElementById("category");
        const location = document.getElementById("location");
        const status = document.getElementById("status");
        console.log(response.rating / 5.0 * 100 + "%");

        hot.style.width = (response.favorite + response.good) / (response.favorite + response.good + response.bad) * 100 + '%';
        rating.style.width = response.rating / 5 * 100 + '%';
        img.src = response.src;
        title.innerHTML = response.title;
        favorite.innerHTML = response.favorite;
        good.innerHTML = response.good;
        bad.innerHTML = response.bad;
        category.innerHTML = 'Category: ' + response.category;
        location.innerHTML = 'Location: ' + response.location;

        let statusStr = 'Status: ' + (response.is_closed ? 'closed' : 'open');  
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