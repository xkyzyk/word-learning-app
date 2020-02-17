import React from "react";
import _uniqueId from "lodash/uniqueId";

export default function UnderstoodList({ words, handleDelete }) {
  const wordList = words.map(word => {
    return (
      <div key={_uniqueId}>
        {word.input}
        <button
          onClick={() => {
            handleDelete(word.id);
          }}
        >
          X
        </button>
      </div>
    );
  });

  return <div>{wordList}</div>;
}
