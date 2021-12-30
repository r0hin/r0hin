const functions = require('firebase-functions');
var admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore()
const http = require('https');
const path = require('path');
const os = require('os');
const mkdirp = require('mkdirp');
const fs = require('fs');
const XLSX = require('xlsx')
const NodeGeocoder = require('node-geocoder');
const csv = require("csvtojson");


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.parseData = functions.storage.object().onFinalize(async event => {
  functions.logger.log("Hello from info. Here's an object:", event);

  mediaLink = event.mediaLink

  const filePath = event.name;
  const baseFileName = path.basename(filePath, path.extname(filePath));
  const fileDir = path.dirname(filePath);
  const tempLocalFile = path.join(os.tmpdir(), filePath);
  const tempLocalDir = path.dirname(tempLocalFile);

  const bucket = admin.storage().bucket(event.bucket);
  await mkdirp(tempLocalDir);
  await bucket.file(filePath).download({destination: tempLocalFile});
  console.log('The file has been downloaded to', tempLocalFile);

  if (filePath.split('.').includes('xlsx')) {
    // XLsx File
    
    name = tempLocalFile

    var workbook = XLSX.readFile(name);
    var sheet_name_list = workbook.SheetNames;

    let workbookheader = XLSX.readFile(name, {sheetRows: 1})
    let headerData = XLSX.utils.sheet_to_json(workbookheader.Sheets[sheet_name_list[0]], {
      header: 1,
      defval: '',
      blankrows: true
    });
    
    json = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]], {range:1,raw: false})

    if (headerData[0][0] == 'Stations:') {
      // Different format
      let line5header = XLSX.readFile(name, {sheetRows: 5})
      let line5 = XLSX.utils.sheet_to_json(line5header.Sheets[sheet_name_list[0]], {
        header: 5,
        defval: '',
        blankrows: true
      });

      json = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]], {range:6,raw: false})

      fs.unlinkSync(tempLocalFile);

      return db.collection('parsed').doc(filePath.split("/").pop()).set({
        meta: {
          name: headerData[0][0],
          long: line5[3]['Stations:'].split('Lon: ')[1],
          lat: line5[2]['Stations:'].split('Lat: ')[1],
          formatted: 'n/a format'
        },
        data: json
      })

    }
    else {

      const options = {
        provider: 'google',
        apiKey: 'AIzaSyDRX6g2Q_LSePFC9XPQIyQrL5dTjiv0dnc'
      };
       
      const geocoder = NodeGeocoder(options);
      const geoRes = await geocoder.geocode(headerData[0][0]);

      fs.unlinkSync(tempLocalFile);

      return db.collection('parsed').doc(filePath.split("/").pop()).set({
        meta: {
          name: headerData[0][0],
          long: geoRes[0].longitude,
          lat: geoRes[0].latitude,
          formatted: geoRes[0].formattedAddress
        },
        data: json
      })
  
    }
    
  }


  // if (name.split('.')[1].includes('csv')) {
  //   const file = fs.createWriteStream(name);
  //   const request = https.get(mediaLink, (response) => {
  //     response.pipe(file).on('finish', async () => {
  //       csv().fromFile(name).then(function(json){
  //         console.log(json);
  //       })
  //     })
  //   })

    
  // }

});

// exports.testParse = functions.https.onRequest(async (req, res) => {
//   mediaLink = 'https://firebasestorage.googleapis.com/v0/b/raintrack-23568.appspot.com/o/data%2Fehd1GV9RN1T334ksjcrJHxoXUwG3%2Ftest.csv?alt=media&token=dbdc913d-5fe9-4a73-affe-0f1fdd3a9703'
//   name = 'test.csv'

//   if (name.split('.')[1] == 'xlsx') {
   
//   const file = fs.createWriteStream(name);
//   const request = https.get(mediaLink, (response) => {
//     response.pipe(file).on('finish', async () => {
//     })
//   }); 
//   }
//   if (name.split('.')[1] == 'csv') {
//     const file = fs.createWriteStream(name);
//     const request = https.get(mediaLink, (response) => {
//       response.pipe(file).on('finish', async () => {
//         csv().fromFile(name).then(function(json){
//           console.log(json);
//         })
//       })
//     })
//   }
// })