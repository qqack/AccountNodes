const Router = require('koa-router');
const router = new Router();
function addDayCons() {
	router.post('/api/cons/daycons', function (ctx, next) {
		let postdata = "";
		ctx.req.addListener('data', (data) => {
		 	postdata += data
		})
		ctx.req.addListener("end",function(){
		    let parseData = parseQueryStr( postdata )
		    console.log(parseData);
		})
		function parseQueryStr( queryStr ) {
			let queryData = {}
			let queryStrList = queryStr.split('&')
			console.log( queryStrList )
			for (  let [ index, queryStr ] of queryStrList.entries()  ) {
			    let itemList = queryStr.split('=')
			    queryData[ itemList[0] ] = decodeURIComponent(itemList[1])
			}
			return queryData
		}
		ctx.body = {'cons': "123"}
	});
 }
