let updatedFunc = null;
let failedFunc = null;

export async function fetchRestaurantList(updated, failed) {
	updatedFunc = updated;
	failedFunc = failed;

	initGeoLocation();
}

async function initGeoLocation(updated, failed) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onPositionUpdated,
            onLoadPositionFailed, {
                maximumAge: 60000
            });
        
    } else {
        onLoadPositionFailed();
    }
}

async function onPositionUpdated(position) {
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;

    console.log("lat:"+lat);
    console.log("lng:"+lng);
    const response = await fetch('api/getRestaurantsList?lat=' + lat + "&lng=" + lng);
    console.log(response);
    const body = await response.json();

    if (response.status !== 200) throw failedFunc(body.message);
    updatedFunc(body);
}

async function onLoadPositionFailed() {
    console.warn('navigator.geolocation is not available');
    //getLocationFromIP();

    failedFunc('navigator.geolocation is not available');
}