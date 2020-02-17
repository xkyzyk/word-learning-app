import React from "react";

export default function LearningList({ words, handleDelete }) {
  const wordList = words.map(word => {
    const id = word.id;
    return (
      <div key={id}>
        {word.word}
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

  return <div>{wordList}</div>;
}
