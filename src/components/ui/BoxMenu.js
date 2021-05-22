import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import StarOutlineOutlinedIcon from '@material-ui/icons/StarOutlineOutlined';

export default function BoxMenu({ data }) {
  const classes = useStyle();

  return (
    <Grid item className={classes.boxMenu}>
      <Grid container>
        <Grid item>
          <StarOutlineOutlinedIcon />
        </Grid>
      </Grid>
    </Grid>
  );
}

const useStyle = makeStyles(theme => ({
  boxMenu: {
    marginLeft: "auto"
  }
}))