const express = require('express');
const axios = require('axios');
require('dotenv').config();
const cors = require("cors");

const app = express();
//middleware
app.use(cors);
app.use(express.json())
const apiKey = process.env.APIKEY;
const azureEndPoint = "https://mission01-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/87bd17aa-27c9-4b89-95c4-7f6120d0411c/detect/iterations/Iteration3/image";

// Base instance for axios request
const baseInstanceOptions = {
    baseURL: azureEndPoint,
    timeout: 50000,
    headers: {
      'Content-Type': 'application/octet-stream',
      'Ocp-Apim-Subscription-Key': apiKey
    }
  }


app.post('/api/describe', async (req,res)=>{
    try{
        const instanceOptions = {...baseInstanceOptions}
        const instance = axios.create(instanceOptions)
        const body = req.body
        const response = await instance.post(
            `${azureEndPoint}`,
            {
              url: body.image
            }
        ) 
        res.send({
            response: 'ok',
            data: response.data
          })
        } catch (err) {
          console.log("error: ", err)
        }
    
})



const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});