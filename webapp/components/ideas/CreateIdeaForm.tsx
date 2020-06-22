import React, { useState } from 'react';
import { Box, FormControl, Input, Flex, FormLabel, Button, Textarea, Select } from "@chakra-ui/core";



const CreateIdeaFrom: React.FC = () => {
    const [title, setTitle] = useState("");
    const [difficulty, setDifficulty] = useState(1);
    const [description, setDescription] = useState("");

    return (

        <Flex align="center" justify="center" w="100%" minH="70vh" p={4}>
            <Box p={8} bg="gray.50" rounded="md">
                <FormControl mb={8} d="flex" flexDirection="column">
                    <FormLabel htmlFor="title">Title</FormLabel>
                    <Input
                        type="text"
                        id="title"
                        aria-describedby="Awesome Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </FormControl>
                <FormControl mb={8} d="flex" flexDirection="column">
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <Textarea
                        type="text"
                        id="description"
                        aria-describedby="Awesome Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </FormControl>
                <FormControl mb={8} d="flex" flexDirection="column">
                    <FormLabel htmlFor="difficulty">Difficulty</FormLabel>
                  
                    <Select placeholder="Select difficulty"
                        type="text"
                        id="difficulty"
                        aria-describedby="Hard Difficulty">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </Select>
                </FormControl>


            </Box>
        </Flex>
    )

}

export default CreateIdeaFrom;