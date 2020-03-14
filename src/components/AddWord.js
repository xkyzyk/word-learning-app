import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Stack,
  Input,
  Checkbox,
  Divider,
  Button,
  FormHelperText
} from "@chakra-ui/core";

export default function AddWord({ addWord, error }) {
  const [word, setWord] = useState({
    word: "",
    trigger: "",
    known: false
  });

  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    const { target } = e;
    const { name } = target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setWord({
      ...word,
      [name]: value
    });
  };

<<<<<<< HEAD
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
=======
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    await addWord(word);
    setLoading(false);
    setWord({
      ...word,
      word: "",
      trigger: "",
      known: false
    });
>>>>>>> refactor-main-state
  };

  return (
    <Box
      margin="20px"
      maxW="2xl"
      align="center"
      bg="teal.200"
      w="440px"
      p={4}
      rounded="lg"
    >
      <FormControl as="fieldset" onSubmit={handleSubmit}>
        <FormLabel as="legend">Add new word:</FormLabel>
        <Stack spacing={3}>
          <Input
            isRequired
            variant="unstyled"
            name="word"
            placeholder="word"
            value={word.word}
            onChange={handleChange}
          />
          <Input
            variant="unstyled"
            name="trigger"
            placeholder="trigger"
            value={word.trigger}
            onChange={handleChange}
          />
          <Checkbox
            variantColor="green"
            name="known"
            checked={word.known}
            onChange={handleChange}
          >
            known
          </Checkbox>{" "}
          />
        </Stack>
        <Divider />
        {loading === true ? (
          <Button isLoading />
        ) : (
          <Button type="submit" onClick={handleSubmit}>
            Learn!
          </Button>
        )}
        <FormHelperText>{error}</FormHelperText>
      </FormControl>
    </Box>
  );
}
