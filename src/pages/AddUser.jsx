import React from "react";

// material ui
import {
  Alert,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";

// third party libraries
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Title from "../Components/Title";
import { addUser, editUser } from "../redux/UsersSlice";

const AddUser = ({ id, username, email, role }) => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  console.log(
    "userId",
    { id, username, email, role },
    id === String(id),
    typeof id
  );
  return (
    <>
      <Formik
        initialValues={{
          username: username || "",
          email: email || "",
          role: role || "user",
        }}
        enableReinitialize={true}
        validationSchema={Yup.object().shape({
          username: Yup.string()
            .required("Username is required")
            .min(3, "Enter username of minimum 3 characters"),
          email: Yup.string()
            .email("Enter a valid Email ID")
            .required("Email ID is required"),
          role: Yup.string().required("Role is required"),
        })}
        onSubmit={(values) => {
          // console.log(values);
          if (Boolean(id)) {
            dispatch(
              editUser({
                id: String(id),
                username: values.username,
                email: values.email,
                role: values.role,
              })
            );
          } else {
            dispatch(addUser(values));
          }
          navigate(-1);
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          touched,
          values,
          setFieldValue,
        }) => (
          <form
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            style={{
              padding: "40px",
              border: "#eeeeee",
              m: "20px",
              maxWidth: 500,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Snackbar
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                >
                  <Alert
                    onClose={handleClose}
                    severity="success"
                    sx={{ width: "100%" }}
                  >
                    You are successfully Registered!
                  </Alert>
                </Snackbar>
              </Grid>
              <Grid item xs={12}>
                <Title>{Boolean(id) ? "Edit User" : "Add User"}</Title>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Username</InputLabel>
                  <TextField
                    id="username"
                    name="username"
                    placeholder="Username"
                    fullWidth
                    value={values.username}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(
                      touched.username && errors.username && (
                        <FormHelperText error id="username-helper-text">
                          {errors.username}
                        </FormHelperText>
                      )
                    )}
                  />
                  {touched.username && errors.username && (
                    <FormHelperText error id="username-helper-text">
                      {errors.username}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Email</InputLabel>
                  <TextField
                    id="email"
                    name="email"
                    placeholder="Email ID"
                    fullWidth
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(
                      touched.email && errors.email && (
                        <FormHelperText error id="email-helper-text">
                          {errors.email}
                        </FormHelperText>
                      )
                    )}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="email-helper-text">
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Role</InputLabel>
                  <FormControl fullWidth>
                    <InputLabel id="role-select-label">Role</InputLabel>
                    <Select
                      labelId="role-select-label"
                      id="role-select"
                      name="role"
                      value={values.role}
                      label="Role"
                      onChange={handleChange}
                    >
                      <MenuItem value="user">User</MenuItem>
                      <MenuItem value="admin">Admin</MenuItem>
                    </Select>
                  </FormControl>
                  {touched.role && errors.role && (
                    <FormHelperText error id="role-helper-text">
                      {errors.role}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid
                item
                xs={12}
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => navigate("/")}
                  sx={{ mr: "18px" }}
                >
                  Back
                </Button>
                <Button variant="contained" type="submit" color="primary">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AddUser;
