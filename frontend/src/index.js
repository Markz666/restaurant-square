import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const title = "Restaurant Square";

ReactDOM.render(<App title = {title} author = "Tech Ninjas" now = {new Date()}/>, document.getElementById('root'));

registerServiceWorker();