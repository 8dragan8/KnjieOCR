const URL = require('url').URL

let img_url = new URL('http://digitalna.nb.rs/wb/NBS/Knjige/Srpska_knjizevnost_u_100knjiga/II-153244-097?pageIndex=00005')

let urlPTH=img_url.pathname

let dirname=img_url.pathname.slice(img_url.pathname.lastIndexOf('/')+1)
let dirname2=img_url.pathname.slice(-13)

console.log(urlPTH)
console.log(dirname)
console.log(dirname2)



