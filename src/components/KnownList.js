import React from "react";

export default function KnownList({ words, handleDelete, handleStatusChange }) {
  const wordList = words
    .filter(word => word.known === true)
    .map(word => {
      const id = word.id;
      return (
        <div key={id}>
          {word.word}
          <button
            onClick={() => {
              handleStatusChange(id);
            }}
          >
            &lt;-
          </button>
          <button
            onClick={() => {
              handleDelete(id);
            }}
          >
            X
          </button>
        </div>
      );
    });

  return wordList.length > 0 && <div>Known{wordList}}</div>;
}
