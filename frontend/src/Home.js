import React, { Component } from 'react';
// import Header from './Header';

class Home extends Component {
  render() {
    return (
      <div>
        {/* <Header /> */}
        {this.props.children}
      </div>
    );
  }
}

export default Home;