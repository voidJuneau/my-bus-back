import React from "react";
import { Card, Grid, Typography } from "@material-ui/core";

import CardMenu from "../../ui/CardMenu";
import Logo from "../../ui/Logo";

export default function StopHeaderCard({ line, setMarkers, setIsMap }) {

  return (
    <Grid container component={Card} alignItems="center" wrap="nowrap" spacing={1} >
      <Grid item >
        <Logo agencyId={line.agency_id} />
      </Grid>
      <Grid item container direction="column" >
        <Grid item container direction="row" spacing={1}>
          <Grid item>
            <Typography>
              {line.route_short_name}
            </Typography>
          </Grid>
          <Grid item>
            <Typography>
              {line.route_long_name}
            </Typography>
          </Grid>
        </Grid> {/* end of row */}
        <Grid item>
          <Typography>
            {`Opration Time: ${line.first} ~ ${line.last}`}
          </Typography>
        </Grid>
        <Grid item>
          <Typography>
            {`Frequency: ${line.min_gap} ~ ${line.max_gap}`}
          </Typography>
        </Grid>
      </Grid>
      <Grid item >
        <CardMenu type="lineHeader" data={line} setMarkers={setMarkers} setIsMap={setIsMap} />
      </Grid>
    </Grid>
  )
}

