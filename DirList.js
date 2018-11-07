const fs = require('fs')
const path = require('path')

function DirList(dir) {

	let files = fs.readdirSync(dir)

	if (!files) {
		console.log('Dirlist greska')
	} else {
		console.log(`Pronadjeno ${files.length} fajlova`)
		let list = []
		files.forEach(file => {
			list.push(path.parse(dir + file))
		})
		// console.log('dirlist' + list)

		return list
	}

}
exports.DirList = DirList