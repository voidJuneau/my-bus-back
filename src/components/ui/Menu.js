import React from 'react';
import { AppBar, Button, Container, IconButton, List, ListItem, ListItemText, makeStyles, 
  Toolbar, Typography } from '@material-ui/core';
import { Home, MenuIcon } from '@material-ui/icons'; 
import MenuOption from './MenuOption';
import StarOutlineOutlinedIcon from '@material-ui/icons/StarOutlineOutlined';

const navLinks = [
    { title: `about us`, path: `/about-us` },
    { title: `product`, path: `/product` },
    { title: `blog`, path: `/blog` },
    { title: `contact`, path: `/contact` },
    { title: `faq`, path: `/faq` },
  ]

export default function Menu() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Container className={classes.navbarDisplayFlex}>
            <IconButton edge="start" color="inherit" aria-label="home">
              <Home fontSize="large" />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Show My Bus
            </Typography>
            <MenuOption label="star">
              <StarOutlineOutlinedIcon />
            </MenuOption>
            <List 
              component="nav" 
              aria-labelledby="main navigation"
              className={classes.navDisplayFlex} >
              {navLinks.map(({ title, path }) => (
                <a href={path} key={title} className={classes.linkA}>
                  <ListItem button>
                    <ListItemText primary={title} className={classes.linkText} />
                  </ListItem>
                </a>
              ))}
            </List>
          </Container>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  navbarDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    alignSelf: "center"
  },
  navDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: `white`
  },
  linkA: {
    textDecoration: "none"
  }
}));