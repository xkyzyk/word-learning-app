import React, { Component } from "react";
import _uniqueId from "lodash/uniqueId";

export default class AddWord extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { word: "", id: 0 };
  }

  handleChange(e) {
    this.setState({ word: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ id: _uniqueId() });
    this.props.addWord(this.state);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset>
          <legend>Add new word:</legend>
          <input value={this.state.word} onChange={this.handleChange} />
          <button onSubmit={this.handleSubmit}>Submit</button>
        </fieldset>
      </form>
    );
  }
}
