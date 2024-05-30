import { useState } from "react";
import { cloneDeep } from "lodash";
import Grid, { toHeaderId, toHeaders } from "./grid/Grid";
import { probeCall } from "@reactivity-comparison/pivoting";

const initialLines = [
  {
    headers: toHeaders({
      Country: "France",
      Town: "Mende",
      Product: "A",
    }),
    value: 1,
  },
  {
    headers: toHeaders({
      Country: "France",
      Town: "Mende",
      Product: "B",
    }),
    value: 2,
  },
  {
    headers: toHeaders({
      Country: "France",
      Town: "Lyon",
      Product: "B",
    }),
    value: 3,
  },
  {
    headers: toHeaders({
      Country: "United-States",
      Town: "New-York",
      Product: "A",
    }),
    value: 4,
  },
  {
    headers: toHeaders({
      Country: "United-States",
      Town: "New-York",
      Product: "C",
    }),
    value: 5,
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
      <div style={{ position: "relative" }}>
        <Grid
          lines={lines}
          rowHeaderIds={[toHeaderId("Country"), toHeaderId("Town")]}
          columnHeaderIds={[toHeaderId("Product")]}
        ></Grid>
      </div>
    </div>
  );
}
