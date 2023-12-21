export const handleGetParamString = (data: any = {}) => {
  const queryArray: Array<string> = [];
  Object.keys(data).map((key) => {
    queryArray.push(`${key}=${encodeURIComponent(data[key])}`);
  });
  return queryArray.join("&");
};

interface IRequestProps {
  url: string;
  config?: any;
  data?: any;
  method?: string;
  headers?: any;
  params?: any;
}

console.log("process.env.NODE_ENV---", process.env.APP_ENV);
const handleGetBackendApi = () => {
  if (process.env.APP_ENV === "production") {
    return "https://authServer.abclive.cloud";
    // @ts-ignore
  } else if (process.env.APP_ENV === "beta") {
    return "https://authServer-beta.abclive.cloud";
  } else {
    return "http://127.0.0.1:3000";
  }
};

const BaseUrl = handleGetBackendApi();

console.log("BaseUrl", BaseUrl);

const handletransformData = (data: any, method: string, headers: any) => {
  if (method === "GET") {
    return null;
  } else if (
    method === "POST" &&
    headers["Content-Type"]?.includes("x-www-form-urlencoded")
  ) {
    return handleGetParamString(data);
  } else {
    return JSON.stringify(data);
  }
};

export default (props: IRequestProps) => {
  let {
    url,
    config = {},
    data,
    method = "GET",
    headers = {},
    params = {},
  } = props || {};

  method = method.toUpperCase();

  const paramString = handleGetParamString(params);

  url =
    method === "GET" ? `${url}${paramString ? "?" + paramString : ""}` : url;

  data = handletransformData(data, method, headers);
  return new Promise((resolve, reject) => {
    fetch(`${BaseUrl}${url}`, {
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      ...config,
      method,
      body: data,
    })
      .then((midRes) => {
        if (midRes?.redirected) {
          window.location.replace(midRes?.url);
        }
        return midRes.json();
      })
      .then((res) => {
        if (res?.code === "-1") {
          reject(res);
        }
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
