import React from "react";
import { NavLink } from "react-router-dom";
import { Grid, ListItem, ListItemText, makeStyles } from "@material-ui/core";

export default function MenuOption({ children, label, path }) {
  const classes = useStyles();

  const CustomLink = React.useMemo(
    () =>
      React.forwardRef((linkProps, ref) => (
        <NavLink ref={ref} to={path} {...linkProps} />
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
    justifyContent: "center",
    borderRadius: "10px",
    "&.active": {
      background: "rgba(255,255,255,0.1)",
      border: "1px solid rgba(255,255,255,0.25)",
    },
  },
}));