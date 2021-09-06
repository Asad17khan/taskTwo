import "./App.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [wordName, setwordName] = useState("");
  const [fullName, setfullName] = useState("");
  const [fullNameList, setFullNameList] = useState([]);

  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setFullNameList(response.data);
    });
  }, []);
  const submit = () => {
    Axios.post("http://localhost:3001/api/insert", {
      wordName: wordName,
      fullName: fullName,
    });

    setFullNameList([
      ...fullNameList,
      { wordName: wordName, fullName: fullName },
    ]);
  };

  const deleteReview = (word) => {
    Axios.delete(`http://localhost:3001/api/delete/${word}`);
  };

  const updateReview = (word) => {
    Axios.put("http://localhost:3001/api/update", {
      wordName: word,
      fullName: newReview,
    });
    setNewReview("");
  };
  return (
    <div className="App">
      <h1>Task-Two</h1>
      <div className="form">
        <label>Abbreviation :</label>
        <input
          type="text"
          name="synonym"
          onChange={(e) => {
            setwordName(e.target.value);
          }}
        />

        <label>Full-Form :</label>
        <input
          type="text"
          name="fullform"
          onChange={(e) => {
            setfullName(e.target.value);
          }}
        />

        <button onClick={submit}>Do_it</button>
        {fullNameList.map((val) => {
          return (
            <div className="card">
              <h1> {val.wordName} </h1>
              <h3>{val.fullName}</h3>

              <button
                onClick={() => {
                  deleteReview(val.wordName);
                }}
              >
                Delete
              </button>
              <input
                type="text"
                id="updateInput"
                onChange={(e) => {
                  setNewReview(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  updateReview(val.wordName);
                }}
              >
                Update
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
