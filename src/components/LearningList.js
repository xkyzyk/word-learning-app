import React from "react";

export default function LearningList({
  words,
  handleDelete,
  handleStatusChange
}) {
  const wordList = words
    .filter(word => word.known === false)
    .map(word => {
      const id = word.id;
      return (
        <div key={id}>
          {word.word}
          {word.trigger && <span>|{word.trigger}</span>}
          {word.definitions && (
            <span>
              {word.definitions.map((def, i) => (
                <span key={id + i}>
                  |{i + 1}. {def}
                </span>
              ))}
            </span>
          )}
          <button
            onClick={() => {
              handleStatusChange(id);
            }}
          >
            ->
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

  return <div>Learning{wordList}</div>;
}
