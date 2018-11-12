const URL = require('url').URL



const ROOTDIR = '/home/dre/Documents/Knjige/'


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
// console.log(listKnjige)

exports.ROOTDIR = ROOTDIR
exports.listKnjige = listKnjige