import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { close } from "../redux/SnackbarSlice";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CustomSnackbar() {
  const { open, message, severity } = useSelector((state) => state.snackbar);
  const dispatch = useDispatch();

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => dispatch(close())}
      >
        <Alert
          onClose={() => dispatch(close())}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}

export default CustomSnackbar;
