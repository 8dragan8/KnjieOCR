const {
	DirList
} = require('./DirList')
const fs = require('fs')
const tesseract = require('node-tesseract')
const path = require('path')


const OCRopcije = {
	l: 'srp+hrv',
	psm: 4,
	oem: 1,
	env: {
		maxBuffer: 4096 * 4096
	}
}

async function OCRocitavanje(fileIN) {
	return new Promise(async function (resolve, reject) {

		// console.log(fileIN)
		console.log(`OCR Ocitavanje ${fileIN.base} POCELO`)


		await tesseract.process(path.format(fileIN), OCRopcije, (error, text) => {
			if (error) {
				console.log('OCR Greska ', error)
				reject()
			} else {
				let outName = fileIN.dir + '/out/' + fileIN.name + '.txt'
				// console.log(outName)
				fs.writeFile(outName, text, err => {
					if (err) {
						console.log('Greska u pisanju text fajla', err)
						reject()
					} else {
						console.log(`OCR Ocitavanje ${fileIN.base} ZAVRSENO`)
						resolve()
					}
				})
			}
		})
	})
}

let dir = './II-153244-097/test/'

async function OCRIzDir(dir) {

	let fileList = DirList(dir)
	// console.log(fileList)	


	for (let i = 79; i < fileList.length; i++) {
		let file = fileList[i]
		if (file.ext != '') {
			await OCRocitavanje(file).then(() => new Promise(resolve => setTimeout(resolve, 2000)))
			let progres = (i+1)/(fileList.length-1)*100
			console.log(`Progres: ${progres.toFixed(2)}%`)

		}		
	}


}
OCRIzDir(dir)

exports.OCRocitavanje = OCRocitavanje

// Page segmentation modes:
//   0    Orientation and script detection (OSD) only.
//   1    Automatic page segmentation with OSD.
//   2    Automatic page segmentation, but no OSD, or OCR.
//   3    Fully automatic page segmentation, but no OSD. (Default)
//   4    Assume a single column of text of variable sizes.
//   5    Assume a single uniform block of vertically aligned text.
//   6    Assume a single uniform block of text.
//   7    Treat the image as a single text line.
//   8    Treat the image as a single word.
//   9    Treat the image as a single word in a circle.
//  10    Treat the image as a single character.
//  11    Sparse text. Find as much text as possible in no particular order.
//  12    Sparse text with OSD.
//  13    Raw line. Treat the image as a single text line, bypassing hacks that are Tesseract-specific.

// OCR Engine modes: (see https://github.com/tesseract-ocr/tesseract/wiki#linux)
//   0    Legacy engine only.
//   1    Neural nets LSTM engine only.
//   2    Legacy + LSTM engines.
//   3    Default, based on what is available.