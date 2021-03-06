const redisCache = require("./RedisCache");

exports.storeRestaurants = async (data) => {
	let successCount = 0;
	for (let i = 0; i < data.length; ++i) {
		let resObj = translateRestaurantData(data[i]);

		exports.getRestaurant(data[i].id,  (result) => {
			result.is_closed = resObj.is_closed;
			result.category = resObj.category;
			result.location = resObj.location;
			result.rating = resObj.rating;
			result.title = resObj.title;
			result.src = resObj.src;
			result.phone = resObj.phone;

			exports.addRestaurant(data[i].id, result, (res) => {
				successCount ++;
				//console.log("insert restaurant " + data[i].name + " into redis cache");
			}, (err) => {
				console.log("can not insert restaurant " + data[i].name + " into redis cache" + err);
			});
		}, (err) => {
			exports.addRestaurant(data[i].id, resObj, (res) => {
				successCount ++;
				//console.log("insert restaurant " + data[i].name + " into redis cache");
			}, (err) => {
				console.log("can not insert restaurant " + data[i].name + " into redis cache" + err);
			});
		})
	}
	console.log("cache " + data.length + " restaurants but only " + successCount + " works");
}

translateRestaurantData = (data) => {
	let location = data.location.address1 + ", " + data.location.city + ", " + data.location.state + ", " + data.location.country + ", " + data.location.zip_code;
	let category = "";
	for (let k = 0; k < data.categories.length; ++k) {
		category = category + data.categories[k].title + " ";
	}

	return {
		id: data.id, 
		src: data.image_url, 
		title: data.name, 
		hot: 0,  
		favorite: 0, 
		good: JSON.stringify({}), 
		bad: JSON.stringify({}), 
		category: category, 
		location: location, 
		is_closed: data.is_closed, 
		phone: data.display_phone,
		rating: data.rating,
		review_count: data.review_count,
		comments: JSON.stringify({})
	};
}

exports.addRestaurant = async (id, info, resolve, reject) => {
	await redisCache.setElement(id, info).then(resolve).catch(reject);
}

exports.getRestaurant = async (id, resolve, reject) => {
 	return await redisCache.getElement(id).then(resolve).catch(reject);
}

exports.removeRestaurant = async (id, resolve, reject) => {
	getRestaurant(id, (info) => {
	   cache.delElement(id, info).then(resolve).catch(reject);
	}, (error) => {
	   reject(new Error("no found id " + id));
	});
}

exports.addGood = async(restaurant_id, username, resolve, reject) => {
	exports.getRestaurant(restaurant_id, function(result){
		let newGoodList = {};
		if (result.good && result.good != "0"){
			newGoodList = JSON.parse(result.good);
		}

		newGoodList[username] = 1;
		result.good = JSON.stringify(newGoodList);
		console.log(result);
		exports.addRestaurant(restaurant_id, result, resolve, reject);
	}, (err) => {
		console.log(err);
		reject(err);
	});
}

exports.removeGood = async(restaurant_id, username, resolve, reject) => {
	exports.getRestaurant(restaurant_id, function(result){
		let newGoodList = {};
		if (result.good && result.good != "0"){
			newGoodList = JSON.parse(result.good);
		}

		delete newGoodList[username];
		result.good = JSON.stringify(newGoodList);
		console.log(result);
		exports.addRestaurant(restaurant_id, result, resolve, reject);
	}, (err) => {
		console.log(err);
		reject(err);
	});
}

exports.removeBad = async(restaurant_id, username, resolve, reject) => {
	exports.getRestaurant(restaurant_id, function(result){
		let newBadList = {};
		if (result.bad && result.bad != "0"){
			newBadList = JSON.parse(result.bad);
		}

		delete newBadList[username];
		result.bad = JSON.stringify(newBadList);
		console.log(result);
		exports.addRestaurant(restaurant_id, result, resolve, reject);
	}, (err) => {
		console.log(err);
		reject(err);
	});
}

exports.addBad = async(restaurant_id, username, resolve, reject) => {
	exports.getRestaurant(restaurant_id, function(result){
		let newBadList = {};
		if (result.bad && result.bad != "0"){
			newBadList = JSON.parse(result.bad);
		}

		newBadList[username] = 1;
		result.bad = JSON.stringify(newBadList);
		console.log(result);
		exports.addRestaurant(restaurant_id, result, resolve, reject);
	}, (err) => {
		console.log(err);
		reject(err);
	});
}


exports.addComment = async(restaurant_id, username, comment, img, resolve, reject) => {
	exports.getRestaurant(restaurant_id, function(result){
		let commentObj = {};
		if (result.comments)
			commentObj = JSON.parse(result.comments);

		commentObj[getObjLength(commentObj)] = {
			username: username,
			comment: comment,
			img: img,
			date: CurentTime(),
		};

		result.comments = JSON.stringify(commentObj);
		exports.addRestaurant(restaurant_id, result, resolve, reject);
	}, (err) => {
		console.log(err);
		reject(err);
	})
}

function getObjLength(obj) {
    let arr = Object.keys(obj);
    let count = arr.length;
    return count;
}

function CurentTime() { 
    let now = new Date();
    let year = now.getFullYear();       //get year
    let month = now.getMonth() + 1;     //get month
    let day = now.getDate();            //get day
    let hh = now.getHours();            //get hour
    let mm = now.getMinutes();          //get minute
    let clock = year + "-";
   
    if (month < 10) {
		clock += "0";
	}
	clock += month + "-";
	
    if (day < 10) {
		clock += "0";
	}
	clock += day + " ";
	
    if (hh < 10) {
		clock += "0";
	}
	clock += hh + ":";
	
    if (mm < 10) {
		clock += '0'
	}; 
    clock += mm; 
    return (clock); 
} 