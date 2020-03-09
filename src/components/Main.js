import React, { useState, useEffect } from "react";
import { Grid } from "@chakra-ui/core";
import AddWord from "./AddWord";
import LearningList from "./LearningList";
import KnownList from "./KnownList";
import apiKey from "../api-key";

export default function Main() {
  const [words, setWords] = useState(
    JSON.parse(localStorage.getItem("words")) || []
  );
  const [error, setError] = useState(null);

  useEffect(() => {
    localStorage.setItem("words", JSON.stringify(words));
  }, [words]);

  const onSubmit = async word => {
    try {
      const url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word.word}?key=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      const definitions = data[0].shortdef;
      if (typeof data[0] === "object") {
        if (data[0].meta && data[0].meta.offensive === true) {
          word.word = "ur a naughty boi";
        }
        word = {
          ...word,
          definitions: definitions,
          id: Date.now() + word.word, //change to + username
          expanded: true
        };
        setWords([...words, word]);
      } else if (typeof data[0] === "string") {
        console.log("Word not found"); //prompt suggested words
        return;
      }
    } catch (err) {
      setError(err);
      console.warn(error);
    } //finally {

    // }
  };

  const onExpand = id => {
    setWords(words => {
      const changedWords = words.map(word => {
        if (id === word.id) {
          word.expanded = !word.expanded;
          return word;
        } else {
          return word;
        }
      });
      return changedWords;
    });
  };

  const onDelete = id => {
    const lessWords = words.filter(word => word.id !== id);
    setWords(lessWords);
  };

  const onStatusChange = id => {
    setWords(words => {
      const changedWords = words.map(word => {
        if (id === word.id) {
          word.known = !word.known;
          return word;
        } else {
          return word;
        }
      });
      return changedWords;
    });
  };

  return (
    <>
      <AddWord addWord={onSubmit} children={error ? error : null} />
      <LearningList
        words={words}
        handleExpand={onExpand}
        handleDelete={onDelete}
        handleStatusChange={onStatusChange}
      />
      {/* <KnownList
          words={words}
          handleDelete={onDelete}
          handleStatusChange={onStatusChange}
        /> */}
    </>
  );
}
