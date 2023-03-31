import { Add } from "@mui/icons-material";
import { Button, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";

const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ListItemInput = ({ data, setNewData }) => {
  const [dataCopy, setDataCopy] = useState(data);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div>
      <InputSection>
        <TextField
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Description"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={() => {
            setDataCopy([
              ...dataCopy,
              {
                title: title,
                description: description,
              },
            ]);
            setNewData(dataCopy);
            setTitle("");
            setDescription("");
          }}
        >
          Add
        </Button>{" "}
        {dataCopy[0].items && (
          <Button
            variant="contained"
            onClick={() => {
              setDataCopy([
                ...dataCopy,
                {
                  title: title,
                  description: description,
                  items: [
                    {
                      title: "Subitem",
                      description: "Subitem Description",
                    },
                  ],
                },
              ]);
              setNewData(dataCopy);
              setTitle("");
              setDescription("");
            }}
          >
            Add with subitem
          </Button>
        )}
      </InputSection>
    </div>
  );
};

export default ListItemInput;
