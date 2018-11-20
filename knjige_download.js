const {
	listKnjige,
	ROOTDIR
} = require('./konstante')

// const cheerio = require('cheerio')
const request = require('request')
const path = require('path')
const fs = require('fs')
const URL = require('url').URL
// exports.URL = URL

const {napraviDir} = require('./napraviDir')


loopStrane(listKnjige)

async function loopStrane(knjiga) {

	let i = 1
	let kraj = true
	let img_url = knjiga.link
	let dirname = path.join(ROOTDIR, knjiga.dirName, 'in')
	console.log(dirname)
	

	napraviDir(dirname)

	while (kraj) {

		let query = ('0000' + i.toString()).slice(-5)
		// console.log(img_url)

		img_url.searchParams.set('pageIndex', query)
		// console.log('URL href - ' + img_url.href)

		await downloadStrana(img_url, dirname)
			.then(function () {
				i++
			})
			.catch(function () {
				kraj = false
			})
	}
}

function downloadStrana(img_url, dirname) {

	return new Promise(function (resolve, reject) {

		request(img_url.href, (error, response) => {

			console.log(`Stranica ${img_url.searchParams} - greska ${error} - statusCode ${response.statusCode}`)

			if (!error && response.statusCode == 200) {


				let img_name = path.parse(path.join(dirname, img_url.searchParams.get('pageIndex') + '.jpg'))

				request(img_url.href)
					.on('error', function (err) {
						console.log(err)
					})
					.pipe(fs.createWriteStream(path.format(img_name)))


				resolve()

			} else {
				reject()
			}
		})


	})
}

module.exports = {
	ROOTDIR: ROOTDIR,
	listKnjige: listKnjige
}