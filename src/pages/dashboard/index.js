import Main from "@/components/layout/main";
import React, { useEffect, useState } from "react";

import { FormControl, FormControlLabel, FormGroup, FormLabel, Switch, Typography } from "@mui/material";
import useApi from "../api/libs/useApi";
import { getSetting, updateSetting } from "../api/endpoint/setting";

export default function DashboardPage() {
  const [checked, setChecked] = useState(false);
  const [ID, setID] = useState(false);

  const settingAPI = useApi(getSetting);
  const updateAPI = useApi(updateSetting);

  useEffect(() => {
    settingAPI.request()
  }, [])

  useEffect(() => {
    if (settingAPI.status) {
      settingAPI.data.map((element) => {
        if (element.ruleName === "unique email") {
          setChecked(element.isAllowed);
          setID(element.id)
        }
      });
    }
  }, [settingAPI.status, settingAPI.data])

  const handleChange = (e) => {
    updateAPI.request(ID, {})
    setChecked(!checked)
  }

  return (
    <Main>
      {/* <Typography paragraph>Dashboard Page</Typography> */}
      <FormControl component="fieldset" variant="standard">
        <FormLabel component="legend">Email Validation</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch checked={checked} onChange={handleChange} name="gilad" />
            }
            label={checked ? "active" : "inactive"}
          /></FormGroup>
      </FormControl>
    </Main>
  )
}