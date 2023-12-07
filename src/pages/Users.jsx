import React from "react";

// material ui
import { Delete, Edit } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

// third party libraries
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// project import
import CustomSnackbar from "../Components/Snackbar";
import Title from "../Components/Title";
import { failure } from "../redux/SnackbarSlice";
import { deleteUser } from "../redux/UsersSlice";

// ================= || USERS LIST TABLE PAGE || =============== //
const Users = ({ setUserId }) => {
  let navigate = useNavigate();
  const theme = useTheme();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Stack
        direction={matchDownSM ? "column" : "row"} // used for the dynamic css properties
        spacing={1}
        alignItems="center"
        justifyContent="space-between"
        sx={{ pb: 1 }}
      >
        <Title>Users List</Title>
        <Stack
          direction={matchDownSM ? "column" : "row"}
          spacing={1}
          alignItems="center"
          justifyContent="space-between"
          sx={{ pb: 1 }}
        >
          <Button
            variant="contained"
            onClick={() => {
              navigate("add-user");
              setUserId({
                id: "",
                username: "",
                email: "",
                role: "",
              });
            }}
          >
            Add User
          </Button>
        </Stack>
      </Stack>
      <TableContainer>
        <Table
          sx={{
            minWidth: 350,
            "& .nth-last-child(1)": {
              border: "none",
            },
          }}
          size="medium"
          aria-label="Users Table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Username</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Role</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow hover key={row.id}>
                  <TableCell align="center">{row.id}</TableCell>
                  <TableCell align="center">{row.username}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">{row.role}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Edit">
                      <IconButton
                        color="primary"
                        onClick={() => {
                          navigate("/add-user");
                          setUserId(row);
                        }}
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        color="error"
                        onClick={() => {
                          setId(row.id);
                          setOpen(true);
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[2, 10, 25, 100]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <Typography variant="h6">
            Do you really want to delete to delete the user?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button
            onClick={() => {
              dispatch(deleteUser(id));
              setOpen(false);
              setTimeout(() => {
                dispatch(failure("User has been deleted successfully"));
              }, 1000);
            }}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <CustomSnackbar />
    </>
  );
};

export default Users;
