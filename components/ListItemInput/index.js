import { Add } from "@mui/icons-material";
import { Button, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";

const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const TheSubItemContainer = ({ parent, data }) => {
  const [subitem, setSubitem] = useState([]);
  return (
    <div>
      <p>{parent}</p>
      <TextField label="Title" variant="outlined" />
    </div>
  );
};

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
        <ButtonContainer>
          <Button variant="outlined" onClick={() => {}}>
            Add subitem?
          </Button>
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
            }}
          >
            Add
          </Button>
        </ButtonContainer>
      </InputSection>
    </div>
  );
};

export default ListItemInput;
