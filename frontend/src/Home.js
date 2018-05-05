import React, { Component } from 'react';

class Home extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="phase1" style ={ { backgroundImage: "url('https://images.unsplash.com/photo-1496116218417-1a781b1c416c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=aba7663f8f57d37a53706edff54fd1c6&auto=format&fit=crop&w=1950&q=80')" } }/>
    );
  }
}

export default Home;