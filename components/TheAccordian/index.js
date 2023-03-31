import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionSummary, Typography } from "@mui/material";
import React, { useState } from "react";

import { hardcoded } from "../../utils/hardcoded";

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

const TheAccordian = ({ data, style }) => {
  return data.map((data, index) => {
    return (
      <Accordion key={index} style={style}>
        {data.items ? (
          <AccordionSummary expandIcon={data.items ? <ExpandMore /> : ""}>
            <AccordianContent>
              <div>
                <Typography>{data.title}</Typography>
                <Description>{data.description}</Description>
              </div>
            </AccordianContent>
          </AccordionSummary>
        ) : (
          <AccordianContent style={style} className="Mui-expanded">
            <MuiExpanded>
              <Typography>{data.title}</Typography>
              <Description>{data.description}</Description>
            </MuiExpanded>
          </AccordianContent>
        )}

        <div>
          {
            // if data got items, then render the accordian again, repeat again if there is item inside item
            data.items && (
              <TheAccordian
                data={data.items}
                style={{ paddingLeft: 20 }}
              ></TheAccordian>
            )
          }
        </div>
      </Accordion>
    );
  });
};

export default TheAccordian;
