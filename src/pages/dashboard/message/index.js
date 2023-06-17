import React, { useEffect, useState } from "react";

import Main from "@/components/layout/main";
import TableComponent from "@/components/table";
import useApi from "@/pages/api/libs/useApi";
import { getMessage, deletedMessage } from "@/pages/api/endpoint/messages";

import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";

const columns = [
  {
    label: "No",
    value: "no",
    align: "left",
  },
  {
    label: "Message",
    value: "message",
    align: "left",
  },
  {
    label: "Action",
    value: "action",
    align: "center",
  },
];

export default function MessageIndex() {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRow, setTotalRow] = useState(10);
  const router = useRouter();

  const messageAPI = useApi(getMessage);
  const deleted = useApi(deletedMessage);

  const loadData = () => {
    messageAPI.request({ isActive: 1, perPage: rowsPerPage, page: 1 });
  };

  const handleDeleted = (id, e) => {
    const confirm = window.confirm("are you sure delete this message ?");
    if (confirm) {
      deleted.request(id);
    }
  };

  const renderTable = (type, value, data, key) => {
    switch (type) {
      case "no":
        value = ((page) * rowsPerPage) + (key + 1);
        // totalRow * page - totalRow + key + 1;
        break;
      case "action":
        value = (
          <Stack
            direction={"row"}
            spacing={2}
            alignItems={"end"}
            justifyContent={"center"}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={(e) => router.replace(`/dashboard/message/${data.id}`)}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleted.bind(this, data.id)}
            >
              Delete
            </Button>
          </Stack>
        );
        break;

      default:
        value = value;
        break;
    }
    return value;
  };

  const handleChangePage = (event, newPage) => {
    messageAPI.request({
      isActive: 1,
      perPage: rowsPerPage,
      page: newPage + 1,
    });
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    messageAPI.request({ isActive: 1, perPage: +event.target.value, page: 1 });
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      loadData();
    }
    return () => {
      messageAPI.reset();
    };
  }, [loaded]);

  useEffect(() => {
    if (messageAPI.status) {
      setData(messageAPI.data);
      setTotalRow(messageAPI.meta.total);
      console.log("messageAPI.meta.total: ", messageAPI.meta);
    }
  }, [messageAPI.status, messageAPI.data]);

  useEffect(() => {
    if (!deleted.error) {
      if (deleted.status) {
        if (deleted.meta.statusCode === 200) {
          alert("succes deleted message");
          deleted.reset();
          messageAPI.request({
            isActive: 1,
            perPage: rowsPerPage,
            page: page + 1,
          });
        }
      }
    } else {
      alert(deleted.error.response.data.meta.message[0]);
      deleted.reset();
    }
  }, [deleted.status, deleted.meta, deleted.error]);

  return (
    <Main>
      <Container maxWidth={"xl"}>
        <Grid container alignItems={"center"} sx={{ mb: 3 }}>
          <Grid item xs={6} md={6} lg={6}>
            <Typography variant="h5">Data Message</Typography>
          </Grid>
          <Grid item xs={6} md={6} lg={6} textAlign={"end"}>
            <Button
              variant="contained"
              onClick={(e) => router.push("/dashboard/message/create")}
            >
              Create
            </Button>
          </Grid>
        </Grid>
        <Grid
          container
          alignItems={"center"}
          sx={{ mb: 3 }}
          justifyContent={"flex-end"}
        >
          <TableComponent
            data={data}
            columns={columns}
            renderTable={renderTable}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            totalRow={totalRow}
          />
        </Grid>
      </Container>
    </Main>
  );
}
