import React, { Component } from 'react';
import './RestaurantPanel.css';
import goodImg from '../img/good.png';
import badImg from '../img/bad.png';
import goodDisableImg from '../img/good_disable.png';
import badDisableImg from '../img/bad_disable.png';
import { checkAuthenticated, getUserInfo } from '../Auth/UserLoginInfo';
import { Redirect } from 'react-router-dom';
import FavButton from './FavButton';
import CommentList from "./CommentList";
import Notifications, {notify} from 'react-notify-toast';

class ContactForm extends Component {
    constructor(props) {
　　　　super(props);
　　　　this.state = {
　　　　     uploadedFile: '',
            comment: '',
            uploadedFileName: '',
            isGood: false,
            isBad: false,
　　　　};
    }

    handleChange(files) {      
        let file = files[0];
        let ContactForm = this;
        //console.log(file);
        if (window.FileReader && file) {    
            let reader = new FileReader();    
            reader.readAsDataURL(file);    
            // listen to the event after the read process    
            reader.onloadend = (e) => {
                ContactForm.setState({uploadedFile: e.target.result});
                ContactForm.setState({uploadedFileName: file.name});
            }
        } 
        else {
            console.log("error happened");
        }
    }

    onChangeCommentText = e => {
        this.setState({comment: e.target.value});
    }

    clearComment() {
        const chooseFile = this.refs.choosefile;
        const commentText = this.refs.commentText;

        chooseFile.value = "";
        commentText.value = "";
        this.setState({
　　　　     uploadedFile: '',
            comment: '',
            uploadedFileName: ''
　　　　});
    }

    sendComment() {
        let file = this.state.uploadedFile;
        let comment = this.state.comment;
        let name = this.state.uploadedFileName;
        const resId = getRestaurantId();
        
        if (comment === "" && file === ""){
            notify.show('Please upload a file or enter your comment!', "error", 1800);
            return;
        }

        fetch('/api/uploadComment', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({comment: comment, imgData: file, name: name, token: getUserInfo().token, resId: resId}),
        })
        .then((response) => {
            const func = response.json();

            let ContactForm = this;
            func.then(function(result) {
            	let comments = JSON.parse(result.comments);
                ContactForm.state.parent.setState({comments: object2Array(comments)});
            })
            this.clearComment();
        }) 
        .catch(error => {
            notify.show('Add comment failed, please try again!', "error", 1800);
            this.clearComment();
        })
    }

    render() {
　　　　return (
                <div>
                    <Notifications /> 
                    <div className="form-group">
                    <label htmlFor="commentText" id="commentLabel">Comment here</label>
                    <table></table>
                    <textarea placeholder="please enter your comment" id="commentText" ref='commentText' value={this.state.comment} onChange={this.onChangeCommentText} name="bbxi" required></textarea>
                    </div>
                    <table></table>
                    <div id="commentCmd">
                        <label htmlFor="choosefile" id="chooseFileLabel">Choose pic</label>
                        <input id="choosefile" ref='choosefile' type="file" accept="image/x-png, image/jpeg" multiple="" onChange={(e) => this.handleChange(e.target.files)}/>
                        <button onClick={this.sendComment.bind(this)} id="commentBtn" type="button">Comment</button>
                    </div>
                </div>
            )
　　    }
    }

class Container extends Component {
    onHitGoodBtn() {
        let url = "";
        if (this.state.isGood){
            url = "/api/remove_good";
        } else {
            url = "/api/add_to_good";
        }

        fetch(url, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({token: getUserInfo().token, resId: getRestaurantId()}),
        })
        .then((response) => {
            const func = response.json();
            let Container = this;
            func.then((result) => {
                //let obj = JSON.parse(result);
                Container.updateGood(result.good);

                if (Container.state.isGood) {
                    notify.show('Add good review success!', "success", 1200);
                } else {
                    notify.show('Remove good review success!', "success", 1200);
                }
            })
        }) 
        .catch(error => {
            notify.show('Add to good failed, please try again!', "error", 1800);
        })
    }

    onHitBadBtn() {
        let url = "";
        if (this.state.isBad === true){
            url = "/api/remove_bad";
        } else {
            url = "/api/add_to_bad";
        }

        fetch(url, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({token: getUserInfo().token, resId: getRestaurantId()}),
        })
        .then((response) => {
            const func = response.json();

            let Container = this;
            func.then((result) => {
                //console.log(result);
                Container.updateBad(result.bad);

                if (Container.state.isBad) {
                    notify.show('Add bad review success!', "success", 1200);
                } else {
                    notify.show('Remove bad review success!', "success", 1200);
                }
            })
        }) 
        .catch(error => {
            notify.show('Add to bad failed, please try again!', "error", 1800);
        })
    }

    async updatePage(imgID) {
        const response = await fetch('/api/getRestaurantInfo?id=' + imgID);
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        this.updateComponent(body);
    }

    updateComponent(response) {
        const img = document.getElementById("restaurant_img");
        console.log(response);
        if (img) {
            const title = document.getElementById("title");
            const hot = document.getElementById("hot_s");
            const rating = document.getElementById("rating_s");
            const category = document.getElementById("category");
            const location = document.getElementById("location");
            const status = document.getElementById("status");
            
            rating.style.width = response.rating / 5 * 100 + '%';
            img.src = response.src;
            title.innerHTML = response.title;
            let goodNum = this.updateGood(response.good);
            let badNum = this.updateBad(response.bad);
            hot.style.width = (goodNum) / (goodNum + badNum) * 100 + '%';

            category.innerHTML = '<b>Category: </b>' + response.category;
            location.innerHTML = '<b>Location: </b>' + response.location;

            let statusStr = '<b>Status: </b>' + (response.is_closed ? 'closed' : 'open');  
            status.innerHTML = statusStr;

            let comments = JSON.parse(response.comments);
            this.setState({comments: object2Array(comments)});
            this.refs.contactForm.setState({parent:this});
        }
    }

    updateGood(good){
        const goodObj = JSON.parse(good);
        const username = getUserInfo().username;
        const goodComponent = document.getElementById("good");
        const goodImgComponent = document.getElementById("goodImg");
        goodComponent.innerHTML = this.getObjLength(goodObj);

        if (goodObj.hasOwnProperty(username)) {
            this.setState({isGood: true});
            goodImgComponent.src = goodImg;
        }
        else {
            this.setState({isGood: false});
            goodImgComponent.src = goodDisableImg;
        }

        return this.getObjLength(goodObj);
    }

    updateBad(bad) {
        const badObj = JSON.parse(bad);
        const username = getUserInfo().username;
        const badComponent = document.getElementById("bad");
        const badImgComponent = document.getElementById("badImg");
        badComponent.innerHTML = this.getObjLength(badObj);
        if (badObj.hasOwnProperty(username)) {
            this.setState({isBad: true});
            badImgComponent.src = badImg;
        }
        else {
            this.setState({isBad: false});
            badImgComponent.src = badDisableImg;
        }
        return this.getObjLength(badObj);
    }

    getObjLength(obj) {
        let arr = Object.keys(obj);
        let count = arr.length;
        return count;
    }

    async init(){
        const id = getRestaurantId();
        await this.updatePage(id);
    }

    componentWillMount() {
        this.init();
    }

    render() {
        if (!checkAuthenticated()) {
            return <Redirect to="/"/>;
        }

        let commentsCom;
        if (this.state && this.state.comments) {
            //console.log("show comment list:" + this.state.comments);
            commentsCom = (
                <CommentList comments = {this.state.comments}/>
            )
        } else {
            commentsCom = (
                <div></div> 
            )
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
                                <div className="tb">
                                    <FavButton/>
                                </div>
                            </div>
                            <div className="tbzl clickAction" onClick={this.onHitGoodBtn.bind(this)}>
                                <div className="tb">
                                    <img id="goodImg" src={goodImg}  alt="good"/>
                                </div>
                                <div className="scoringText">
                                    good (
                                    <span id="good"></span>
                                    )
                                </div>
                            </div>
                            <div className="tbzl clickAction" onClick={this.onHitBadBtn.bind(this)}>
                                <div className="tb">
                                    <img id="badImg" src={badImg}  alt="bad"/>
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
                        
                        <ContactForm ref="contactForm" />
                    </div>
                    <span id="comment" className="content"><b>Recent comments:</b></span>
                    <table ></table>
                    { commentsCom }
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

function object2Array(obj){
    let arr = Object.keys(obj).map(key=> obj[key]);
    return arr;
}

function getRestaurantId() {
    const url = window.location.href;
    const urls = url.split("?");
    const id = urls[1];
    return id;
}

export default RestaurantPanel;