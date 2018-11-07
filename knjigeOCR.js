const request = require('request')
const path = require('path')

// const cheerio = require('cheerio')
const fs = require('fs')
const URL = require('url').URL


// let path = require('path')


// console.log('URL objekat - ')
// console.log('URL host - ' + img_url.host)
// console.log('URL pathname - ' + img_url.pathname)
// console.log('URL query - ' + img_url.query)


loopKnjige()


async function loopKnjige() {
	let i = 1
	let kraj = true
	while (kraj) {
		let img_url = new URL('http://digitalna.nb.rs/wb/NBS/Knjige/Srpska_knjizevnost_u_100knjiga/II-153244-097?pageIndex=00005')
		let query = '0000' + i.toString()
		// console.log(img_url)
		img_url.searchParams.set('pageIndex', query.slice(-5))
		// console.log('URL href - ' + img_url.href)
		await KnjigeOCR(img_url).then(function () {
			i++
		}).catch(function () {
			kraj = false
		})
	}
}

function KnjigeOCR(img_url) {
	return new Promise(function (resolve, reject) {


		request(img_url.href, (error, response) => {

			console.log(`Stranica ${img_url.searchParams} - greska ${error} - statusCode ${response.statusCode}`)

			if (!error && response.statusCode == 200) {

				let img_name = path.parse(img_url.pathname.slice(-13) + '/' + img_url.searchParams.get('pageIndex') + '.jpg')

				request(img_url.href).on('error', function (err) {
					console.log(err)
				}).pipe(fs.createWriteStream(path.format(img_name)))

				// OCRocitavanje(path.format(img_name))

				resolve()

			} else {
				reject()
			}
		})
	})
}



