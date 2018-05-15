const redisCache = require("./RedisCache");

exports.getStoredImageCounts = async () => {
	redisCache.getElement("image_count").then((result) => {
		exports.image_count = result;
        console.log("imageCacheCount = " + exports.image_count);
    }).catch((err) => {
        console.log("init image cache failed");
    });
}

exports.storeImage = async (id, image, resolve, reject) => {
	redisCache.setElement(id, image).then((result) => {
        exports.image_count = exports.image_count + 1;
        console.log("exports.image_count = " + exports.image_count);
        resolve(result);
    }).catch((err) => {
        console.log("init image cache failed");
        reject(err);
    });
}

exports.getStoredImage = async (id, resolve, reject) => {
	redisCache.getElement(id).then((result) => {
		resolve(result);
    }).catch((err) => {
    	reject(err);
        //console.log("get image cache failed");
    });
}
