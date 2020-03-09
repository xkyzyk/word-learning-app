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
