import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import reducers from './Reducer';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

//////////////////////////
//
//data sample: {username:"can be empty", password:"empty", token:""}
//
///////////////////////////
export function updateUserInfo(data, authenticated) {
	if (authenticated) {
		store.dispatch({type: "AUTH_USER"});

		let userStr = JSON.stringify(data);
		localStorage.setItem("user", userStr);
	}
	else {
		store.dispatch({type: "UNAUTH_USER"});
		localStorage.clear();
	}
}

export function checkAuthenticated(data) {
	let state = store.getState();
	if (state.authenticated) {
		return true;
	}

	const user = JSON.parse(localStorage.getItem('user'));
	if (user && user.token){
		return true;
	}
}

export function getUserInfo(data) {
	const user = JSON.parse(localStorage.getItem('user'));
	if (user) {
		return user;
	}
}