import fs from 'fs';

function get_webpbase64(file) {
    fs.readFile(file, function (error, data) {
      if (error) {
        throw error;
      } else {
        let buf = Buffer.from(data);
        let dataBase64 = Buffer.from(buf).toString('base64');
        console.log(dataBase64);
          // base64str of image
        // base64str image type jpg,png ...
        //option: options and quality,it should be given between 0 to 100
        let result = webp.str2webpstr(dataBase64,"jpg","-q 80");
        result.then(function(result) {
          // you access the value from the promise here
          console.log(result)
        });
      }
    });
    }
    export default get_webpbase64