import React from "react";
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';

const hsrLogo = require("../../images/hsr.png");
const goLogo = require("../../images/go.svg");
const burlLogo = require("../../images/burl.png");

export default function Logo({ agencyId }) {
  if (!agencyId) return (<DirectionsBusIcon />)
  let logo;
  switch (agencyId.toLowerCase()) {
    case "hsr":
      logo = hsrLogo;
      break;
    case "go":
      logo = goLogo;
      break;
    case "burlington":
      logo = burlLogo;
      break;
    default:
      break;
  }
  return (
    <img src={logo.default} alt="Agency logo" width="32px" />
  );
}