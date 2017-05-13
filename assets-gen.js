const fileTypeRegex = /\.(png|txt)$/

const glob = require("glob")
const fs = require('fs');




glob("src/assets/**/*.*", null, function (er, files) {
    const processKey = e => e.replace(fileTypeRegex,'').toUpperCase()

    const data = files
        .map(e => e.replace('src/assets/',''))
        .filter(e => fileTypeRegex.test(e)) 
        .map(e => e.split('/'))
        .reduce((e,f) => {
            f.map(processKey).reduce(
                (e,item,i,a) => e[item] 
                    || (e[item] = ( a.length - 1 == i ? ('/assets/' + f.join('/')) : {})),e)
            return e
        },{})
    

    const writeText = `export default ${JSON.stringify(data,0,2)}`

    console.log(writeText)
    
    fs.writeFile("src/assets.ts", writeText, function(err) {
        process.exit()
    }); 
})