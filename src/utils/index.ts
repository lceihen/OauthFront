export const isProd = process.env.NODE_ENV === "production";

export const handleGetBackendApi = () => {
  if (process.env.NODE_ENV === "production") {
    return "https://authserver.abclive.cloud";
  } else if (process.env.NODE_ENV === "development") {
    return "https://authserver-beta.abclive.cloud";
  } else {
    return "http://127.0.0.1:3000";
  }
};
