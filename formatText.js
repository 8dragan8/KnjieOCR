const fs = require('fs')
const path = require('path')
const {
	listKnjige,
	ROOTDIR
} = require('./konstante')
// const DirList = require('./DirList')
const { napraviDir } = require('./napraviDir')


// console.log(textIN)

let regex = [
	// 0: reset paginacije - trazi grupe od po 3 karaktera ili broja koje sledi unikode u000c
	// [/\n+\d{1,3}/g, '']
	[/(\s*\n)(\d{1,3}|\w{1,3})(\s*\n\f)/g, '$3']

	// 1: reset hipernacije - trazi '-' i /n koje prati ili ne \s
	,
	[/-[\n*\s*]*/g, '']

	// 2: rekonstrukcija paragrafa - trazi sve \n koje ne prati drugi \n i ne prethodi im
	,
	[/([^\n])\n([^\n])/g, '$1 $2']


	// 3: skidanje duplih \n
	,
	[/\n\n/g, '\n']

	// 4: prelom strana na tacki \f je isto kao \u000c
	,
	[/(\.)\s*\f\s*/g, '.\n']

	// 5: prelom strana u paragrafu
	,
	[/\s*\f\s*/g, ' ']

	// 6: prelom strana u paragrafu
	,
	// eslint-disable-next-line no-useless-escape
	[/([^\.(\.\“)\?\!А-Ш])\n/g, '$1 ']

	// 7: formiranje html <p>
	,
	[/^(.*)$/gm, '<p>$1</p>']

	// 8: formiranje html <h1>
	,
	[/(<p>)([^а-ш]*)(<\/p>)/g, '<h1>$2</h1>']

]
const htmlHead = `<!DOCTYPE html>
					<html lang="en">
						<head>
							<meta charset="UTF-8">
							<meta name="viewport" content="width=device-width, initial-scale=1.0">
							<meta http-equiv="X-UA-Compatible" content="ie=edge">
							<link rel="stylesheet" href="main.css">
							<title>${listKnjige.autor} - ${listKnjige.naslov}</title>
						</head>
						<body>`

const htmlFoot = `</body>
					</html>`

const maincss = `*{
					max-width: 900px;
					align-content: center;
					margin-left: auto;
					margin-right: auto;
					
					font-family: sans-serif;
					font-size: 15px

				}

				p{
					text-indent: 20px;
					text-justify: distribute;
					text-align: justify;

				}`

// let dir = './II-153244-097/test/out/'

let dir = path.join(ROOTDIR, listKnjige.dirName, 'out')
let outhpath = path.join(ROOTDIR, listKnjige.dirName)




function textFormat(file, regex) {

	// console.log(file)

	// let filePTH = path.format(file)
	// let fileEXT = path.extname(filePTH)
	// let fileNME = path.basename(filePTH, fileEXT)
	let rgcheckPTH = path.join(outhpath, 'test')

	napraviDir(rgcheckPTH)
	// let textIN = fs.readFileSync(filePTH, 'utf-8')



	// console.log(textIN)


	// let textOUT = textIN
	for (let i = 0; i < regex.length; i++) {
		let textTEMP = file.replace(regex[i][0], regex[i][1])
		file = textTEMP
		fs.writeFileSync(path.join(rgcheckPTH, 'test ' + i + '.txt'), file)
	}
	return file
}


function FormatIzDir(dir) {

	fs.readdir(dir, (err, files) => {
		if (err) {
			console.log('Readdir greska ', err)

		} else {
			let htmlBody = ''
			console.log(`Pronadjeno ${files.length} fajlova`)
			files.forEach(async file => {
				let filePath = path.parse(path.join(dir, file))
				if (filePath.ext == '.txt') {
					let textIN = fs.readFileSync(path.format(filePath), 'utf-8')

					htmlBody += textIN


					// console.log(htmlBody)
				}


			})

			htmlBody = textFormat(htmlBody, regex)
			// console.log('Tekst je ' + htmlBody)
			let htmlString = htmlHead + htmlBody + htmlFoot
			fs.writeFileSync(path.join(outhpath, 'index.html'), htmlString)
			fs.writeFileSync(path.join(outhpath, 'main.css'), maincss)
		}

	})



}
FormatIzDir(dir)