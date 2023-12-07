// material ui
import { Delete, Edit } from "@mui/icons-material";
import {
  Button,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

// third party libraries
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Title from "../Components/Title";
import { deleteUser } from "../redux/UsersSlice";

// ================= || USERS LIST TABLE PAGE || =============== //
const Users = ({ setUserId }) => {
  let navigate = useNavigate();
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));
  const users = useSelector((state) => state.users.users);
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();

  console.log(users, user, "users");
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
            {users.map((row, index) => (
              <TableRow hover key={index}>
                <TableCell align="center">{row.id}</TableCell>
                <TableCell align="center">{row.username}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.role}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Edit">
                    <IconButton
                      color="primary"
                      onClick={() => {
                        setUserId(row);
                      }}
                    >
                      <Link
                        to={{
                          pathname: "/add-user",
                          state: {
                            data: {
                              id: "1",
                            },
                          },
                        }}
                      >
                        <Edit />
                      </Link>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      color="error"
                      onClick={() => dispatch(deleteUser(row.id))}
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
    </>
  );
};

export default Users;
