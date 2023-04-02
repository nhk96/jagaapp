import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionSummary, Typography } from "@mui/material";
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

const IndividualAccordianHandler = ({
  data,
  style,
  showAll,
  setData,

  parentId,
}) => {
  console.log(data);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(showAll);
  }, [showAll]);

  const generateId = (parentTitles, title) => {
    const parentIds = parentTitles.map((t) => t.replace(/\s+/g, ""));
    return `${parentIds.join("-")}-${title.replace(/\s+/g, "-")}`;
  };

  return (
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
            <div onClick={() => {}}>
              <Typography>{data.title}</Typography>
              <Description>{data.description}</Description>
            </div>
          </AccordianContent>
        </AccordionSummary>
      ) : (
        <AccordianContent style={style} className="Mui-expanded">
          <MuiExpanded
            onClick={() => {}}
            id={parentId && generateId(parentId, data.title)}
          >
            <Typography>{data.title}</Typography>
            <Description>{data.description}</Description>
          </MuiExpanded>
        </AccordianContent>
      )}

      <div>
        {
          // if data got items, then render the accordion again, repeat again if there is item inside item
          data.items && (
            <TheAccordian
              showAll={showAll}
              data={data.items}
              style={{ paddingLeft: 20 }}
              parentId={parentId ? [...parentId, data.title] : [data.title]}
            ></TheAccordian>
          )
        }
      </div>
    </Accordion>
  );
};

const TheAccordian = ({
  data,
  style,
  showAll,
  setData,

  parentId,
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
      />
    );
  });
};

export default TheAccordian;
