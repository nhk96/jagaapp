import { useRef, useState } from "react";
import Head from "next/head";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Paper from "@mui/material/Paper";
import { Divider } from "@mui/material";
import AnswerView from "../AnswerView";
import { hardcoded } from "../../utils/hardcoded";

function Test1() {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabref = useRef();

  return (
    <Box>
      <Head>
        <title>Test 1</title>
      </Head>

      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            ref={tabref}
          >
            <Tab label="Question" value="1" />
            <Tab label="Answer" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Stack spacing={2}>
            <Typography variant="h5">
              <u>
                <b>Create a Tree View List View</b>
              </u>
            </Typography>
            <Box>
              <Paper sx={{ padding: 1, mb: 2 }}>
                <Typography variant="h6">What the app can do</Typography>
                <ul>
                  <li>Able to create parent and children list item</li>
                  <li>Able to create unlimited nested object</li>
                  <li>
                    Able to open and close any parent list view individually
                  </li>
                  <li>Able to open/close all list with 1 button</li>
                  <li>Can edit any parent/children name & description</li>
                  <li>Can remove any children</li>
                  <li>
                    Can remove any parent but prompt user two option
                    <ul>
                      <li>
                        Remove entire parent and its nested object. Example:
                        remove the <b>Book a restaurant</b>.
                        <pre>
                          {JSON.stringify(hardcoded.exampleData2, null, 2)}
                        </pre>
                      </li>
                      <li>
                        remove the parent object only, remain its nested object.
                        Example: remove the <b>Book a restaurant</b>.
                      </li>
                      <pre>
                        {JSON.stringify(hardcoded.exampleDat3, null, 2)}
                      </pre>
                    </ul>
                  </li>
                  <li>
                    Can reorder any parent/children position *if can use drag &
                    drop that will be a bonus
                  </li>
                </ul>
              </Paper>
              <Paper sx={{ padding: 1, mb: 1 }}>
                <Typography variant="h6">Design Structure Example</Typography>
                <pre>{JSON.stringify(hardcoded.exampleData, null, 2)}</pre>
              </Paper>
              <Paper sx={{ padding: 1 }}>
                <Typography variant="h6">Example View</Typography>
                <Box component="img" src="/example1.png" width={500} />{" "}
              </Paper>
            </Box>
          </Stack>
        </TabPanel>
        <TabPanel value="2" style={{ padding: 0 }}>
          <AnswerView tabref={tabref} />
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default Test1;
