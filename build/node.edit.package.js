const path = require('path')
const resolve = (...file) => path.resolve(__dirname, ...file)
const fs = require('fs')
const chalk = require('chalk')
const successLog = (message) => console.log(chalk.blue(`${message}`))
function getJson (path = '../package.json') {
    const _packageJson = fs.readFileSync(resolve(path))
    return JSON.parse(_packageJson)
}

const writeVersionJson = function (version) {
    const versionJson = getJson('../version.json')
    versionJson.version = version
    // 2代表格式化数据的时候前面填充2个空格
    fs.writeFile(resolve('../version.json'), JSON.stringify(versionJson, null, 2), function (err) {
        if (err) console.error(err)
        successLog('version.json文件已经更新')
    })
}

const writePackageJson = function (main = 'lib/eve-ui.umd.min.js') {
    const packageJsonData = getJson()
    packageJsonData.main = main
    //修改version
    writeVersionJson(packageJsonData.version)
    // 2代表格式化数据的时候前面填充2个空格
    fs.writeFile(resolve('../package.json'), JSON.stringify(packageJsonData, null, 2), function (err) {
        if (err) console.error(err)
        successLog('package.json文件已经更新')
    })
}

exports.writePackageJson = writePackageJson
