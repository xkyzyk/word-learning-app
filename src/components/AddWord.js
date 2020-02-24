import React, { useState, useEffect, useCallback } from "react";
import _uniqueId from "lodash/uniqueId";
import { apiKey } from "../api-key";

export default function AddWord({ addWord }) {
  const [word, setWord] = useState({
    word: "",
    trigger: "",
    definitions: [],
    id: 0,
    known: false
  });

  const [loading, setLoading] = useState(false);

  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   async function getDefinitions() {
  //     const url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word.word}?key=${apiKey}`;
  //     try {
  //       const response = await fetch(url);
  //       const data = await response.json();
  //       setWord({
  //         ...word,
  //         definitions: data[0].shortdef,
  //         id: _uniqueId()
  //       });
  //       console.log(word);
  //     } catch (e) {
  //       // setError({ e });
  //       console.log(e);
  //     } finally {
  //       addWord(word);
  //       setLoading(false);
  //       console.log("api called");
  //     }
  //   }
  //   if (loading) getDefinitions();
  // }, [addWord, loading, word]);

  function handleChange(e) {
    const { target } = e;
    const { name } = target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setWord({
      ...word,
      [name]: value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word.word}?key=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      const definitions = data[0].shortdef;
      console.log(definitions);
      // if (typeof data[0] === "object") {
      //   if (data[0].meta && data[0].meta.offensive === true) {
      //     setWord({ ...word, word: "ur a naughty boi" });
      //   }
      setWord({
        ...word,
        definitions: definitions,
        id: _uniqueId()
      });
      // } else if (typeof data[0] === "string") {
      //   console.log("Word not found");
      // } //offer suggestions
    } catch (err) {
      console.log(err);
    } finally {
      addWord(word);
      console.log(word);
      setLoading(false);
      // setWord({
      //   ...word,
      //   word: "",
      //   trigger: "",
      //   definitions: [],
      //   known: false
      // });
    }
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
        <button>{loading === true ? "Loading" : "Submit"}</button>
      </fieldset>
    </form>
  );
}
