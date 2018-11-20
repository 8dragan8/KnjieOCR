// // const URL = require('url').URL

// // let img_url = new URL('http://digitalna.nb.rs/wb/NBS/Knjige/Srpska_knjizevnost_u_100knjiga/II-153244-097?pageIndex=00005')

// // let urlPTH = img_url.pathname

// // let dirname = img_url.pathname.slice(img_url.pathname.lastIndexOf('/') + 1)
// // let dirname2 = img_url.pathname.slice(-13)

// // console.log(urlPTH)
// // console.log(dirname)
// // console.log(dirname2)

// // const through2 = require('through2')

// // const toUpperCase = through2((data, enc, cb) => { /* 1 */
// // 	cb(null, new Buffer(data.toString().toUpperCase())) /* 2 */
// // })

// // process.stdin.pipe(toUpperCase).pipe(process.stdout)


// let regex = []

// regex[0] = new RegExp(/([^\n])\n([^\n])/, 'g')
// regex[1] = new RegExp(/(-[\n*\s*]*)/, 'g')

// // console.log(regex)

// let text = ` 

// вуче надоле, утапа у себе и даје звону промукао
// глас.

// Пред Командом места мења се немачка стра-
// жа. Војник намешта боље шлем и шаком трља
// црвено уво.

// На почетку варошице, у срцу улице, појављује
// се чело пратње.

// Напред корача Јеремија, богомољац. У сукне-
// ном је оделу, и једино брада и коса показују да је
// свештено лице. Висок, погрбљен, клати се у ходу;
// црна, некресана брада избила као жбун; магла се
// извлачи из косурине и чупавих ушију. У десној
// руци, у висини свог великог носа, држи гвоздени
// крст. У левој је штап, одломљен церић у забрану.
// Јеремија је сав истурен напред, према гвозденом
// крсту; као упрегнут, вуче за собом целу поворку.

// До Јеремије, на пола корака, гази поштар; у
// руци му послужавник узет из крчме, и на том
// комаду плеха пресавијени списак притиснут ка-
// меном. Поштар гега, стално смањује своје десно
// раме.

// Иза Јеремије — седамнаест белих крстача;
// криве и неједнаке; мирис тек згуљеног дрвета
// пуни улицу. Крстаче — живо војничко гробље.

// Померају се, носе их преостали мушкарци из села.

// На крстачама коломазом исписана имена: Жи-
// вадин Јеремић, Павле Живић, Светозар Костић.
// Даље се слова не виде — крстаче играју, крију
// име допола, и за тренутак откривају цело пре-
// зиме.

// На неким крстовима, зелена и жута штампана
// слова — преостале боје од чеза и каруца. Тако су
// крстаче исписане округластим ћирилским словима,
// боје алене вунице, јоргована, или су мрка — вре-
// лим гвожђем утискивана.

// Корача мало војничко гробље; крст — то је
// човек дрвени: раширио руке, тврдо скупио ноге,
// постао једноножац — спремио се да лакше буде
// закопан у земљу.

// 41`

// // let result = regex[1].exec(text)
// let result = []
// text.replace(regex[0], (match, p1, p2, offset) => {
// 	// console.log('match: ' + match)
// 	// console.log('p1: ' + p1)
// 	// console.log('offset: ' + offset)

// 	result.push({match:match, p1:p1, p2:p2, offset:offset})

	
	
	
// })
// let linije = []

// for(let i =0; i<result.length-1; i++) {

// 	linije[i]=text.slice(result[i].offset, result[i+1].offset)
// }
// console.table(result)
// console.table(linije)
// // console.log(result)


const { spawn } = require('child_process')

let command = 'd:\\Programiranje\\Tesseract-OCR\\tesseract.exe'
let opt = ['d:\\Knjige\\Vasko Popa\\Pesme\\split\\00001a.jpg', 'd:\\Knjige\\Vasko Popa\\Pesme\\split\\out\\1.txt', '-l', 'srp']
const ls = spawn(command, opt)

ls.on('error', (err) => {
	console.log('Failed to start subprocess.')
})
ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`)
})

ls.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`)
})

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`)
})
