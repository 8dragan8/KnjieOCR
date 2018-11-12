const DirList = require('./DirList')
const napraviDir = require('./napraviDir')

const path = require('path')
const jimp = require('jimp')
const {
	listKnjige,
	ROOTDIR
} = require('./konstante')


let knjiga = listKnjige[0]
let dir = ROOTDIR + knjiga.autor + '/' + knjiga.naslov + '/' + 'in/'
let outhpath = ROOTDIR + knjiga.autor + '/' + knjiga.naslov + '/split/'

napraviDir(outhpath)


let fileList = DirList(dir)
// console.log(fileList)

// let test = 9

IMGcrop()

function IMGcrop() {
	for (let i = 0; i < fileList.length; i++) {
		let imgPTH = path.format(fileList[i])
		let exten = path.extname(imgPTH)
		let imgname = path.basename(imgPTH, exten)
		// console.log(imgPTH)
		jimp.read(imgPTH).then(image => {
			let w = image.bitmap.width
			let h = image.bitmap.height
			let mid = w / 2
			console.log(`${i}: ${imgPTH} | w - ${w} | h - ${h} | mid - ${mid}`)
			let progres = (DirList(outhpath).length / 2) / fileList.length * 100
			console.log(`Progres (${i}): ${progres.toFixed(2)}%`)
			let imgL = image.clone()
			let imgD = image.clone()
			imgL.crop(0, 0, mid, h).quality(100).write(outhpath + imgname + 'a' + exten)
			imgD.crop(mid, 0, mid, h).quality(100).write(outhpath + imgname + 'b' + exten)
		}).catch(err => {
			console.error(`Slika ${i} greska : ${err}`)
		})
	}
}

exports.IMGcrop = IMGcrop
exports.fileList = fileList
exports.outhpath = outhpath