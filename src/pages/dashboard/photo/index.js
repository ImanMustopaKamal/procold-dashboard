import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Main from "@/components/layout/main";
import TableComponent from "@/components/table";
import useApi from "@/pages/api/libs/useApi";
import { getAllPhoto, selectedPhoto } from "@/pages/api/endpoint/photos";

import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";

const columns = [
  {
    label: "No",
    value: "no",
    align: "left",
  },
  {
    label: "Email",
    value: "email",
    align: "left",
  },
  {
    label: "Status",
    value: "statusTransaction",
    align: "left",
  },
  {
    label: "Showing Megatron",
    value: "isSelected",
    align: "left",
  },
  {
    label: "Photo",
    value: "photo.photoUrl",
    align: "center",
  },
  {
    label: "Frame Photo",
    value: "photo.photoFrameUrl",
    align: "center",
  },
  {
    label: "Action",
    value: "action",
    align: "center",
  },
];

export default function PhotoIndex() {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState(null);
  const [dimension, setDimension] = useState({
    width: 0,
    height: 0,
  });
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRow, setTotalRow] = useState(15);
  const router = useRouter();

  const photoAPI = useApi(getAllPhoto);
  const selectedAPI = useApi(selectedPhoto);

  const loadData = () => {
    photoAPI.request({ isSelected: 0, perPage: rowsPerPage, page: 1 });
  };

  const handleShow = (value, width, height, e) => {
    setDimension({
      width,
      height,
    });
    setUrl(value);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setUrl(null);
  };

  const handleSelected = (id, e) => {
    selectedAPI.request(id, { isSelected: 1 });
  };

  const removeSelected = (id, e) => {
    selectedAPI.request(id, { isSelected: 0 });
  };

  const renderTable = (type, value, data, key) => {
    switch (type) {
      case "no":
        value = ((page) * rowsPerPage) + (key + 1);
        break;
      case "photo.photoUrl":
        if (data.photo !== null) {
          value = (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={handleShow.bind(this, data.photo.photoUrl, 600, 400)}
            >
              <Image
                src={data.photo.photoUrl}
                width={80}
                height={53}
                alt="photourl"
                priority
              />
            </Box>
          );
        } else {
          value = "Photo not available";
        }
        break;
      case "photo.photoFrameUrl":
        if (data.photo !== null) {
          if (data.photo.photoFrameUrl !== "") {
            value = (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={handleShow.bind(
                  this,
                  data.photo.photoFrameUrl,
                  400,
                  600
                )}
              >
                <Image
                  src={data.photo.photoFrameUrl}
                  width={53}
                  height={80}
                  alt="photoFrameUrl"
                  priority
                />
              </Box>
            );
          } else {
            value = "Frame photo not available";
          }
        } else {
          value = "Frame photo not available";
        }
        break;
      case "isSelected":
        if (value) {
          value = <Chip label="true" color="success" />;
        } else {
          value = <Chip label="false" color="error" />;
        }
        break;
      case "action":
        value = (
          <Stack
            direction={"row"}
            spacing={2}
            alignItems={"end"}
            justifyContent={"center"}
          >
            {data.isSelected ? 
            <Button
              variant="contained"
              color="error"
              onClick={removeSelected.bind(this, data.id)}
            >
              Remove
            </Button>
            :
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSelected.bind(this, data.id)}
            >
              Selected
            </Button>
            }
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
    photoAPI.request({
      isSelected: 0,
      perPage: rowsPerPage,
      page: newPage + 1,
    });
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    photoAPI.request({ isSelected: 0, perPage: +event.target.value, page: 1 });
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    setLoaded(true)
  }, []);

  useEffect(() => {
    if(loaded) {
      loadData();
    }
    return () => {
      photoAPI.reset();
    };
  }, [loaded]);

  useEffect(() => {
    if (photoAPI.status) {
      setData(photoAPI.data);
      setTotalRow(photoAPI.meta.total);
    }
  }, [photoAPI.status, photoAPI.data]);

  useEffect(() => {
    if (!selectedAPI.error) {
      if (selectedAPI.status) {
        if (selectedAPI.meta.statusCode === 200) {
          alert("succes updated photo");
          selectedAPI.reset();
          photoAPI.request({
            isSelected: 0,
            perPage: rowsPerPage,
            page: page + 1,
          });
        }
      }
    } else {
      alert(selectedAPI.error.response.data.meta.message[0]);
      selectedAPI.reset();
    }
  }, [selectedAPI.status, selectedAPI.meta, selectedAPI.error]);

  return (
    <Main>
      <Container maxWidth={"xl"}>
        <Grid container alignItems={"center"} sx={{ mb: 3 }}>
          <Grid item xs={6} md={6} lg={6}>
            <Typography variant="h5">Data Photo</Typography>
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className="noselect"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: dimension.width,
            height: dimension.height,
          }}
        >
          <Image
            className="noselect"
            src={url}
            width={dimension.width}
            height={dimension.height}
            alt={"image"}
            priority
          />
        </Box>
      </Modal>
    </Main>
  );
}
