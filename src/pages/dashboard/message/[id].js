import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Main from "@/components/layout/main";
import { getMessageByID, updatedMessage } from "@/pages/api/endpoint/messages";
import useApi from "@/pages/api/libs/useApi";

import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

export default function MessageEdit() {
  const messageAPI = useApi(getMessageByID);
  const updated = useApi(updatedMessage);
  const router = useRouter();

  const [id, setId] = useState(null);
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [maxLength, setMaxLength] = useState(255);
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    if (event.target.value.length >= maxLength + 1) {
      setError(true);
      setMessage(event.target.value);
    } else {
      setError(false);
      setMessage(event.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updated.request(id, { message, layout: [] });
  };

  useEffect(() => {
    if (router.query.id) {
      setId(router.query.id);
    }
  }, [router.query.id]);

  useEffect(() => {
    if (id) {
      messageAPI.request(id);
    }
  }, [id]);

  useEffect(() => {
    if (messageAPI.status) {
      setData(messageAPI.data);
      setMessage(messageAPI.data.message);
    }
  }, [messageAPI.status, messageAPI.data]);

  useEffect(() => {
    if (!updated.error) {
      if (updated.status) {
        if (updated.meta.statusCode === 200) {
          alert("succes updated message");
          updated.reset();
          router.replace("/dashboard/message");
        }
      }
    } else {
      alert(updated.error.response.data.meta.message[0]);
      updated.reset();
    }
  }, [updated.status, updated.meta, updated.error]);

  return (
    <Main>
      <Container maxWidth={"xl"}>
        <Grid container alignItems={"center"} sx={{ mb: 4 }}>
          <Grid item xs={6} md={6} lg={6}>
            <Typography variant="h5">Edit Data Message</Typography>
          </Grid>
        </Grid>
        <Grid container alignItems={"center"} sx={{ mb: 4 }}>
          <Grid item xs={12} md={12} lg={12}>
            <Box
              component="form"
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <div>
                <TextField
                  fullWidth
                  error={error}
                  id="outlined-multiline-static"
                  label="Message"
                  value={message}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  helperText={`${message.length}/${maxLength}`}
                />
              </div>
              <Button
                variant="contained"
                type="submit"
                disabled={error}
                sx={{ width: "80px" }}
              >
                Save
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Main>
  );
}
