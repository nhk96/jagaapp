import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionSummary,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import styled from "styled-components";

const AccordianContent = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Description = styled(Typography)`
  display: flex;
  opacity: 0.6;
  font-weight: 400;
`;

const MuiExpanded = styled.div`
  min-height: 64px;
  user-select: none;
  padding: 0px 16px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`;

const UpdateScene = ({
  title,
  description,
  setTitle,
  setDescription,
  updateItem,
  data,
  resetEverything,
}) => {
  return (
    <>
      <DialogTitle>Update item</DialogTitle>
      <DialogContent>
        <TextField
          id="title"
          value={title}
          label="Title"
          variant="filled"
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <TextField
          margin="dense"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          label="Description"
          variant="filled"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            updateItem(data.title, title, description);
            resetEverything();
          }}
        >
          Save
        </Button>
        <Button
          onClick={() => {
            resetEverything();
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </>
  );
};

const IndividualAccordianHandler = ({
  data,
  style,
  showAll,
  deleteItem,
  parentId,
  updateItem,
}) => {
  const [open, setOpen] = useState(false);

  const [dialog, setDialog] = useState(false);
  const [dialogScene, setDialogScene] = useState("selectAction");

  const [title, setTitle] = useState(data.title);
  const [description, setDescription] = useState(data.description);

  function resetEverything() {
    setDialog(false);
    setDialogScene("selectAction");
    setTitle(data.title);
    setDescription(data.description);
  }

  const DefaultScene = () => {
    return (
      <>
        <DialogTitle>{"Please select an action"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            What do you want to do with this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setDialogScene("deleteScene");
            }}
          >
            Delete Item
          </Button>
          <Button
            onClick={() => {
              setDialogScene("updateItem");
            }}
          >
            Edit
          </Button>
          <Button
            onClick={() => {
              resetEverything();
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </>
    );
  };

  const DeleteScene = () => {
    return (
      <>
        <DialogTitle>Delete item</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want delete all or just the parent?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              deleteItem(data.title);
              resetEverything();
            }}
          >
            Delete All
          </Button>
          <Button
            onClick={() => {
              deleteItem(data.title, "deleteParent");
              resetEverything();
            }}
          >
            Delete this
          </Button>
        </DialogActions>
      </>
    );
  };

  const switchDialogScene = (scene) => {
    switch (scene) {
      case "selectAction":
        return <DefaultScene />;
      case "updateItem":
        return (
          <UpdateScene
            title={title}
            description={description}
            setTitle={setTitle}
            setDescription={setDescription}
            resetEverything={resetEverything}
            updateItem={updateItem}
            data={data}
          />
        );

      case "deleteScene":
        return <DeleteScene />;
      default:
        return <DefaultScene />;
    }
  };

  useEffect(() => {
    setOpen(showAll);
  }, [showAll]);

  const generateId = (parentTitles, title) => {
    const parentIds = parentTitles.map((t) => t.replace(/\s+/g, ""));
    return `${parentIds.join("-")}-${title.replace(/\s+/g, "-")}`;
  };

  return (
    <>
      <Accordion
        style={style}
        onChange={() =>
          data.items ? setOpen((prev) => !prev) : setOpen((prev) => !prev)
        }
        expanded={open}
      >
        {data.items ? (
          <AccordionSummary expandIcon={data.items ? <ExpandMore /> : ""}>
            <AccordianContent id={parentId && generateId(parentId, data.title)}>
              <div>
                <Typography
                  onClick={() => {
                    setDialog(true);
                  }}
                >
                  {data.title}
                </Typography>
                <Description>{data.description}</Description>
              </div>
            </AccordianContent>
          </AccordionSummary>
        ) : (
          <AccordianContent style={style} className="Mui-expanded">
            <MuiExpanded id={parentId && generateId(parentId, data.title)}>
              <Typography
                onClick={() => {
                  setDialog(true);
                }}
              >
                {data.title}
              </Typography>
              <Description>{data.description}</Description>
            </MuiExpanded>
          </AccordianContent>
        )}

        <Dialog
          open={dialog}
          onClose={() => {
            setDialog(false);
          }}
        >
          {switchDialogScene(dialogScene)}
        </Dialog>

        <div>
          {
            // if data got items, then render the accordion again, repeat again if there is item inside item
            data.items && (
              <TheAccordian
                showAll={showAll}
                data={data.items}
                style={{ paddingLeft: 20 }}
                parentId={parentId ? [...parentId, data.title] : [data.title]}
                deleteItem={deleteItem}
                updateItem={updateItem}
              ></TheAccordian>
            )
          }
        </div>
      </Accordion>
    </>
  );
};

const TheAccordian = ({
  data,
  style,
  showAll,
  setData,
  deleteItem,
  parentId,
  updateItem,
}) => {
  return data.map((data, index) => {
    return (
      <IndividualAccordianHandler
        data={data}
        style={style}
        showAll={showAll}
        key={index}
        setData={setData}
        parentId={parentId}
        deleteItem={deleteItem}
        updateItem={updateItem}
      />
    );
  });
};

export default TheAccordian;
