import fs from 'fs';

function get_webpbase64(file) {
    fs.readFile(file, function (error, data) {
      if (error) {
        throw error;
      } else {
        let buf = Buffer.from(data);
        let dataBase64 = Buffer.from(buf).toString('base64');
        let result = webp.str2webpstr(dataBase64,"jpg","-q 80");
        result.then(function(result) {
          // you access the value from the promise here
        });
      }
    });
    }
    export default get_webpbase64