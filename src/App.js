import React, { Component } from "react";
import AddWord from "./components/AddWord";
import LearningList from "./components/LearningList";
import KnownList from "./components/KnownList";

export default class App extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
    this.state = { words: [] };
  }

  onSubmit(word) {
    this.setState({ words: [...this.state.words, word] });
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
