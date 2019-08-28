const System3 = require('./class/system3.js');
const watch = require('node-watch');

//settings
const srcFilename = './data/client_feed.csv';
const pathToWatch = 'data';
const BYPASSWATCH = true;


if(!BYPASSWATCH) {
//watch the directory and run system3 when a file has been uploaded
watch(pathToWatch, { recursive: false, filter: /\.csv$/ }, (evt, name) => {

  //what event are we going to process
  switch(evt) {
    case 'update':
      console.log('Processing %s', name, evt);

      //create an instance of system3 and run
      const sys3 = new System3(srcFilename);
      sys3.run();
      break;
    case 'remove':
      console.log('Deleting %s', name, evt);
      break;
    default:
        console.log('Defaultg %s', name, evt);
        break;
  }
})}
else {
  const sys3 = new System3(srcFilename);
      //sys3.run();
      sys3.connectToMySql();
}