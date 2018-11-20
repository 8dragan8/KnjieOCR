const fs = require('fs')
const path = require('path')

// function napraviDir(dirname) {
// 	fs.mkdir(dirname, {recursive: true}, err => {
// 		if (err)
// 			throw err
// 	}).catch((error) => {
// 		console.log(error,'Promise error');
// 	  });
// }

function napraviDir(dirname) {
	let dirs = dirname.split(path.sep)
	// console.log(dirs)
    for (let i = 1; i <= dirs.length; i++) {
		let segment = dirs.slice(0, i).join(path.sep)
		// console.log(segment)
        segment.length > 0 && !fs.existsSync(segment) ?  
		fs.mkdir(segment, {recursive: true}, err => {
			if (err)
			throw err
		})  : null
	}
}
// napraviDir('d:\\Knjige\\Vasko Popa\\Pesme\\in\\')
exports.napraviDir = napraviDir