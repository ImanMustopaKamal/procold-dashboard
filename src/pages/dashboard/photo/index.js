import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Main from "@/components/layout/main";
import TableComponent from "@/components/table";
import useApi from "@/pages/api/libs/useApi";
import { getAllPhoto } from "@/pages/api/endpoint/photos";

import { Button, Container, Grid, Stack, Typography } from "@mui/material";

const columns = [
  {
    label: "No",
    value: "no",
    align: "left"
  },
  {
    label: "Email",
    value: "email",
    align: "left"
  },
  {
    label: "Status",
    value: "statusTransaction",
    align: "left"
  },
  {
    label: "photo",
    value: "photo.photoUrl",
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

  const photoAPI = useApi(getAllPhoto);

  const loadData = () => {
    photoAPI.request({ isSelected: 0, perPage: rowsPerPage, page: 1 })
  }

  const renderTable = (type, value, data, key) => {
    // console.log("data: ", data)
    switch (type) {
      case "no":
        value = key + 1
        break;
      case "photo.photoUrl":
        if(data.photo !== null) {
          value = data.photo.photoUrl
        }
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
    photoAPI.request({ isSelected: 0, perPage: rowsPerPage, page: newPage + 1 })
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    photoAPI.request({ isSelected: 0, perPage: +event.target.value, page: 1 })
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    loadData();
    return () => {
      photoAPI.reset();
    }
  }, [])

  useEffect(() => {
    if (photoAPI.status) {
      setData(photoAPI.data)
      setTotalRow(photoAPI.meta.total)
    }
  }, [photoAPI.status, photoAPI.data])
  // console.log("data: ", data)
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