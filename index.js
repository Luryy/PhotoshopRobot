const robots = {
    input: require('./robots/input.js'),
    qr: require('./robots/qr.js'),
    ps: require('./robots/ps-use.js'),
  }
  
  async function start() {
    robots.input();
    await robots.qr();
    await robots.ps();
  }
  
  start()