import { useState } from "react";
import "./App.css";

function App() {
  // this receives the data from the response
  // const [carData, setCarData] = useState();
  // this displays the image on the page
  const [image, setImage] = useState();
  //using this third useState to append to the form data, to use in the post request
  const [imageFile, setImageFile] = useState(null);
  // this is used to store the result text
  const [result, setResult] = useState();

  const handleImgSubmit = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImageFile(file);
      // setImage(event.target.value);
    } else {
      console.log("no file uploaded");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("click!");
    try {
      const formData = new FormData();
      formData.append("image", imageFile);
      const response = await fetch(
        `https://mission01-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/87bd17aa-27c9-4b89-95c4-7f6120d0411c/detect/iterations/Iteration3/image`,
        {
          method: "POST",
          headers: {
            "Prediction-Key":
              "3IttSAg3iBMHlTPRFHcMkXJ3ziDehGJGc8waS1jbdVJ2n4lLTsn5JQQJ99AKACYeBjFXJ3w3AAAIACOGVygv",
            // "Content-Type": "application/octet-stream",
          },
          body: formData,
        }
      );
      const resData = await response.json();
      // if (resDescr) {
      //   setCarData(resDescr);
      //   console.log(resDescr);
      // }

      //here, I am immediately taking the response data from the api and based on the response setting the result message
      if (resData && resData.predictions.length > 0) {
        // Find the prediction with the highest probability
        const bestPrediction = resData.predictions.reduce((max, prediction) =>
          prediction.probability > max.probability ? prediction : max
        );

        // Output the highest probability and associated label
        console.log(
          `Highest probability: ${bestPrediction.probability} for label: ${bestPrediction.tagName}`
        );

        let results;
        switch (bestPrediction.tagName) {
          case "Motorbike": //if (tagName === "Motorbike")
            results = `We are ${(bestPrediction.probability * 100).toFixed(
              1
            )}% sure this is your ${
              bestPrediction.tagName
            }. The annual insurance cost will be $400`;
            break;
          case "Sedan":
            results = `We are ${(bestPrediction.probability * 100).toFixed(
              1
            )}% sure this is your ${
              bestPrediction.tagName
            }. The annual insurance cost will be $500`;
            break;
          case "SUV":
            results = `We are ${(bestPrediction.probability * 100).toFixed(
              1
            )}% sure this is your ${
              bestPrediction.tagName
            }. The annual insurance cost will be $600`;
            break;
          case "Van": //if (fruit === "pear")
            results = `We are ${(bestPrediction.probability * 100).toFixed(
              1
            )}% sure this is your ${
              bestPrediction.tagName
            }. The annual insurance cost will be $700`;
            break;
          default:
            console.log("Vehicle not found :(");
        }

        setResult(results);
      } else {
        console.log("No predictions found.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // let carType = result.tagName;
  // console.log(result)

  return (
    <>
    <header id="header">

      <h1>Turners Cars Insurance</h1>
    </header>
      <div id="bodyBox">
      <p>
        Here at Turners, we believe in offering you great value. <br />
        To get a quick quote for insurance coverage for your vehicle, upload a
        picture of it below and we'll handle the rest!
      </p><br /><br />
        <form>
          <input
            type="file"
            id="imgFile"
            name="image"
            accept="/image*" //must ensure the file being uploaded is an img
            onChange={handleImgSubmit}
          />
          <input type="submit" onClick={handleSubmit} className="button"/>
        </form>
      <div className="imgBox" id="imgBox">
        {image && <img src={image} alt="Your car" />}
        <p>{result}</p>
      </div>
      </div>
    </>
  );
}

export default App;
