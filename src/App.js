import React, { Component } from "react";
import AddWord from "./components/AddWord";
import LearningList from "./components/LearningList";

export default class App extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.state = { words: [] };
  }

  onSubmit(word) {
    let words = [...this.state.words, word];
    this.setState({ words: words });
  }

  onDelete(id) {
    let words = this.state.words.filter(word => word.id !== id);
    this.setState({ words: words });
  }

  render() {
    return (
      <div>
        <AddWord addWord={this.onSubmit} />
        <LearningList words={this.state.words} handleDelete={this.onDelete} />
      </div>
    );
  }
}
