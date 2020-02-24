import React, { useState } from "react";

export default function AddWord({ addWord }) {
  const [word, setWord] = useState({
    word: "",
    trigger: "",
    id: 0,
    known: false
  });

  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    const { target } = e;
    const { name } = target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setWord({
      ...word,
      [name]: value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    await addWord(word);
    setLoading(false);
    setWord({
      ...word,
      word: "",
      trigger: "",
      known: false
    });
  };

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
        <button type="submit">{loading === true ? "Loading" : "Submit"}</button>
      </fieldset>
    </form>
  );
}
