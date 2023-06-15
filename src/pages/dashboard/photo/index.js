import React, { useEffect, useState } from "react";

import Main from "@/components/layout/main";
import TableComponent from "@/components/table";
import useApi from "@/pages/api/libs/useApi";
import { getMessage } from "@/pages/api/endpoint/messages";

import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";


const columns = [
  {
    label: "No",
    value: "no",
    align: "left"
  },
  {
    label: "Message",
    value: "message",
    align: "left"
  },
  {
    label: "Action",
    value: "action",
    align: "center"
  }
]

export default function PhotoIndex() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRow, setTotalRow] = useState(15);
  const router = useRouter();

  const messageAPI = useApi(getMessage);

  const loadData = () => {
    messageAPI.request({ isActive: 1, perPage: rowsPerPage, page: 1 })
  }

  const renderTable = (type, value, data, key) => {
    switch (type) {
      case "no":
        value = key + 1
        break;
      case "action":
        value = (
          <Stack direction={"row"} spacing={2} alignItems={"end"} justifyContent={"center"}>
            <Button variant="contained" color="secondary">Edit</Button>
            <Button variant="contained" color="error">Delete</Button>
          </Stack>
        )
        break;

      default:
        value = value
        break;
    }
    return value;
  }

  const handleChangePage = (event, newPage) => {
    messageAPI.request({ isActive: 1, perPage: rowsPerPage, page: newPage + 1 })
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    messageAPI.request({ isActive: 1, perPage: +event.target.value, page: 1 })
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    loadData();
    return () => {
      messageAPI.reset();
    }
  }, [])

  useEffect(() => {
    if (messageAPI.status) {
      setData(messageAPI.data)
      setTotalRow(messageAPI.meta.total)
    }
  }, [messageAPI.status, messageAPI.data])

  return (
    <Main>
      <Container maxWidth={"xl"}>
        <Grid container alignItems={"center"} sx={{ mb: 3 }}>
          <Grid item xs={6} md={6} lg={6}>
            <Typography variant="h5">Data Photo</Typography>
          </Grid>
          <Grid item xs={6} md={6} lg={6} textAlign={"end"}>
            <Button variant="contained" onClick={(e) => router.push('/dashboard/photo/create')}>Create</Button>
          </Grid>
        </Grid>
        <Grid container alignItems={"center"} sx={{ mb: 3 }} justifyContent={"flex-end"}>
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
  )
}