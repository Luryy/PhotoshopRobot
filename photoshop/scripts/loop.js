#include "./config/json2.js";

var content = loadJson('../../content/content.json');

for ( var i = 0; content.range.length > i; i++){

    var imgPath = (content.path + "\\content\\image\\" + content.range[i] + ".png");

    var geralLayer = app.activeDocument.layerSets.getByName('Post 1');
    var textLayer = geralLayer.layers.getByName('Text');
    var numTable = textLayer.layers.getByName('Número');
    numTable.textItem.contents = content.range[i];
    addImg(imgPath);

    saveJPEG(content.range[i]);

}

app.activeDocument.close(SaveOptions.DONOTSAVECHANGES)

function addImg(rote){
    var idPlc = charIDToTypeID( "Plc " );
    var desc207 = new ActionDescriptor();
    var idIdnt = charIDToTypeID( "Idnt" );
    desc207.putInteger( idIdnt, 284 );
    var idnull = charIDToTypeID( "null" );
    desc207.putPath( idnull, new File(rote) );
    var idFTcs = charIDToTypeID( "FTcs" );
    var idQCSt = charIDToTypeID( "QCSt" );
    var idQcsa = charIDToTypeID( "Qcsa" );
    desc207.putEnumerated( idFTcs, idQCSt, idQcsa );
    var idOfst = charIDToTypeID( "Ofst" );
        var desc208 = new ActionDescriptor();
        var idHrzn = charIDToTypeID( "Hrzn" );
        var idPxl = charIDToTypeID( "#Pxl" );
        desc208.putUnitDouble( idHrzn, idPxl, -281.000000 );
        var idVrtc = charIDToTypeID( "Vrtc" );
        var idPxl = charIDToTypeID( "#Pxl" );
        desc208.putUnitDouble( idVrtc, idPxl, -36.082989 );
    var idOfst = charIDToTypeID( "Ofst" );
    desc207.putObject( idOfst, idOfst, desc208 );
    var idLnkd = charIDToTypeID( "Lnkd" );
    desc207.putBoolean( idLnkd, true );
executeAction( idPlc, desc207, DialogModes.NO );
}

function loadJson(relPath){
    var script = new File($.fileName);
    var jsonFile = new File(script.path + '/' + relPath);

    jsonFile.open('r');
    var str = jsonFile.read();
    jsonFile.close();

    return JSON.parse(str);
}


function saveJPEG(name){
    var doc = app.activeDocument;
    var file = new File("C:\\Users\\lucas\\Desktop\\" + content.folder + '/' + name + '.jpg');

    var opts = new JPEGSaveOptions();
    opts.quality = 10;

    doc.saveAs(file, opts, true);

}