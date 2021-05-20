import React from "react";
import { Grid, Typography } from "@material-ui/core";

export default function MenuOption({ label, children }) {
    return(
        <Grid Container>
            <Grid item>
                {children}
            </Grid>
            <Grid item>
                <Typography>
                    {label}
                </Typography>
            </Grid>
        </Grid>
    )
}