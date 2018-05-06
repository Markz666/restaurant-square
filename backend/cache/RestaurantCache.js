const redisCache = require("./RedisCache");

exports.storeRestaurants = async (data) => {
	let successCount = 0;
	for (let i = 0; i < data.length; ++i) {
		let resObj = translateRestaurantData(data[i]);
		await addRestaurant(data[i].id, resObj, function(res) {
			successCount ++;
			console.log("insert restaurant " + data[i].name + " into redis cache");
			console.log(res);
			return;
		}, function(err){
			console.log("can not insert restaurant " + data[i].name + " into redis cache" + err);
		});


	}

	console.log("cache " + data.length + " restaurants but only " + successCount + " works");
}

translateRestaurantData = function(data){
	let location = data.location.address1 + ", " + data.location.city + ", " + data.location.state + ", " + data.location.country + ", " + data.location.zip_code;
	let category = "";
	for (let k = 0; k < data.categories.length; ++k) {
		category = category + data.categories[k].title + " ";
	}

	console.log("------is_closed--------");
	console.log(data.is_closed);
	console.log(typeof(data.is_closed));
	return {
		id:data.id, 
		src: data.image_url, 
		title: data.name, 
		hot: 0,  
		favorite: 0, 
		good: 0, 
		bad: 0, 
		category: category, 
		location: location, 
		is_closed: data.is_closed, 
		phone: data.display_phone,
		rating: data.rating,
		review_count: data.review_count
	};
}

addRestaurant = async (id, info, resolve, reject) => {
	await redisCache.setElement(id, info).then(resolve).catch(reject);
}

exports.getRestaurant = async (id, resolve, reject) => {
 	await redisCache.getElement(id).then(resolve).catch(reject);
}

exports.removeRestaurant = async (id, resolve, reject) => {
	getRestaurant(id, function(info) {
	   cache.delElement(id, info).then(resolve).catch(reject);
	}, function(error) {
	   reject(new Error("no found id " + id));
	});
}