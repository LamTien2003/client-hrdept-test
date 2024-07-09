export const buildQueryString = (queryStringObj: any) => {
  for (const key in queryStringObj) {
    if (!queryStringObj[key] || queryStringObj[key] === "none") {
      delete queryStringObj[key];
    }
  }

  return new URLSearchParams(queryStringObj).toString();
};

export const convertToTitleCase = (snakeCase: string) => {
  return snakeCase
    .split("_")
    .filter(x => x.length > 0)
    .map(x => x.charAt(0).toUpperCase() + x.slice(1))
    .join(" ");
};
