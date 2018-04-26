import React, { Component } from 'react';
import './RestaurantPanel.css';
import favImg from '../img/fav.png'
import goodImg from '../img/good.png'
import badImg from '../img/bad.png'

class SearchField extends Component{
    handleClick() {
        /*
        var key_word = document.getElementById('key_word').value;
        var url = "v1/search?q=" + key_word + "&type=track";
        sendRequest(client_id, client_secret, url, function(data){
            updateItems(data);
        });
        */
        return false;
    }

    render(){
        return (
            <div>  
                <form id="search-form">
                  <search_title>key word: </search_title>
                  <input id="key_word"></input>
                  <input type="button" id="search" value="search" onClick={this.handleClick}></input>
                </form>
            </div>  
        );
    }
}


class SignInBtn extends Component {
	handleClick() {
    	var modal = document.getElementById('sign-in-modal');
    	modal.style.display = "block";

    	return false;
  	}

  	render() {  
        return (  
            <div>  
                <input id="signIn" type="button" value="sign in"  onClick={this.handleClick}></input> 
            </div>  
        );  
    }  
}

class Container extends Component{
    handleClick(){

    }

    render() {
        return (
            <div class="container">
                <header>
                  <p>
                    <span>Restaurant</span>
                    <br />Plat
                  </p>
                </header>
                <div>
                    <div class="restaurant_img_container">
                        <img id="restaurant_img" alt=""></img>
                    </div>

                    <div class="restaurant_content_container">
                        <span id="title" class="name">天下无敌餐馆</span>
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
                        <span id="intro" class="content">少女伊西亚（塞伊拉·沃西 Zaira Wasim 饰）拥有着一副天生的好嗓子，对唱歌充满了热爱的她做梦都想成为一名歌星。然而，伊西亚生活在一个不自由的家庭之中，母亲娜吉玛（梅·维贾 Meher Vij 饰）常常遭到性格爆裂独断专横的父亲法鲁克（拉杰·阿晶 Raj Arjun 饰）的拳脚相向，伊西亚知道，想让父亲支持自己的音乐梦想是完全不可能的事情。 
　　某日，母亲卖掉了金项链给伊西亚买了一台电脑，很快，伊西亚便发现，虽然无法再现实里实现梦想，但是网络中存在着更广阔的舞台。伊西亚录制了一段蒙着脸自弹自唱的视屏上传到了优兔网上，没想到收获了异常热烈的反响，著名音乐人夏克提（阿米尔·汗 Aamir Khan 饰）亦向她抛出了橄榄枝。</span>
                    
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
        <header class="top-header">
		    <nav class="top-nav">
		      <a href="/">Home</a>
		      <a href="/about">About</a>
		    </nav>
            
		    <SearchField />
            <space id="space">heiheiheiheiasdasdasdasdasdasdad</space>
		    <SignInBtn />
            <space>123123</space>
		</header>
        <Container />
      </div>
    );
  }
}

export default RestaurantPanel;