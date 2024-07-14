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

export const downloadFile = async (response: BlobPart, fileName: string) => {
  if (!response) {
    return;
  }

  const url = window.URL.createObjectURL(new Blob([response]));
  const linkElement = document.createElement("a");
  linkElement.href = url;
  linkElement.setAttribute("download", `${fileName}.xlsx`);
  document.body.appendChild(linkElement);
  linkElement.click();

  const timerId = setTimeout(() => {
    document.body.removeChild(linkElement);
    window.URL.revokeObjectURL(url);
    clearTimeout(timerId);
  }, 100);
};
