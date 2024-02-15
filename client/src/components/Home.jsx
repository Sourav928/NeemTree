import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import styled from "@emotion/styled";
import CloseIcon from "@mui/icons-material/Close";
import UploadIcon from "@mui/icons-material/Upload";
import Dropzone from "react-dropzone";
import { uploadData } from "../service/api";

const Container = styled(Box)`
  border: 1px solid black;
  padding: 0;
  width: 90%;
  margin: 0 auto;
`;

const Main = styled(Box)`
  width: 80%;
  margin: 0 auto;
`;

const StyledBox = styled(Box)`
  background: #f1b424;
`;

const StyledHead = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px;
  margin-top: 0;
  margin-bottom: 20px;
`;

const DropContainer = styled("section")({
  backgroundColor: "#f2f2f2",
  padding: "40px",
  borderRadius: "5px",
  margin: "10px",
});

const DropArea = styled("div")({
  border: "2px dashed #cdcdcd",
  padding: "40px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const Upload = styled(UploadIcon)`
  background: #000;
  color: #fff;
  borderradius: 50%;
`;

const Tagline = styled(Typography)`
  margin: 10px;
  padding: 10px;
`;

const Home = () => {
  const [file, setFile] = useState([]);
  const [status, setStatus] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async () => {
    const formData = new FormData();
    const data = file[0];
    formData.append("file", data);
    const res = await uploadData(formData);
    if (res.isSuccess) {
      setStatus(true);
      setFile([]);
    } else {
      setError(true);
    }
  };

  const handleFile = (acceptedFiles) => {
    setFile(acceptedFiles);
  };

  const timeDuration = 1 * 60 * 1000;
  const timeOut = () => {
    setStatus(false);
    setError(false);
  };
  setTimeout(timeOut, timeDuration);

  return (
    <>
      <Container>
        <StyledBox>
          <StyledHead>
            <h3>Add from Excel</h3>
            <CloseIcon fontSize="large" />
          </StyledHead>
        </StyledBox>
        <Main>
          <Typography>Add Candiates to Database</Typography>
          <Dropzone onDrop={(e) => handleFile(e)} noClick={file.length !== 0}>
            {({ getRootProps, getInputProps }) => (
              <DropContainer>
                <DropArea {...getRootProps()}>
                  <input {...getInputProps()} />

                  {file.length === 0 && status === false ? (
                    <>
                      <Upload />
                      <Tagline>Upload a .xlsx or .xls file here</Tagline>
                    </>
                  ) : status === false ? (
                    <>
                      <Upload />
                      <Tagline> {file[0].name}</Tagline>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={handleSubmit}
                      >
                        Submit
                      </Button>
                    </>
                  ) : error === false ? (
                    <>
                      <h3 style={{ color: "green" }}>Thank You!</h3>
                      <p>✔️ File Succesfully Uploaded.</p>
                      <p>Your records will be processed shortly.</p>
                    </>
                  ) : (
                    <>
                      <p style={{ color: "red" }}>
                        Error while proccesing the data
                      </p>
                    </>
                  )}
                </DropArea>
              </DropContainer>
            )}
          </Dropzone>
        </Main>
      </Container>
    </>
  );
};

export default Home;
