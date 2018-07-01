import React, { Component } from 'react';
class About extends Component {
    constructor(props){
        super(props);
        document.title = "About Us";
    }
    render() {
        return (
            <div>
                <div>
                <h1>We are <b>Tech Ninjas</b></h1>
                <p className="text-gray text-center mb-6">We’re working hard to build a supportive, welcoming place for foodies.<br /></p>
                </div>
            </div>                   
        )
    }
}
export default About;