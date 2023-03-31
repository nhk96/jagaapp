import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionSummary, Typography } from "@mui/material";
import React, { useState } from "react";

import { hardcoded } from "../../utils/hardcoded";

import TheAccordian from "../../components/TheAccordian";
import ListItemInput from "../../components/ListItemInput";

const AnswerView = () => {
  const [data, setData] = useState(hardcoded.exampleData);

  const setNewData = (newData) => {
    setData(newData);
  };

  return (
    <div id="theform">
      <div>
        <ListItemInput data={data} setNewData={setNewData} />
      </div>
      <div>
        <TheAccordian data={data}></TheAccordian>
      </div>
    </div>
  );
};

export default AnswerView;
