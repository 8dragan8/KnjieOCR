const {
	DirList
} = require('./DirList')
// const fs = require('fs')
const path = require('path')
const jimp = require('jimp')


let dir = './II-153244-097/in/'
let outhpath = 'II-153244-097/test/'


let fileList = DirList(dir)
// console.log(fileList)

// let test = 9

for (let i = 0; i < fileList.length; i++) {

	let imgPTH = path.format(fileList[i])
	let exten = path.extname(imgPTH)
	let imgname = path.basename(imgPTH, exten)
	console.log(imgPTH)

	jimp.read(imgPTH).then(image => {

		let w = image.bitmap.width
		let h = image.bitmap.height
		let mid = w / 2

		
		console.log(`${i}: ${imgPTH} | w - ${w} | h - ${h} | mid - ${mid}`)

		let imgL = image.clone()
		let imgD = image.clone()
		
		imgL.crop(0, 0, mid, h).quality(80).write(outhpath + imgname + 'a' +exten)
		imgD.crop(mid, 0, mid, h).quality(80).write(outhpath + imgname + 'b' +exten)
		
	}).catch(err => {
		console.error(err)
	})
}