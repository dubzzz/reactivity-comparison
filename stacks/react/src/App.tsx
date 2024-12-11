import { useState } from "react";
import { cloneDeep } from "lodash";
import Grid from "./grid/Grid";
import {
  probeCall,
  toHeaderId,
  toHeaders,
} from "@reactivity-comparison/pivoting";

const initialLines = [
  {
    headers: toHeaders({
      Year: "2020",
      Kind: "Sussex",
      Chicken: "Bianca",
    }),
    value: 166,
  },
  {
    headers: toHeaders({
      Year: "2020",
      Kind: "Sussex",
      Chicken: "Bernard",
    }),
    value: 130,
  },
  {
    headers: toHeaders({
      Year: "2021",
      Kind: "Sussex",
      Chicken: "Bianca",
    }),
    value: 184,
  },
  {
    headers: toHeaders({
      Year: "2021",
      Kind: "Sussex",
      Chicken: "Bernard",
    }),
    value: 129,
  },
  {
    headers: toHeaders({
      Year: "2022",
      Kind: "Sussex",
      Chicken: "Bianca",
    }),
    value: 54,
  },
  {
    headers: toHeaders({
      Year: "2022",
      Kind: "Sussex",
      Chicken: "Bernard",
    }),
    value: 47,
  },
  {
    headers: toHeaders({
      Year: "2022",
      Kind: "Azur",
      Chicken: "Jasmine",
    }),
    value: 62,
  },
];

export default function App() {
  probeCall(App.name);
  const [lines, setLines] = useState(initialLines);

  return (
    <div>
      <div>
        <button
          onClick={() => {
            setLines(cloneDeep(lines));
          }}
        >
          Refresh data
        </button>
        <button
          onClick={() => {
            setLines([
              { ...lines[0], value: lines[0].value + 1 },
              ...lines.slice(1),
            ]);
          }}
        >
          Update one cell
        </button>
      </div>
      <div style={{ position: "relative", marginTop:"8px" }}>
        <Grid
          lines={lines}
          rowHeaderIds={[toHeaderId("Year")]}
          columnHeaderIds={[toHeaderId("Kind"),toHeaderId("Chicken")]}
        ></Grid>
      </div>
    </div>
  );
}
