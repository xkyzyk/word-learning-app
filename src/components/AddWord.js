import React, { useState } from "react";
import _uniqueId from "lodash/uniqueId";

export default function AddWord({ addWord }) {
  const [word, setWord] = useState({
    word: "",
    trigger: "",
    definition: "",
    id: 0,
    known: false
  });
  const [loading, setLoading] = useState(false);
  // constructor(props) {
  //   super(props);
  //   this.handleChange = this.handleChange.bind(this);
  //   this.handleSubmit = this.handleSubmit.bind(this);
  //   this.state = {
  //     word: "",
  //     trigger: "",
  //     definition: "",
  //     id: 0,
  //     known: false,
  //     loading: false
  //   };
  // }

  function handleChange(e) {
    const target = e.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setWord({
      ...word,
      [name]: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    fetch(
      `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word.word}?key=5757083d-e287-4958-8908-6d1c086d9548`
    )
      .then(response => response.json())
      .then(data => {
        if (data[0].meta.offensive === true)
          setWord({ ...word, word: "ur a naughty boi" });
        setWord({ ...word, definition: data[0].shortdef, id: _uniqueId() });
        addWord(word);
        console.log(word);
        setWord({
          ...word,
          word: "",
          trigger: "",
          definition: "",
          known: false
        });
        setLoading(false);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Add new word:</legend>
        <input
          required
          name="word"
          placeholder="word"
          value={word.word}
          onChange={handleChange}
        />
        <br></br>
        <input
          name="trigger"
          placeholder="trigger"
          value={word.trigger}
          onChange={handleChange}
        />
        <br></br>
        <input
          name="known"
          type="checkbox"
          checked={word.known}
          onChange={handleChange}
        />
        <label htmlFor="known">known</label>
        <br></br>
        <button onSubmit={handleSubmit}>
          {loading === true ? "Loading" : "Submit"}
        </button>
      </fieldset>
    </form>
  );
}
