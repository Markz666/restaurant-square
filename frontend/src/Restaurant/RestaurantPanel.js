import React, { Component } from 'react';
import './RestaurantPanel.css';
import favImg from '../img/fav.png';
import goodImg from '../img/good.png';
import badImg from '../img/bad.png';
import { checkAuthenticated } from '../Auth/UserLoginInfo';
import { Redirect } from "react-router-dom";

import Dropzone from 'react-dropzone';
import request from 'superagent';

const DropzoneStyle = {
    width: '200px',
    height: '80px',
    borderWidth: '2px',
    borderColor: 'rgb(102, 102, 102)',
    borderStyle: 'dashed',
    borderRadius: '5px',
}

const CLOUDINARY_UPLOAD_PRESET = 'MyPicIsTooGood';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dpou2ol4u/upload';

class ContactForm extends React.Component {
    constructor(props) {
　　　　super(props);
　　　　this.state = {
　　　　    uploadedFileCloudinaryUrl: ''
　　　　};
    }

    onImageDrop(files) {
　　　　this.setState({
　　　　    uploadedFile: files[0]
　　    });

　　    this.handleImageUpload(files[0]);
　　}

    handleImageUpload(file){
        let upload = request.post(CLOUDINARY_UPLOAD_URL)
            .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
　　　　　　 .field('file', file);

　　　　 upload.end((err, response) => {
　　　　　　　if (err) {
　　　　　　　    console.error(err);
　　　　　　　}

　　　　　　　if (response.body.secure_url !== '') {
　　　　　　　　　this.setState({
　　　　　　　　　　　uploadedFileCloudinaryUrl: response.body.secure_url
　　　　　　　　　});
　　　　　　　}
　　　　　}); 
    }

    render() {
　　　　return (
              <Dropzone
                 style={DropzoneStyle}
　　　　　　　    multiple={false}
　　　　　　　　  accept="image/*"
　　　　　　　　  onDrop={this.onImageDrop.bind(this)}>
　　　　　　　　  <p id="Dropzone">Drop an image or click to select a file to upload.</p>
                <div>
　　　　　　　　　　{this.state.uploadedFileCloudinaryUrl === '' ? null :
　　　　　　　　　　<div>
　　　　　　　　　　　　<p>{this.state.uploadedFile.name}</p>
　　　　　　　　　　　　<img src={this.state.uploadedFileCloudinaryUrl} />
　　　　　　　　　　</div>}
　　　　　　　　</div>
　　　　　　　　</Dropzone>
               )
　　}
}

class Container extends Component {
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
                            <div className="tbzl clickAction">
                                <div className="tb">
                                    <img src={favImg}  alt="fav"/>
                                </div>
                                <div className="zlsl">
                                    favorite (
                                    <span id="favorite">806</span>
                                    )
                                </div>
                            </div>
                            <div className="tbzl clickAction">
                                <div className="tb">
                                    <img src={goodImg}  alt="good"/>
                                </div>
                                <div className="zlsl">
                                    good (
                                    <span id="good">806</span>
                                    )
                                </div>
                            </div>
                            <div className="tbzl clickAction">
                                <div className="tb">
                                    <img src={badImg}  alt="bad"/>
                                </div>
                                <div className="zlsl">
                                    bad (
                                    <span id="bad">806</span>
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
                        <span id="comment" className="content">recent comment:</span>
                        <table ></table>
                        <span id="comment1" className="content">haohaohaohaohao    09/07/2016</span>
                        <table ></table>
                        <span id="comment2" className="content">asdasdasdqwdw    09/07/2016</span>
                        <table ></table>
                        <span id="comment3" className="content">AAAAAAAAAAAAAAAA    09/07/2016</span>
                        <table ></table>
                        <textarea defaultValue="please enter your comment" id="bbxi" name="bbxi" col="100" rows="8" required></textarea>
                        <table ></table>
                        <ContactForm />
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