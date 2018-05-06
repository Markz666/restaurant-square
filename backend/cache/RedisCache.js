let redis = require("redis");
client = redis.createClient(6379, '127.0.0.1', {});
const bluebird = require("bluebird");

// use bluebird to enable the async functions
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

exports.getElement = async function (id)
{
	return new Promise((resolve, reject) => {
		client.hgetall(id, function(err, object) {
			if (object) {
		        resolve(object);
		    } else {
		        reject(new Error("getElement went wrong"));
		    }
		})
	});
}

exports.setElement = async function (id, param)
{
	return new Promise((resolve, reject) => {
		client.hmset(id, param, function(err) {
			if (err == null) {
		        resolve(param);
		    } else {
		    	console.log(err);
		        reject(new Error("element went wrong"));
		    }
		})
	});
}

exports.delElement = async function (id, user, param)
{
	return new Promise((resolve, reject) => {
		client.del(id, function(err, response) {
			if (response == 1) {
		        resolve(user);
		    } else {
		        reject(new Error("element went wrong"));
		    }
		})
	});
}
