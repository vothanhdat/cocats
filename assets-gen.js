const fileTypeRegex = /\.(png|txt)$/
const imageTypeRegex = /\.(png|jpg|gif)$/

const glob = require("glob")
const fs = require('fs');
const sizeOf = require('image-size');




glob("src/assets/**/*.*", null, function (er, files) {
    const processKey = e => e.replace(/\//,'_').replace(fileTypeRegex,'').toUpperCase()

    const data = files
        .map(e => e.replace('src/assets/',''))
        .filter(e => fileTypeRegex.test(e)) 
        .map(e => `${processKey(e)} : "/assets/${e}",`)

    const dataSize = files
        .filter(e => imageTypeRegex.test(e)) 
        .map(file => ({
            key : processKey(file.replace('src/assets/','')),
            size : sizeOf(file)
        }))
        .map(e  => `${e.key}: {width: ${e.size.width},height: ${e.size.height}},`)

    const writeText = `


function assetInfoType<T>(e : T) : (T &  {[key : string] : {width : number,height : number}}) {
  return e as (T &  {[key : string] : {width : number,height : number}})
}

function asseType<T>(e : T) : (T &   {[key : string] : string} ) {
  return e as (T &   {[key : string] : string} )
}

export const assetInfo = assetInfoType({
${dataSize.map(e => '  ' + e).join('\n')}
})



export const assets = asseType({
${data.map(e => '  ' + e).join('\n')}
})
`

    console.log(writeText)
    
    fs.writeFile("src/assets.ts", writeText, function(err) { });

})