"use client";

import React, { useEffect, useState } from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/app/_components/ui/select"; // Import the Select components

function ModelSelector() {
    const [models, setModels] = useState([]);

    useEffect(() => {
        async function getModels() {
            fetch(
                `${process.env.NEXT_PUBLIC_OLLAMA_API_URL}/tags`)
                .then(response => response.json())
                .then(data => {
                    // Setting the models state with the fetched data
                    setModels(data.models);
                })
                .catch(error => console.error('Error fetching models:', error));
        }
        getModels();
    }, []);

    return (
        <Select>
            <SelectTrigger>
                <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
                {models.map(model => (
                    <SelectItem key={model.digest} value={model.name}>
                        {model.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}

export default ModelSelector;
