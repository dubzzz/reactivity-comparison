import { cloneDeep } from "lodash";
import Grid, { toHeaderId, toHeaders } from "./grid/Grid";
import { probeCall } from "@reactivity-comparison/pivoting";
import { usePipe } from "./observables/usePipe";
import { readSync } from "./observables/readSync";

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
  const [linesSubject, setLines] = usePipe(initialLines);

  return (
    <div>
      <div>
        <button
          onClick={() => {
            setLines(cloneDeep(readSync(linesSubject)));
          }}
        >
          Refresh data
        </button>
        <button
          onClick={() => {
            const lines = readSync(linesSubject);
            setLines([
              { ...lines[0], value: lines[0].value + 1 },
              ...lines.slice(1),
            ]);
          }}
        >
          Update one cell
        </button>
        <button
          onClick={() => {
            const lines = readSync(linesSubject);
            setLines([
              ...lines.slice(0, 4),
              {
                headers: toHeaders({
                  Country: "United-States",
                  Town: "Los Angeles",
                  Product: "ABCD"[Math.floor(Math.random() * 4)],
                }),
                value: Math.floor(Math.random() * 10),
              },
            ]);
          }}
        >
          Update one value
        </button>
      </div>
      <div style={{ position: "relative" }}>
        <Grid
          linesSubject={linesSubject}
          rowHeaderIds={[toHeaderId("Country"), toHeaderId("Town")]}
          columnHeaderIds={[toHeaderId("Product")]}
        ></Grid>
      </div>
    </div>
  );
}
