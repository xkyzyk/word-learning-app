import React, { Component } from "react";
import _uniqueId from "lodash/uniqueId";

export default class AddWord extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      word: "",
      trigger: "",
      definition: "",
      id: 0,
      known: false,
      loading: false
    };
  }

  handleChange = e => {
    const target = e.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ loading: true });
    fetch(
      `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${this.state.word}?key=5757083d-e287-4958-8908-6d1c086d9548`
    )
      .then(response => response.json())
      .then(data => {
        if (typeof data[0] === "object") {
          if (data[0].meta && data[0].meta.offensive === true) {
            this.setState({ word: "ur a naughty boi" });
          }
          this.setState({ definition: data[0].shortdef, id: _uniqueId() });
          this.props.addWord(this.state);
          this.setState({
            word: "",
            trigger: "",
            definition: "",
            known: false,
            loading: false
          });
        } else if (typeof data[0] === "string") console.log("Word not found"); //offer suggestions
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset>
          <legend>Add new word:</legend>
          <input
            required
            name="word"
            placeholder="word"
            value={this.state.word}
            onChange={this.handleChange}
          />
          <br></br>
          <input
            name="trigger"
            placeholder="trigger"
            value={this.state.trigger}
            onChange={this.handleChange}
          />
          <br></br>
          <input
            name="known"
            type="checkbox"
            checked={this.state.known}
            onChange={this.handleChange}
          />
          <label htmlFor="known">known</label>
          <br></br>
          <button onSubmit={this.handleSubmit}>
            {this.state.loading === true ? "Loading" : "Submit"}
          </button>
        </fieldset>
      </form>
    );
  }
}
