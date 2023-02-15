import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

function Alerts(props) {
  const [open, setOpen] = useState(true);
  return (
    props.alert && (
      <>
        <Collapse in={open}>
          <Alert
            severity={props.alert.type}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}>
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}>
            {props.alert.message}
          </Alert>
        </Collapse>
      </>
    )
  );
}

export default Alerts;
