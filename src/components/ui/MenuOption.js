import React from "react";
import { Link } from "react-router-dom";
import { Grid, ListItem, ListItemText, makeStyles } from "@material-ui/core";

export default function MenuOption({ children, label, path }) {
  const classes = useStyles();

  const CustomLink = React.useMemo(
    () =>
      React.forwardRef((linkProps, ref) => (
        <Link ref={ref} to={path} {...linkProps} />
      )),
    [path],
  );

  return (
    <ListItem button dense
      component={CustomLink}
      className={classes.listItem}>
      <Grid container direction="column">
        <Grid item>
          {children}
        </Grid>
        <Grid item>
          <ListItemText>
            {label}
          </ListItemText>
        </Grid>
      </Grid>
    </ListItem>
  );
}

const useStyles = makeStyles(theme => ({
  listItem: {
    textAlign: "center",
    paddingLeft: "8px",
    paddingRight: "8px",
    justifyContent: "center"
  }
}));