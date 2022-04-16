import {
  ROOT_PATH,
  APPLICATION_PATH,
  APPLICATION_JSON,
  GET,
  LOGIN_PATH,
} from './constants';

export const request = async (method, relativePath, payload, token) => {
  try {
    const response =
      method === GET
        ? await fetch(ROOT_PATH + APPLICATION_PATH + relativePath, {
            method: method,
            headers: {
              Authorization: token,
            },
          })
        : await fetch(ROOT_PATH + APPLICATION_PATH + relativePath, {
            method: method,
            headers: {
              Accept: APPLICATION_JSON,
              'Content-Type': APPLICATION_JSON,
              Authorization: relativePath === LOGIN_PATH ? null : token,
            },
            body: JSON.stringify({
              ...payload,
            }),
          });
    return response;
  } catch (error) {}
};
