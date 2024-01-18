import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Editor from "@monaco-editor/react";

const TextEditor = () => {
    const { noteID } = useParams();
    const [value, setValue] = useState("");
    const socketRef = useRef(null);

    useEffect(() => {
        // Create and open the WebSocket connection when the component mounts
        socketRef.current = new WebSocket(`ws://localhost:8000/ws/${noteID.slice(1)}`);

        // Event handler when a message is received
        socketRef.current.onmessage = (event) => {
            console.log('WebSocket message received:', event.data);
            setValue(event.data);
        };

        // Event handler for WebSocket errors
        socketRef.current.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        // Event handler for WebSocket connection closures
        socketRef.current.onclose = (event) => {
            console.log('WebSocket connection closed:', event);
        };

        // Cleanup function to close the WebSocket connection when the component unmounts
        return () => {
            if (socketRef.current.readyState === WebSocket.OPEN) {
                socketRef.current.close();
            }
        };
    }, [noteID]);

    const handleChange = (newValue, e) => {
      setValue(newValue);
      socketRef.current.send(newValue);
      console.log(newValue);
    };

    return (
        <div style={{ height: "100vh", width: "100vw" }}>
            <Editor
                id="editor"
                value={value}
                onChange={handleChange}
                options={{ minimap: { enabled: false } }}
                theme="vs-dark"
                automaticLayout={true}
                scrollBeyondLastLine={false}
                scrollbar={{ alwaysConsumeMouseWheel: false }}
            />
        </div>
    );
};

export default TextEditor;