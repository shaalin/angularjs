//Request will always send all the cookies it has corresponding to a path.
//Response will send a cookie if it is changed or added.
//Signed cookie can be created by passing an option {secret:true}, the benefit of signing a cookie is no one can change the value,
///if it is change the server can detect teh change.
//By passing option expires:0 the cookie is a session cookie, i.e. it expires when session closses.

var utils = require('util');
module.exports.init = function(app) {
	app.get("/cookieUnsigned", getCookieForm);
	app.post("/cookieUnsigned", addCookie);
	app.get("/cookiesUnsigned", listCookies);
	app.get("/cookieSigned", getCookieForm);
	app.post("/cookieSigned", addCookie);
	app.get("/cookiesSigned", listCookies);
};


function getCookieForm(req, res, next) {
	var typeOfCookie = 'Signed';
	if (req.url.indexOf('Unsigned') > 0)
		typeOfCookie = 'Unsigned';
	res.send("<html><head> <meta http-equiv='Content-Type' content='text/html; charset=UTF-8' /></head> <body><form action='./cookie" + typeOfCookie + "' method='post' name='cookieParser'>" +
		"Cookie Name:<input name='cookieName'>" +
		"Cookie Value: <input name='cookieValue'>" +
		" <input type='submit' value='Submit'>" +
		"</form> </body></html>");

}

function addCookie(req, res, next) {

	var typeOfCookie = 'Signed';
	var cookies = req.signedCookies;
	if (req.url.indexOf('Unsigned') > 0) {
		typeOfCookie = 'Unsigned';
		cookies = req.cookies;
	}
	var body = "<html><head> <meta http-equiv='Content-Type' content='text/html; charset=UTF-8' /></head> <body><a href='./cookie" + typeOfCookie + "'> Add cookies</a>";
	//Add cookie only if the method is POST
	res.cookie(req.body.cookieName, req.body.cookieValue, {
		signed: (typeOfCookie === 'Signed'), path:'/randomPath',expires:0
	});
	body += "<br>Cookie set:" + req.body.cookieName;
	body += "<br>Type of Cookie set:" + typeOfCookie;
	body += "</body>"


	res.send(body);

}

function listCookies(req, res, next) {

	var typeOfCookie = 'Signed';
	var cookies = req.signedCookies;
	if (req.url.indexOf('Unsigned') > 0) {
		typeOfCookie = 'Unsigned';
		cookies = req.cookies;
	}
	var body = "<html><head> <meta http-equiv='Content-Type' content='text/html; charset=UTF-8' /></head> <body><a href='./cookie" + typeOfCookie + "'> Add cookies</a>";


	//If request method is GET then clear out the cookie for this path

	Object.keys(cookies).forEach(function(key) {
		res.clearCookie(key);
	});
	body += '<br>' + utils.inspect(cookies);
	
	body += "</body>"

	res.send(body);

}