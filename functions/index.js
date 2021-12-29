const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const request = require("request");
const cors = require('cors')({ origin: true });

exports.gtaVehicleSearch = functions.runWith({timeoutSeconds: 10,memory: "2GB"}).https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    if (!req.query.name) {
      req.query.name = "test image"
    }
    // Check the storage for the song
    var db = admin.firestore();
    doc = await db.collection("cachedSearches").doc(req.query.name).get();
  
    if (doc.exists && doc.data().imageURL) {
      functions.logger.log('Done');
      res.status(200).send({data: doc.data().imageURL});
      res.end();
      return {data: doc.data().imageURL};
    }
  
    return request(`https://bing-image-search1.p.rapidapi.com/images/search?q=${req.query.name}`, {
      headers: {
        'x-rapidapi-host': 'bing-image-search1.p.rapidapi.com',
        'x-rapidapi-key': '2620978a4bmsha4b20111849a8a3p169464jsn06238a29ad18',
        useQueryString: true
      }
    }, async (error, response, body) => {
      const data = JSON.parse(body);
      console.log(data)
      await db.collection("cachedSearches").doc(req.query.name).set({
        imageURL: data.value[0].contentUrl
      })

      functions.logger.log('Done');
      res.status(200).send({data: data.value[0].contentUrl});
      res.end()
      return {data: data.value[0].contentUrl};
    })
  })
});