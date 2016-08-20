var API = {};

API.Host = "http://gaeldupont.io:3000";
API.Routes = {
	Feeds: API.Host+"/api/feed",
	Feed: API.Host+"/api/feed/{id}"
};