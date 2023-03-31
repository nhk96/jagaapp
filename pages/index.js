import Head from "next/head";
import { useState } from "react";
import { Box } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Test1 from "../Views/Test1";

export default function Home() {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Head>
        <title>React Interview Question</title>
      </Head>

      <Test1 />
    </Box>
  );
}
