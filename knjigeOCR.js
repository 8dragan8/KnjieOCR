const request = require('request')
const path = require('path')

// const cheerio = require('cheerio')
const fs = require('fs')
const URL = require('url').URL
const ROOTDIR = 'Knjige/'


class knjige {
	constructor(autor, naslov, link, vrsta) {
		this.autor = autor
		this.naslov = naslov
		this.link = new URL(link)
		this.vrsta = vrsta
	}
}
let listKnjige = []
listKnjige[0] = new knjige('Vasko Popa', 'Pesme', 'http://digitalna.nb.rs/wb/NBS/Knjige/Srpska_knjizevnost_u_100knjiga/II-153244-098?pageIndex=00001', 'poezija')
listKnjige[1] = new knjige('Antonije Isaković', 'Pripovedač', 'http://digitalna.nb.rs/wb/NBS/Knjige/Srpska_knjizevnost_u_100knjiga/II-153244-097?pageIndex=00005', 'proza')

console.log(listKnjige)



// let path = require('path')


// console.log('URL objekat - ')
// console.log('URL host - ' + img_url.host)
// console.log('URL pathname - ' + img_url.pathname)
// console.log('URL query - ' + img_url.query)


loopStrane(listKnjige[0])


async function loopStrane(knjiga) {
	let i = 1
	let kraj = true
	let img_url = knjiga.link
	let dirname = ROOTDIR + knjiga.autor + '/' + knjiga.naslov + '/'

	fs.mkdir(dirname, {
		recursive: true
	}, (err) => {
		if (err) throw err
	})

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


				let img_name = path.parse(dirname + img_url.searchParams.get('pageIndex') + '.jpg')

				request(img_url.href)
					.on('error', function (err) {
						console.log(err)
					})
					.pipe(fs.createWriteStream(path.format(img_name)))

				// OCRocitavanje(path.format(img_name))

				resolve()

			} else {
				reject()
			}
		})
	})
}