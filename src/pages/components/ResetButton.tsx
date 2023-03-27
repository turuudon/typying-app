import Button from "@mui/material/Button"
import React, { FC } from "react"

type ResetButtonProps = {
  refreshAll: React.MouseEventHandler<HTMLButtonElement>
}

const ResetButton = (props: ResetButtonProps) => {
  return (
    <Button onClick={props.refreshAll} color="primary" variant="contained">
      リセット
    </Button>
  )
};

export default ResetButton;