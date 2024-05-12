import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    //context.log('HTTP trigger function processed a request.');
    //const name = (req.query.name || (req.body && req.body.name));
    //const responseMessage = name ? name : "default";

    //REFERENCES:
    //https://www.initpals.com/node-js/how-to-pass-upload-a-file-from-one-api-to-another-api-in-nodejs/
    //https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Concepts
    //http://codewinds.com/blog/2013-08-02-streams-basics.html
    //https://stackoverflow.com/questions/11944932/how-to-download-a-file-with-node-js-without-using-third-party-libraries
    //https://stackoverflow.com/questions/43048113/use-fs-in-typescript/43048371
    //https://stackoverflow.com/questions/10046039/nodejs-send-file-in-response

    //https://stackoverflow.com/questions/43810082/azure-functions-nodejs-response-body-as-a-stream

    try {  
        //Step1:   
        const response = await axios.post('http://server:9990/storage/scan');
        context.log(response.data);
        //context.log(response1.data[1]);

        //Didn't work
        /*
        //https://stackoverflow.com/questions/55374755/node-js-axios-download-file-stream-and-writefile
        const file = fs.createWriteStream(response1.data[1]);
        const response2 = await axios.post('http://10.0.0.242:30990/storage/open', 
                                           { "documentFileName": response1.data[1] }, 
                                           { headers: { 'Content-Type': 'application/json', 
                                                        'Connection': 'keep-alive' },
                                             responseType: "stream" });
        response2.data.pipe(file);
        //response2.data.pipe(fs.createWriteStream(`/tmp/${response1.data[1]}`));
        */

        //Worked well
        /*
        const filePath = path.resolve(__dirname, response1.data[0]);
        const urlPath = 'http://10.0.0.242:30990/storage/download/D1_191202_Loyalty-onepagerA1.pdf';
        const file = fs.createWriteStream(filePath);
        const response2 = await axios.get(urlPath, { responseType: "stream" });
        response2.data.pipe(file);
        */

        if (response.data !== undefined && response.data.length > 0) {
            for (var i = 0; i < response.data.length; i++) {
                 //Step2: Crack file
                 await axios.post('http://pipeline:9991/cracking/documents', { "documentFileName": response.data[i] });
                 //Step3: Move file
                 //await axios.post('http://10.0.0.242:30990/storage/move', { "documentFileName": response.data[i] });
                 await axios.post('http://server:9990/storage/copy', { "documentFileName": response.data[i] });
                 await axios.post('http://server:9990/storage/delete', { "documentFileName": response.data[i] });
            }
        }

        context.res = {
            status: 200,
            headers: {
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Origin': '*'
            },
            body: "Success" //response1.data[0]
        };
    } catch (error) {
        context.log(error);
        context.res = {
            status: 400,
            body: error
        };
    }

    /*
    let fileName = "";

    fetch(`http://${process.env.ESE_HOST_IP}:30991/storage/scan`,  {
        method: 'post'
    })
    .then(data => {
        fileName = data[0];
        return fetch(`http://${process.env.ESE_HOST_IP}:30991/storage/open`,  {
            method: 'post',
            body: JSON.stringify({ documentFileName: fileName })
        }); 
    })
    .then(data => {
        const formData = new FormData();
        formData.append('documentFile', data);
        formData.append('documentFileName', fileName);

        return fetch('http://10.0.0.242:30991/cracking/documents',  {
            method: 'post',
            body: formData
        });
    })
    .then(() => {
        
    });
    */

    //context.res = {
    //    // status: 200, /* Defaults to 200 */
    //    body: responseMessage
    //};
};

export default httpTrigger;