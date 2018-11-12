const fs = require('fs')
function napraviDir(dirname) {
	fs.mkdir(dirname, {
		recursive: true
	}, (err) => {
		if (err)
			throw err
	})
}
exports.napraviDir = napraviDir