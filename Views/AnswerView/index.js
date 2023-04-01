import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionSummary,
  Radio,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { hardcoded } from "../../utils/hardcoded";

import TheAccordian from "../../components/TheAccordian";
import ListItemInput from "../../components/ListItemInput";
import styled from "styled-components";

const TheForm = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: calc(100vh - ${({ tabheight }) => tabheight + 2}px)};
  position: relative;

  > div:first-child {
    padding: 10px;
  }

  > div:nth-child(2) {
  
    border-left: 1px solid rgba(0, 0, 0, 0.1);
  }

 
  @media (max-width: 600px) {
    grid-template-columns: 1fr;

    > div:first-child {
      min-height: 100vh;
    }

    // point to div inside div inside div
  

    > div div:nth-child(2) {
      min-height: 100vh;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
    }
  }


`;

const AccordianParts = styled.div`
  .MuiAccordion-root {
    box-shadow: none;
  }

  .MuiAccordion-root:before {
    background: none;
  }
`;

const InputForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const GlobalRadioButtonContainer = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const InputWhenContainSubItem = ({
  parent,
  addNewData,
  addNewSubItem,
  addNewSubItemInsideSubitem,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  return (
    <InputForm>
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
        <button
          onClick={() => {
            addNewSubItemInsideSubitem(parent, title, {
              title: title,
              description: description,
            });
          }}
        >
          Add Sub Item
        </button>

        <button
          onClick={() => {
            addNewSubItem(parent, {
              title: title,
              description: description,
            });
          }}
        >
          Add
        </button>
      </ButtonContainer>
    </InputForm>
  );
};

const InputParts = ({
  data,
  addNewData,
  addNewSubItem,
  addNewSubItemInsideSubitem,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [containsubitem, setContainsubitem] = useState(false);
  return (
    <InputForm>
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
        <button
          onClick={() => {
            addNewData({
              title: title,
              description: description,
            });
          }}
        >
          Add
        </button>
        <button
          onClick={() => {
            addNewData({
              title: title,
              description: description,
              items: [],
            });

            setContainsubitem(true);
          }}
        >
          Add Sub Item
        </button>
      </ButtonContainer>
      {containsubitem && (
        <InputWhenContainSubItem
          data={data}
          parent={title}
          addNewData={addNewData}
          addNewSubItem={addNewSubItem}
          addNewSubItemInsideSubitem={addNewSubItemInsideSubitem}
        ></InputWhenContainSubItem>
      )}
    </InputForm>
  );
};

const AnswerView = ({ tabref }) => {
  const [data, setData] = useState(hardcoded.exampleData);

  const addNewData = (newData) => {
    //if newData.title is existed, then don't add
    const isExisted = data.find((item) => item.title === newData.title);
    if (isExisted) {
      alert("Existed");
      return;
    }

    setData([...data, newData]);
  };

  const addNewSubItem = (parent, newSubItem) => {
    const newData = data.map((item) => {
      if (item.title === parent) {
        if (item.items) {
          // if item.items.title is existed, then don't add
          const isExisted = item.items.find(
            (subItem) => subItem.title === newSubItem.title
          );
          if (isExisted) {
            alert("Existed");
            return item;
          }

          return {
            ...item,
            items: [...item.items, newSubItem],
          };
        }
        return {
          ...item,
          items: [newSubItem],
        };
      }
      return item;
    });

    setData(newData);
  };

  const addNewSubItemInsideSubitem = (parent, subParent, newSubItem) => {
    const newData = data.map((item) => {
      if (item.title === parent) {
        if (item.items) {
          const newItems = item.items.map((subItem) => {
            if (subItem.title === subParent) {
              if (subItem.items) {
                // if subItem.items.title is existed, then don't add
                const isExisted = subItem.items.find(
                  (subSubItem) => subSubItem.title === newSubItem.title
                );
                if (isExisted) {
                  alert("Existed");
                  return subItem;
                }

                return {
                  ...subItem,
                  items: [...subItem.items, newSubItem],
                };
              }
              return {
                ...subItem,
                items: [newSubItem],
              };
            }
            return subItem;
          });

          return {
            ...item,
            items: newItems,
          };
        }
      }
      return item;
    });

    setData(newData);
  };

  const [showAll, setShowAll] = useState(false);

  return (
    <TheForm tabheight={tabref.current.offsetHeight}>
      <div>
        <InputParts
          data={data}
          addNewData={addNewData}
          addNewSubItem={addNewSubItem}
          addNewSubItemInsideSubitem={addNewSubItemInsideSubitem}
        ></InputParts>
      </div>
      <div>
        <GlobalRadioButtonContainer>
          <div>Show all</div>
          <Switch
            checked={showAll}
            onChange={() => setShowAll(!showAll)}
          ></Switch>
        </GlobalRadioButtonContainer>
        <AccordianParts>
          <TheAccordian data={data} showAll={showAll}></TheAccordian>
        </AccordianParts>
      </div>
    </TheForm>
  );
};

export default AnswerView;
