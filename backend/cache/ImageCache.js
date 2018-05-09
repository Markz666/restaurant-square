const redisCache = require("./RedisCache");

exports.getStoredImageCounts = async () => {
	redisCache.getElement("image_count").then(function(result){
		exports.image_count = result;
        console.log("imageCacheCount = " + exports.image_count);
    }).catch(function(err){
        console.log("init image cache failed");
    });
}

exports.storeImage = async (id, image, resolve, reject) => {
	redisCache.setElement(id, image).then(function(result){
        exports.image_count = exports.image_count + 1;
        console.log("exports.image_count = " + exports.image_count);
        resolve(result);
    }).catch(function(err){
        console.log("init image cache failed");
        reject(err);
    });
}

exports.getStoredImage = async (id, resolve, reject) => {
	redisCache.getElement(id).then(function(result){
		resolve(result);
    }).catch(function(err){
    	reject(err);
        //console.log("get image cache failed");
    });
}

