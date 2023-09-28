import request from "@/utils/request";
//  let { url, config = {}, data, method = "GET", headers = {} } = props || {};
export const handleLogin = (params: any) => {
  return request({
    url: "/api/auth/code",
    method: "GET",
    params,
  });
};
