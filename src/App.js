import React, { Component } from "react";
import AddWord from "./components/AddWord";
import LearningList from "./components/LearningList";
import KnownList from "./components/KnownList";
import _uniqueId from "lodash/uniqueId";
import { apiKey } from "./api-key";

export default class App extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
    this.state = { words: [] };
  }

  // const [error, setError] = useState(null);

  async onSubmit(word) {
    try {
      const url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word.word}?key=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      const definitions = data[0].shortdef;
      if (typeof data[0] === "object") {
        if (data[0].meta && data[0].meta.offensive === true) {
          word.word = "ur a naughty boi";
        }
        word.definitions = definitions;
        word.id = _uniqueId();
      } else if (typeof data[0] === "string") {
        console.log("Word not found");
      } //offer suggestions
    } catch (err) {
      console.log(err);
    } finally {
      this.setState({ words: [...this.state.words, word] });
    }
  }

  onDelete(id) {
    const words = this.state.words.filter(word => word.id !== id);
    this.setState({ words: words });
  }

  onStatusChange(id) {
    this.setState(state => {
      const words = state.words.map(word => {
        if (id === word.id) {
          word.known = !word.known;
          return word;
        } else {
          return word;
        }
      });
      return words;
    });
  }

  render() {
    return (
      <div>
        <AddWord addWord={this.onSubmit} />
        <LearningList
          words={this.state.words}
          handleDelete={this.onDelete}
          handleStatusChange={this.onStatusChange}
        />
        <KnownList
          words={this.state.words}
          handleDelete={this.onDelete}
          handleStatusChange={this.onStatusChange}
        />
      </div>
    );
  }
}
