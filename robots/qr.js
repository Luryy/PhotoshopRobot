const imageDownloader = require('image-downloader');
const state = require('./state.js');

const mainUrl = "https://api.qrserver.com/v1/create-qr-code/?size=512x512&data="

async function robot() {
    console.log('> [image-robot] Starting...')
    const content = state.load();
    
    const {url} = content

    await _downloadImages(content);
  
    async function _downloadImages(content) {
  
      for (let i = 0; i < content.range.length; i++) {

        const urlTotal = (mainUrl + url + "/cliente/cardapio/" + content.range[i])
  
        await _downloadAndSave(urlTotal, `${content.range[i]}.png`);
        console.log(`> [image-robot] [${content.range[i]}] Image successfully downloaded!`);

        }
    }
  

    async function _downloadAndSave(url, fileName) {
        return imageDownloader.image({
        url,
        dest: `./content/image/${fileName}`
        })
    }
}

module.exports = robot;