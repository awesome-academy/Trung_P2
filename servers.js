const fs = require('fs')
const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const userdb = JSON.parse(fs.readFileSync('db.json', 'UTF-8'))

server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())
server.use(jsonServer.defaults());

const SECRET_KEY = '123456789'

const expiresIn = '1d'

function createToken(values){
    return jwt.sign(values, SECRET_KEY, {expiresIn});
}

function verifyToken(token){
    return jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ?  decode : err);
}

function isAuthenticated({email, password}){
    return userdb.users.findIndex(user => user.email === email && user.password === password) !== -1
}

server.get("/get-avg-rate-product/:id", (req, res) =>{
    let id  = req.params.id;
    let list = userdb.comments.filter(item => item.productId == id);
    let total =  list.reduce((avg, item) => {
        return avg + (parseInt(item.rate));
    }, 0);
    let data = total / list.length;
    res.json(data);
});

server.get("/products-orders/:id/:from/:to" , (req, res) => {
    let id = req.params.id;
    let from = req.params.from.split("-");
    let to = req.params.to.split("-");
    let fromFormat = new Date(from[2], from[1], from[0]);
    let toFormat = new Date(to[2], to[1], to[0]);

    let map = new Map();
    userdb.orders.forEach(item => {
        if(item.productId == id ){
            let format = item.date.split("-");
            let date = new Date(format[2], format[1], format[0]);
            if(date > fromFormat && date < toFormat) {
                map.has(format[1]) ? map.set(format[1], item.quantity + map.get(format[1])) : map.set(format[1], item.quantity);
            }
        }
    });
    let data =  JSON.stringify([...map.entries()]);
    res.json(data);
});

server.post('/login', (req, res) => {
    const {email, password} = req.body;
    if (isAuthenticated({email, password}) === false) {
      const status = 401
      const message = 'Incorrect email or password'
      res.status(status).json({status, message})
      return
    }
    const access_token = createToken({email, password})
    console.log("Access Token:" + access_token);
    res.status(200).json({access_token})
})

// server.use("*", (req, res, next) => {
// 	if (req.headers.authorization === undefined) {
// 		const status = 401
// 		const message = 'Error in authorization format'
// 		res.status(status).json({status, message})
// 		return
// 	} 
// 	try {
// 		let verifyTokenReq;
// 		verifyTokenReq = verifyToken(req.headers.authorization);
// 		console.log(verifyTokenReq);
// 		if(verifyTokenReq  instanceof Error){
// 			const status = 401
// 			const message = 'Access token not provided'
// 			res.status(status).json({status, message})
// 			return
// 		}
// 		next();
// 	} catch (error) {
// 		const status = 401
// 		const message = 'Error access_token is revoked'
// 		res.status(status).json({status, message})
// 		return
// 	}
// })

   
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})