import React from "react";
import { Grid } from "./Grid/GridExample";
import { Table } from "./Table/Table";

export function Body() {
  return (
    <div style={{ paddingLeft: "100px", paddingBottom: "30px" }}>
      <h1>Grid Elements</h1>
      <p>This was done using a grid layout</p>
      <Grid></Grid>

      <h1>Table Example</h1>
      <p>This is a table</p>

      <Table></Table>
    </div>
  );
}
