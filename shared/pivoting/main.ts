export function probeCall(probeName: string) {
  (window as any).probes = (window as any).probes ?? {};
  (window as any).probes[probeName] = (window as any).probes[probeName] ?? 0;
  (window as any).probes[probeName] += 1;

  const element = document.getElementById("probes");
  if (element !== null) {
    element.innerText = Object.entries((window as any).probes)
      .map(([k, v]) => `${k} => ${v}`)
      .join("\n");
  }
}

declare const validHeaderId: unique symbol; // Opaque type
export type HeaderId = string & { [validHeaderId]: true };

declare const validHeaderValue: unique symbol; // Opaque type
type HeaderValue = string & { [validHeaderValue]: true };

export type LineHeaders = Record<HeaderId, HeaderValue>;
type LineValue = number;
export type Line = { headers: LineHeaders; value: LineValue };

export type HeaderTree = {
  id: HeaderId;
  value: HeaderValue;
  children: HeaderTree[];
  offset: number;
  size: number;
};

export function last<T>(data: T[]): T {
  return data[data.length - 1]!;
}

export function buildHeaders(
  lines: Pick<Line, "headers">[],
  headerIds: HeaderId[],
  startOffset: number
): HeaderTree[] {
  probeCall(buildHeaders.name);

  // Terminal case, we can stop immediatelly as we have already built the whole tree
  if (headerIds.length === 0) {
    return [];
  }

  const [headerId, ...nextHeaderIds] = headerIds;

  // Classify lines based on the currently scanned header
  const bucketedLines = new Map<HeaderValue, typeof lines>();
  for (const line of lines) {
    const headerValueOnLine = line.headers[headerId!];
    if (headerValueOnLine === undefined) {
      continue;
    }
    const bucket = bucketedLines.get(headerValueOnLine) ?? [];
    bucket.push(line);
    bucketedLines.set(headerValueOnLine, bucket);
  }

  // Construct the tree
  let currentOffset = startOffset;
  const tree: HeaderTree[] = [];
  for (const [value, bucketLines] of bucketedLines) {
    const children = buildHeaders(bucketLines, nextHeaderIds, currentOffset);
    const finalOffset =
      children.length !== 0
        ? last(children).offset + last(children).size
        : currentOffset + 1;
    tree.push({
      id: headerId!,
      value,
      children,
      size: finalOffset - currentOffset,
      offset: currentOffset,
    });
    currentOffset = finalOffset;
  }

  return tree;
}

type GridDimensions = {
  columnsDepth: number; // headers
  rowsDepth: number; // headers
  dataColumnsCount: number;
  dataRowsCount: number;
};

function computeTreeDepth(tree: HeaderTree): number {
  if (tree.children.length === 0) {
    return 1;
  }
  return 1 + computeTreeDepth(tree.children[0]!);
}

export function computeGridDimensions(
  columnsTree: HeaderTree[],
  rowsTree: HeaderTree[]
): GridDimensions {
  probeCall(computeGridDimensions.name);

  return {
    columnsDepth: computeTreeDepth(columnsTree[0]!), // We consider we have at least one HeaderTree in the context of this POC
    rowsDepth: computeTreeDepth(rowsTree[0]!), // We consider we have at least one HeaderTree in the context of this POC
    dataColumnsCount: last(columnsTree).offset + last(columnsTree).size, // We consider we have at least one HeaderTree in the context of this POC
    dataRowsCount: last(rowsTree).offset + last(rowsTree).size, // We consider we have at least one HeaderTree in the context of this POC
  };
}

export type HeaderSpan = {
  backingTree: HeaderTree;
  parentSpan: HeaderSpan | undefined;
};
export type HeaderSpanLevel = HeaderSpan[];
export function extractHeaderSpans(
  trees: HeaderTree[],
  parentSpan: HeaderSpan | undefined = undefined
): HeaderSpanLevel[] {
  if (trees.length === 0) {
    return [];
  }

  const currentLevel: HeaderSpanLevel = [];
  const subLevels: HeaderSpanLevel[] = [];
  for (const tree of trees) {
    // Handling current level
    const span: HeaderSpan = {
      backingTree: tree,
      parentSpan,
    };
    currentLevel.push(span);

    // Handling sub-levels
    const subSpans = extractHeaderSpans(tree.children, parentSpan);
    for (
      let subSpanIndex = 0;
      subSpanIndex !== subSpans.length;
      ++subSpanIndex
    ) {
      const subSpan = subSpans[subSpanIndex]!;
      if (subLevels.length <= subSpanIndex) {
        subLevels.push(subSpan);
      } else {
        subLevels[subSpanIndex]!.push(...subSpan);
      }
    }
  }

  return [currentLevel, ...subLevels];
}

type PathEntry = { headerId: HeaderId; headerValue: HeaderValue };
export type Path = { entries: PathEntry[]; offset: number };

export function extractPathsFromSpans(spans: HeaderSpanLevel[]): Path[] {
  const mostGranularSpans = last(spans); // We make the assumptions that we always have at least one layer of headers
  return mostGranularSpans.map((span): Path => {
    const entries: PathEntry[] = [];
    let currentSpan: typeof span | undefined = span;
    while (currentSpan !== undefined) {
      entries.push({
        headerId: currentSpan.backingTree.id,
        headerValue: currentSpan.backingTree.value,
      });
      currentSpan = currentSpan.parentSpan;
    }
    return { entries, offset: span.backingTree.offset };
  });
}

export function computePaths(trees: HeaderTree[]): Path[] {
  probeCall(computePaths.name);

  const paths: Path[] = [];
  for (const tree of trees) {
    if (tree.children.length === 0) {
      paths.push({
        entries: [{ headerId: tree.id, headerValue: tree.value }],
        offset: tree.offset,
      });
    } else {
      const childPaths = computePaths(tree.children);
      for (const childPath of childPaths) {
        paths.push({
          entries: [
            ...childPath.entries,
            { headerId: tree.id, headerValue: tree.value },
          ],
          offset: childPath.offset,
        });
      }
    }
  }
  return paths;
}

export function filterLines(entries: PathEntry[], lines: Line[]): Line[] {
  probeCall(filterLines.name);

  return lines.filter((line) => {
    return entries.every((e) => line.headers[e.headerId] === e.headerValue);
  });
}

export function computeValue(entries: PathEntry[], lines: Line[]): number {
  probeCall(computeValue.name);

  let value = 0;
  for (const line of lines) {
    if (entries.every((e) => line.headers[e.headerId] === e.headerValue)) {
      value += line.value;
    }
  }
  return value;
}

export const cellSize = 128;
export const cellHeight = 32;

export function toHeaders(headers: Record<string, string>): LineHeaders {
  return headers as LineHeaders;
}

export function toHeaderId(headerId: string): HeaderId {
  return headerId as HeaderId;
}
