const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const router = new Router();
router.post('/api/cons/daycons', function (ctx, next) {
	let postdata = ""
	let cons = ""
	ctx.req.addListener('data', (data) => {
	 	postdata += data
	})
	ctx.req.addListener("end",function(){
	    let parseData = parseQueryStr( postdata )
	    cons = parseData;
	})

	$.ajax({
	    type: 'post',
	    url: 'http://localhost:3003/news',
	    data: {
	      "cons":cons
	    }
	  }
	)

	function parseQueryStr( queryStr ) {
		let queryData = {}
		let queryStrList = queryStr.split('&')
		for (  let [ index, queryStr ] of queryStrList.entries()  ) {
		    let itemList = queryStr.split('=')
		    queryData[ itemList[0] ] = decodeURIComponent(itemList[1])
		}
		return queryData
	}
	ctx.body = {'cons': "123"}
})

app.use(router.routes()).use(router.allowedMethods())
// 初始化路由中间件
app.listen(3000)
