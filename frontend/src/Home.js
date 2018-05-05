import React, { Component } from 'react';
import BackgroundImage from './img/dumplings.jpg';

const sectionStyle = {
  width: "100%",
  height: "100%",
  position: 'fixed',
  backgroundImage: `url(${BackgroundImage})` 
};
class Home extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div style={sectionStyle}><h1>Welcome to the restaurant square!</h1></div>
    );
  }
}

export default Home;