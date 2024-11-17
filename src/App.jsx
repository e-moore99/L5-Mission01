import { useState } from "react";
import "./App.css";

function App() {
  const [carData, setCarData] = useState();
  const [image, setImage] = useState();

  
  const handleImgSubmit = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
    // setImage(event.target.value);
  };



  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("click!");
    try {
      const fetchOptions = {
        method: "POST",
        headers: {
          "Prediction-Key":
            "3IttSAg3iBMHlTPRFHcMkXJ3ziDehGJGc8waS1jbdVJ2n4lLTsn5JQQJ99AKACYeBjFXJ3w3AAAIACOGVygv",
          "Content-Type": "multipart/form-data",
        },
        body: JSON.stringify({
          image: image,
        }),
        // URL: {image},
      };
      const response = await fetch(
        `https://mission01-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/87bd17aa-27c9-4b89-95c4-7f6120d0411c/detect/iterations/Iteration3/image`,
        fetchOptions
      );
      const resDescr = await response.json();
      console.log(resDescr.data);
      setCarData(resDescr.data);
      console.log(carData);
    } catch (err) {
      console.log(err);
    }
  };

  console.log({ image });
  return (
    <>
      <h1>Turners Cars Insurance</h1>
      <p>
        Here at Turners, we believe in offering you great value. <br />
        To get a quick quote for insurance coverage for your vehicle, upload a
        picture of it below and we'll handle the rest!
      </p>
      <div>
        <form>
          <input
            type="file"
            id="imgFile"
            name="image"
            onChange={handleImgSubmit}
          />
          <input type="submit" onClick={handleSubmit} />
        </form>
      </div>
      <div className="imgBox" id="imgBox">
       {image && <img src={image} alt="Your car" />}
        <p>
          This is your (car type) and the insurance premium will be ($xyz) per
          annum
        </p>
      </div>
    </>
  );
}

export default App;
