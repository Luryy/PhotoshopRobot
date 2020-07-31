const spawn = require('child_process').spawn;
const path = require('path');
const state = require('./state.js');

const rootPath = path.resolve(__dirname, '..');
const fromRoot = relPath => path.resolve(rootPath, relPath);

const photoshopFilePath = "C:/Program Files/Adobe/Adobe Photoshop 2020/photoshop.exe"
const templateFilePath = fromRoot('./photoshop/template/modelo.psd');
const scriptFilePath = fromRoot('./photoshop/scripts/loop.js');

async function robot(){

  await renderVideoWithAfterEffects();

  state.removeImageFolder();
  state.clear();

}


async function renderVideoWithAfterEffects() {
    return new Promise((resolve, reject) => {

      console.log('> [ps-robot] Starting Photoshop')

      const photoshop = spawn(photoshopFilePath, [
        '-comp', 'main',
        '-project', templateFilePath, scriptFilePath
      ])

      setTimeout(function(){photoshop.kill()}, 120000); //gambiarra, should improve urgent

      photoshop.stdout.on('data', (data) => {
        process.stdout.write(data);
        console.log(data);
      })

      photoshop.on('close', () => {
        console.log('> [ps-robot] Photoshop closed')
        resolve()
      })
    })
}

module.exports = robot;