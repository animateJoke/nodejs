/*const request = require("request");
request.get({
    url:"http://h5.jumei.com/product/detail?item_id=726521&type=jumei_mall"
},function optionalCallback(err, httpResponse, body){
    console.log($(body));
})*/

var https = require('https');
var zlib = require('zlib');

var post_data = "………………"; //请求数据
var reqdata = JSON.stringify(post_data);
var options = {
	hostname: '10.225.***.***',
	port: '8443',
	path: '/data/table/list',
	method: 'POST',
	rejectUnauthorized: false,
	requestCert: true,
	auth: 'admin:123456************',
	headers: {
		':authority': 'm.mi.com',
		':method': 'POST',
		':path': '/v1/product/productView2_new',
		':scheme': 'https',
		'accept': 'application/json, text/plain, */*',
		'accept-encoding': 'gzip, deflate, br',
		'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
		'content-length': 74,
		'content-type': 'application/x-www-form-urlencoded',
		'cookie': 'xmuuid=XMGUEST-51E91C60-3B0F-11E8-AD7B-4D495385B94D; Hm_lvt_4982d57ea12df95a2b24715fb6440726=1523178636; Hm_lpvt_4982d57ea12df95a2b24715fb6440726=1523179762',
		'origin': 'https://m.mi.com',
		'referer': 'https://m.mi.com/commodity/detail/10000084',
		'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 7_1_2 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) Version/7.0 Mobile/11D257 Safari/9537.53',
		'x-requested-with': 'XMLHttpRequest'
	}
};
var req = https.request(options, function(res) {});
req.write(reqdata);
req.on('response', function(response) {
	switch (response.headers['content-encoding']) {
		case 'gzip':
			var body = '';
			var gunzip = zlib.createGunzip();
			response.pipe(gunzip);
			gunzip.on('data', function(data) {
				body += data;
			});
			gunzip.on('end', function() {
				var returndatatojson = JSON.parse(body);
				req.end();
			});
			gunzip.on('error', function(e) {
				console.log('error' + e.toString());
				req.end();
			});
			break;
		case 'deflate':
			var output = fs.createWriteStream("d:temp.txt");
			response.pipe(zlib.createInflate()).pipe(output);
			req.end();
			break;
		default:
			req.end();
			break;
	}
});
req.on('error', function(e) {
	console.log(new Error('problem with request: ' + e.message));
	req.end();
	setTimeout(cb, 10);
});