import { FetchParams } from "../store/availableTimeSlice/fetchAvailableTimeIntervals";

type KeyT = keyof FetchParams;

const sortCallBack = (a: string | number, b: string | number) => {
  if (typeof a === "string" && typeof b === "string") {
    return a.localeCompare(b);
  }

  if (typeof a === "number" && typeof b === "number") {
    return a - b;
  }

  return 0;
};

export const compareArray = <T extends string | number>(a: T[], b: T[]) => {
  const aSorted = [...a].sort(sortCallBack);
  const bSorted = [...b].sort(sortCallBack);
  for (let i = 0; i < aSorted.length; i++) {
    if (aSorted[i] !== bSorted[i]) return false;
  }

  return true;
};

export const compareFetchParamsOfTimeInterfvals = (
  a: FetchParams,
  b: FetchParams
) => {
  for (const k in a) {
    const key = k as KeyT;

    if (
      (Array.isArray(a[key]) && !Array.isArray(b[key])) ||
      (!Array.isArray(a[key]) && Array.isArray(b[key]))
    ) {
      return false;
    }

    if (Array.isArray(a[key]) && Array.isArray(b[key])) {
      const aR = a[key] as string[];
      const bR = b[key] as string[];
      return compareArray<string>(aR, bR);
    }

    if (a[key] !== b[key]) {
      return false;
    }
  }

  return true;
};
