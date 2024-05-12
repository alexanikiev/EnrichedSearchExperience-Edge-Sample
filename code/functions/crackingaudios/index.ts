import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import axios from 'axios';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    var response = null;
    try {
        response = await axios.post('http://server:9990/storage/scan');
    }
    catch (error) {
        context.log(error);
    }
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage + response.data
    };

};

export default httpTrigger;