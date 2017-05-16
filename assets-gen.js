const fileTypeRegex = /\.(png|txt)$/
const imageTypeRegex = /\.(png|jpg|gif)$/

const glob = require("glob")
const fs = require('fs');
const sizeOf = require('image-size');




glob("src/assets/**/*.*", null, function (er, files) {
    const processKey = e => e.replace(fileTypeRegex,'').toUpperCase()

    const data = files
        .map(e => e.replace('src/assets/',''))
        .filter(e => fileTypeRegex.test(e)) 
        .reduce((e,f) => {
            e[f.replace(/\//,'_').replace(fileTypeRegex,'').toUpperCase()] = '/assets/' + f
            return e
        },{})

    const dataSize = files
        .filter(e => imageTypeRegex.test(e)) 
        .map(file => ({file : file.replace('src/','/'),size : sizeOf(file)}))
        .reduce( (e,{file,size : {width,height}}) => {
            e[file] = {width,height}
            return e;
        },{})

    const writeText = `

const dataSize : {[key : string] : {width : number,height: number}} = ${JSON.stringify(dataSize,0,2)}

export const getSize = function(e : string) {
    return dataSize[e] || {width : 1,height: 1}
}

type T = {[key : string] : string}

export const assets : T = ${JSON.stringify(data,0,2)}
    
    
    `

    console.log(writeText)
    
    fs.writeFile("src/assets.ts", writeText, function(err) {

    });

})