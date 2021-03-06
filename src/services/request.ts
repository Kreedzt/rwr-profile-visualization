// SPDX-License-Identifier: GPL-3.0-only
import { ErrorResponse } from "../models/response";
import { API_PREFIX, USER_ID_NOT_FOUND_MSG } from "../constants";
import { message } from "antd";

const responseHandler = (res: ErrorResponse | Record<string, any>) => {
  console.log("fetch res", res);
  if ("code" in res && res.code !== 0) {
    message.error(`Server Error: ${res.message}`);
    return Promise.reject(res);
  }
  return Promise.resolve(res);
};

export const request = (
  method: "GET" | "POST",
  url: string,
  params?: Record<string, any>
) => {
  console.log("request params", method, url, params);
  return fetch(`${API_PREFIX}/${url}`, {
    method,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: params ? JSON.stringify(params) : null,
  })
    .then((r) => r.json())
    .then(responseHandler);
};

export const uploadRequest = (url: string, params?: FormData) => {
  console.log("uploadRequest params", url, params);

  return fetch(`${API_PREFIX}/${url}`, {
    method: "POST",
    headers: {
      "Content-type": "multipart/form-data",
    },
    body: params,
  })
    .then((r) => r.json())
    .then(responseHandler);
};
