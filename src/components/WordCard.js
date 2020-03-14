import React from "react";
import {
  Flex,
  Heading,
  Divider,
  Text,
  Collapse,
  Box,
  Stack,
  IconButton
} from "@chakra-ui/core";
import {
  FaAngleUp,
  FaAngleDown,
  FaHdd,
  FaTrashAlt,
  FaUndoAlt
} from "react-icons/fa";

export default function WordCard({
  word,
  handleExpand,
  handleDelete,
  handleStatusChange
}) {
  const id = word.id;
  return (
    <Flex key={id} gridColumn={word.known ? "2" : "1"}>
      <Box
        margin="20px"
        maxW="2xl"
        align="center"
        bg={`blue.${100 * Math.floor(10 * Math.random()) || 500}`}
        w="440px"
        p={4}
        color="white"
        rounded="lg"
      >
        <Flex direction="column" align="center" justify="center">
          <Heading size="md">{word.word}</Heading>
          <Text>{word.trigger && <div>{word.trigger}</div>}</Text>
          {!word.known && word.definitions && (
            <Collapse margin="20px" isOpen={word.expanded}>
              <ol>
                {word.definitions.map((def, i) => (
                  <li key={id + i}>
                    {i > 0 || word.trigger ? (
                      <Divider borderColor="white" />
                    ) : null}
                    <Text>{def}</Text>
                  </li>
                ))}
              </ol>
            </Collapse>
          )}
          <Stack marginTop="10px" isInline spacing={8} align="center">
            {!word.known && (
              <IconButton
                icon={word.expanded ? FaAngleUp : FaAngleDown}
                size="sm"
                variantColor="blue"
                aria-label="show/hide definitions"
                onClick={() => handleExpand(id)}
              >
                Expand
              </IconButton>
            )}
            <IconButton
              icon={word.known ? FaUndoAlt : FaHdd}
              size="sm"
              variantColor="blue"
              aria-label="archive word"
              onClick={() => {
                handleStatusChange(id);
              }}
            >
              Archive
            </IconButton>
            <IconButton
              icon={FaTrashAlt}
              size="sm"
              variantColor="blue"
              aria-label="delete word"
              onClick={() => {
                handleDelete(id);
              }}
            >
              Delete
            </IconButton>
          </Stack>
        </Flex>
      </Box>
    </Flex>
  );
}
