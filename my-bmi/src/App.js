import React, { useState } from "react";
import "./App.css";
import BmiList from "./components/BmiList";
import BmiScore from "./components/BmiScore";
import Form from "./components/Form";

function App() {
  const [show, setShow] = useState(false);
  const [changeWeight, setchangeWeight] = useState({ wight: "", type: "" });
  const [bmi, setbmi] = useState("00");
  const [bmiType, setbmitype] = useState("Not Calculated");
  const [bmiRange, setBmiRange] = useState({
    underWeight: { low: "" },
    normal: { low: "", high: "" },
    overWeight: { low: "", high: "" },
    obesityOne: { low: "", high: "" },
    obesityTwo: { low: "", high: "" },
    obesityThree: { high: "" },
  });

  const onFormSub = (w, h) => {
    let bmiValue = calBmi(w, h);
    setbmi(bmiValue);
    setbmitype(weightType(bmiValue));
    const Range = {
      underWeight: { low: calWeight(18.5, h) },
      normal: { low: calWeight(18.5, h), high: calWeight(24.9, h) },
      overWeight: { low: calWeight(25, h), high: calWeight(29.9, h) },
      obesityOne: { low: calWeight(30, h), high: calWeight(34.9, h) },
      obesityTwo: { low: calWeight(35, h), high: calWeight(39.9, h) },
      obesityThree: { high: calWeight(40, h) },
    };
    setBmiRange(Range);
    setchangeWeight(weightChange(bmiValue, w, Range));
    setShow(true);
  };

  const calBmi = (w, h) => (w / (h * h)).toFixed(2);

  const calWeight = (bmiValue, h) => (bmiValue * h * h).toFixed(2);

  const weightChange = (bmiValue, w, Range) => {
    let changeObj;
    if (bmiValue > 24.9) {
      changeObj = {
        wight: (w - Range.normal.high).toFixed(2),
        type: "positive",
      };
      return changeObj;
    } else if (bmiValue < 18.5) {
      changeObj = {
        wight: (Range.normal.low - w).toFixed(2),
        type: "negative",
      };
      return changeObj;
    } else {
      changeObj = { wight: 0, type: "normal" };
      return changeObj;
    }
  };

  const weightType = (bmi) => {
    if (bmi < 18.5) {
      return "Under Weight";
    } else if (18.5 < bmi && bmi < 24.9) {
      return "Normal";
    } else if (24.9 < bmi && bmi < 29.9) {
      return "Over Weight";
    } else if (29.0 < bmi && bmi < 34.9) {
      return "Obesit class 1";
    } else if (34.9 < bmi && bmi < 39.9) {
      return "Obesit class 11";
    } else if (bmi > 39.9) {
      return "Obesit class 111";
    }
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center mt-5 mx-2">
          <Form getData={onFormSub} />
        </div>
        {show && (
          <div className="row justify-content-center mt-5">
            <div className="col-12 col-sm-6 mb-5">
              <BmiScore
                bmiNo={bmi}
                bmiName={bmiType}
                changeWeight={changeWeight}
              />
            </div>
            <div className="col-12 col-sm-6">
              <BmiList range={bmiRange} bmi={bmi} />
            </div>
          </div>
        )}
        ;
      </div>
    </>
  );
}

export default App;

// video 2.30 mint left
