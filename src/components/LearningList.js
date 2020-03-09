import React from "react";
import WordCard from "./WordCard";
import { Grid, Flex, Heading, Text, Box } from "@chakra-ui/core";

export default function LearningList({
  words,
  handleExpand,
  handleDelete,
  handleStatusChange
}) {
  const wordList = words
    // .filter(word => word.known === false)
    .map(word => (
      <WordCard
        key={word.id}
        word={word}
        handleExpand={handleExpand}
        handleDelete={handleDelete}
        handleStatusChange={handleStatusChange}
      ></WordCard>
    ));
  return (
    <Grid templateColumns="repeat(2, 1fr)" autoFlow="dense">
      <Flex direction="column" align="center" justify="center">
        <Box
          maxW="md"
          align="center"
          bg="tomato"
          w="440px"
          p={4}
          color="white"
          rounded="lg"
          margin="20px"
        >
          <Heading textAlign="left" w="440" size="lg">
            Learning
          </Heading>
        </Box>
      </Flex>
      <Flex direction="column" align="center" justify="center">
        <Box
          maxW="md"
          align="center"
          bg="tomato"
          w="100%"
          p={4}
          color="white"
          rounded="lg"
        >
          <Heading textAlign="left" w="440" size="lg">
            Known
          </Heading>
        </Box>
      </Flex>
      {wordList.length > 0 ? wordList : <Text>Start reading...</Text>}
    </Grid>
  );
}
