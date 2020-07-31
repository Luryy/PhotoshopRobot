const fs = require('fs')
const contentFilePath = './content/content.json'
const imagePath = './content/image'

function save(content) {
  const contentString = JSON.stringify(content)
  return fs.writeFileSync(contentFilePath, contentString)
}

function load() {
  const fileBuffer = fs.readFileSync(contentFilePath, 'utf-8')
  const contentJson = JSON.parse(fileBuffer)
  return contentJson
}

function clear() {
    fs.unlink(contentFilePath, (err) => err ? console.log(err) : '');
}

function createImageFolder(){
    _createFolder(imagePath);
}

function removeImageFolder(){
    _deleteFolder(imagePath);
}

function createFinalFolder(url){
    _createFolder("C:\\Users\\lucas\\Desktop\\" + url);
}

function _createFolder(path){
    fs.mkdir(path,  (err) => {
        if (err) throw err;
    });
}

function _deleteFolder(path){
    fs.rmdir(path, { recursive: true }, (err) => {
        if (err) throw err;
    });
}

module.exports = {
  save,
  load,
  clear,
  createImageFolder,
  removeImageFolder,
  createFinalFolder,
}