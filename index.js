const csv = require('csvtojson')
const path = require('path')
const fs = require('fs')

const csvFilePath = path.join(__dirname, 'customer-data.csv')

let regex = /({)/g
let regex2 = /(},?)/g
let regex3 = /"(,)"/g
let regex4 = /\n(")/g
let result = ''

csv()
.fromFile(csvFilePath)
.then((jsonObj) => {
    result += '[\n'
    for(var i in jsonObj) {
        result += JSON.stringify(jsonObj[i])
        if(i < jsonObj.length - 1) result += ',\n'
    }
    result = result.replace(regex, '\t$1\n')
    result = result.replace(regex2, '\n\t$1')
    result = result.replace(regex3, '"$1\n"')
    result = result.replace(regex4, '\n\t\t$1')
    result += '\n]'
    return result
})
.then((data) => {
    fs.writeFile(path.join(__dirname, 'jsonfile.json'), data, (err) => { if (err) console.log(err) })
})
.catch((err) => console.log(err))