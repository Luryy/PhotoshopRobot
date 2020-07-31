const readline = require('readline-sync');
const state = require('./state.js');
const path = require('path');

function robot(){

    const info = {}

    var range = askAndReturn('Select your table range: ');
    const serializedRange = _serializeRange(range);
    
    info.range = serializedRange;
    
    info.url = askAndReturn('Select your url: ');

    info.path = path.resolve(__dirname, '..'); // call at script to find the qr image url 

    info.folder = info.url.replace(/.+\/\//, ''); //to remove // of url -- call at script saveJpeg

    state.save(info);

    state.createImageFolder();
    state.createFinalFolder(info.folder);
    
    function askAndReturn(question) {
        return readline.question(question)
    }
}

function _serializeRange(range){
    const split = range.split(",");

    const maped = split.map(item =>{
         var mapSplit = item.split('-');
         if(!mapSplit[1]){mapSplit[1] = mapSplit[0]}
         return _range(parseInt(mapSplit[0]), parseInt(mapSplit[1]));
        });

    const final = []

    for (var i = 0; maped.length > i; i++){
        maped[i].forEach(number => final.push(number));
    }

    return final;

}

function _range(i, j){
    var array = []
    while(i < j + 1){
        array.push(i);
        i++
    }
    return array
}

module.exports = robot;