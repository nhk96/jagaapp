import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionSummary, Typography } from "@mui/material";
import React, { useState } from "react";

import { hardcoded } from "../../utils/hardcoded";

import TheAccordian from "../../components/TheAccordian";
import ListItemInput from "../../components/ListItemInput";
import styled from "styled-components";

const TheForm = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: calc(100vh - 50px);
  position: relative;

  > div:first-child {
    padding: 10px;
  }

  > div:nth-child(2) {
    padding: 10px;
    border-left: 1px solid rgba(0, 0, 0, 0.1);
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

const AnswerView = () => {
  const [data, setData] = useState(hardcoded.exampleData);

  const setNewData = (newData) => {
    setData(newData);
  };

  return (
    <TheForm>
      <div>
        <ListItemInput data={data} setNewData={setNewData} />
      </div>
      <AccordianParts>
        <TheAccordian data={data}></TheAccordian>
      </AccordianParts>
    </TheForm>
  );
};

export default AnswerView;
