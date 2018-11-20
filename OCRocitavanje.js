const {
	DirList
} = require('./DirList')
const fs = require('fs')
// const tesseract = require('node-tesseract')
const path = require('path')
const { spawn } = require('child_process')
const { napraviDir } = require('./napraviDir')



const {
	listKnjige,
	ROOTDIR
} = require('./konstante')


const OCRopcije = {
	l: 'srp+hrv+eng+script/Cyrillic+script/Latin+srp_latn',
	psm: 4,
	oem: 1,
	binary: 'd:\\Programiranje\\Tesseract-OCR\\tesseract.exe',
	dpi: 96,
	env: {
		maxBuffer: 4096 * 4096
	}
}





let dir = path.join(ROOTDIR, listKnjige.dirName, 'split')

async function OCRIzDir(dir) {

	let fileList = DirList(dir)
	// console.log(fileList)	


	for (let i = 0; i < fileList.length; i++) {
		let file = fileList[i]
		if (file.ext != '') {
			await OCRocitavanje(file)
			// .then(() => new Promise(resolve => setTimeout(resolve, 2000)))
			let progres = (i + 1) / (fileList.length) * 100
			console.log(`Progres (${i}): ${progres.toFixed(2)}%`)

		}
	}


}

OCRIzDir(dir)

async function OCRocitavanje(fileIN) {
	return new Promise(async function (resolve, reject) {

		// console.log(fileIN)
		console.log(`OCR Ocitavanje ${fileIN.base} POCELO`)
		let outDIR = path.join(ROOTDIR, listKnjige.dirName, 'out')

		napraviDir(outDIR)

		let outName = path.join(outDIR, fileIN.name)


		let fileinPTH = path.format(fileIN)
		// console.log(fileinPTH)
		let opt = [fileinPTH, outName, '-l', OCRopcije.l, '--psm', OCRopcije.psm, '--oem', OCRopcije.oem, '--dpi', OCRopcije.dpi]
		// console.log(opt)

		const tesseract = spawn(OCRopcije.binary, opt)

		tesseract.on('error', (err) => {
			console.log('Failed to start subprocess.')
			reject()
		})
		tesseract.stdout.on('data', (data) => {
			console.log(`stdout: ${data}`)
		})

		tesseract.stderr.on('data', (data) => {

			let str = `${data}`
			if (str.slice(0,15) == 'Tesseract Open ') {

				// console.log('Sve OK')
			}
			else {

				console.log(`stderr: ${data}`)
				reject()
			}
		})

		tesseract.on('close', (code) => {
			console.log(`OCR Ocitavanje ${fileIN.base} ZAVRSENO - code ${code}`)
			resolve()
		})

	})
}

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