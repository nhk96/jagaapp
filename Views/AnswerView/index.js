import { Close, ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionSummary,
  Alert,
  Button,
  Dialog,
  IconButton,
  Radio,
  Snackbar,
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
      min-height: 10vh;
    }
  

    >  div:nth-child(2) {
  
      border-top: 1px solid rgba(0, 0, 0, 0.1);
    }
  }


`;

const AccordianParts = styled.div`
  position: relative;
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

const Title = styled.div`
  font-weight: bold;

  span {
    font-weight: 200;
  }
`;

const Tips = styled.div`
  font-style: italic;
  opacity: 0.6;
  font-weight: 400;
  font-size: 12px;
  padding-top: 20px;
`;

const InputParts = ({ data, addNewData, addNewSubItem }) => {
  const [title, setTitle] = useState("");

  const [scene, setScene] = useState("primary");
  const [parent, setParent] = useState("");

  const PrimaryScene = ({ addNewData }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    //variable that check if the title exist in data
    const titleExist = data.find((item) => item.title === title);
    return (
      <InputForm>
        <Title>Add new item</Title>
        <TextField
          label="Title *"
          variant="filled"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Description"
          variant="filled"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <ButtonContainer>
          {!titleExist && (
            <Button
              variant="contained"
              disabled={title === ""}
              onClick={() => {
                addNewData({
                  title: title,
                  description: description,
                });
              }}
            >
              Add
            </Button>
          )}

          {title && titleExist && (
            <Button
              variant="contained"
              onClick={() => {
                addNewData({
                  title: title,
                  description: description,
                  items: [],
                });
                setParent(title);
                setScene("secondary");
              }}
            >
              Add Sub Item
            </Button>
          )}
        </ButtonContainer>
      </InputForm>
    );
  };

  const SecondaryScane = ({ addNewSubItem }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    return (
      <InputForm>
        <Title>
          {parent} <span> {"›"} add child</span>
        </Title>
        <TextField
          label="Title"
          variant="filled"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Description"
          variant="filled"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <ButtonContainer>
          <Button variant="text" onClick={() => setScene("primary")}>
            Back
          </Button>
          <Button
            variant="contained"
            disabled={title === ""}
            onClick={() => {
              //check if title empty
              if (title) {
                //param is parent, subitems
                addNewSubItem(parent, {
                  title: title,
                  description: description,
                });
              }
            }}
          >
            Add
          </Button>
        </ButtonContainer>
      </InputForm>
    );
  };

  const switchScene = (e) => {
    switch (e) {
      case "primary":
        return (
          <PrimaryScene
            data={data}
            addNewData={addNewData}
            addNewSubItem={addNewSubItem}
          ></PrimaryScene>
        );

      case "secondary":
        return (
          <SecondaryScane
            data={data}
            parent={title}
            addNewData={addNewData}
            addNewSubItem={addNewSubItem}
          ></SecondaryScane>
        );

      default:
        break;
    }
  };

  return <InputForm>{switchScene(scene)}</InputForm>;
};

const AnswerView = ({ tabref }) => {
  const [data, setData] = useState(hardcoded.exampleData);

  const addNewData = (newData) => {
    //if newData.title is existed, then don't add
    const isExisted = data.find((item) => item.title === newData.title);
    if (isExisted) {
      return;
    }

    setData([...data, newData]);
  };

  //add new subitem to parent
  const addNewSubItem = (parent, newData) => {
    const newDataWithSubItem = data.map((item) => {
      if (item.title === parent) {
        if (item.items) {
          // if item.items.title is existed, then don't add
          const isExisted = item.items.find(
            (subItem) => subItem.title === newData.title
          );
          if (isExisted) {
            setOpenSnackbar(true);
            return item;
          }

          return {
            ...item,
            items: [...item.items, newData],
          };
        } else {
          return {
            ...item,
            items: [newData],
          };
        }
      } else {
        return item;
      }
    });

    setData(newDataWithSubItem);
  };

  const deleteItem = (title) => {
    let newData = [...data];
    newData = deleteItemHelper(title, newData);
    setData(newData);
  };

  const deleteItemHelper = (title, items) => {
    return items.reduce((acc, item) => {
      if (item.title === title) {
        if (item.items && item.items.length) {
          // if the item has children, replace it with its first child
          acc.push(
            item.items[0],
            ...deleteItemHelper(title, item.items.slice(1))
          );
        }
      } else {
        if (item.items && item.items.length) {
          // if the item has children, recursively call deleteItemHelper
          item.items = deleteItemHelper(title, item.items);
        }
        acc.push(item);
      }
      return acc;
    }, []);
  };

  //write update function here
  function updateItem(title, newTitle, newDescription) {
    let newData = [...data];
    newData = updateItemHelper(title, newTitle, newDescription, newData);
    setData(newData);
  }

  function updateItemHelper(title, newTitle, newDescription, items) {
    return items.map((item) => {
      if (item.title === title) {
        return {
          ...item,
          title: newTitle,
          description: newDescription,
        };
      } else {
        if (item.items && item.items.length) {
          // if the item has children, recursively call updateItemHelper
          item.items = updateItemHelper(
            title,
            newTitle,
            newDescription,
            item.items
          );
        }
        return item;
      }
    });
  }

  const [showAll, setShowAll] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  return (
    <TheForm tabheight={tabref.current.offsetHeight}>
      <div>
        <InputParts
          data={data}
          addNewData={addNewData}
          addNewSubItem={addNewSubItem}
        ></InputParts>
        <Tips>
          <a href="https://github.com/nhk96/jagaapp">
            Source code available here.
          </a>
          <br></br>* To add subitem, please enter the name of the parent.
          <br></br>* Due to time constaint, there are a few requirements that I
          cannot fullfill.
          <br></br> * Please click on the parent or child title to perform
          actions.
          <br></br> - This should be able to create parent and child list item
          <br></br> - This should be able to open and close any parent list view
          individually
          <br></br> - This should be able to open/close all list with 1 button
          <br></br> - This should be able to delete any children
          <br></br> - This should be able to edit any parent or children
        </Tips>
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
          <TheAccordian
            data={data}
            showAll={showAll}
            deleteItem={deleteItem}
            updateItem={updateItem}
          />
        </AccordianParts>
      </div>
      <Snackbar
        open={openSnackbar}
        message="Existed"
        severity="warning"
        autoHideDuration={6000}
        onClose={() => {
          setOpenSnackbar(false);
        }}
      >
        <Alert severity="warning" sx={{ width: "100%" }}>
          Existed
        </Alert>
      </Snackbar>
    </TheForm>
  );
};

export default AnswerView;
