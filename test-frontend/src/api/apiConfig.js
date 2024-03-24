import axios from "axios";

const BASE_URL = "http://localhost:3001";

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getRequest = async ({
  url,
  onGet,
  onFinally,
  onCatch,
  config,
}) => {
  return await client
    .get(url, config)
    .then(onGet)
    .catch(onCatch)
    .finally(onFinally);
};

export const postRequest = async ({
  url,
  data,
  onPost,
  onFinally,
  onCatch,
  config,
}) => {
  // const phpData = Object.keys(data)
  //   .map((item) => item + "=" + data[item])
  //   .join("&");

  return await client
    .post(url, data, config)
    .then((res) => onPost(res.data))
    .catch(onCatch)
    .finally(onFinally);
};

export const patchRequest = async ({
  url,
  data,
  onPost,
  onFinally,
  onCatch,
  config,
}) => {
  return await client
    .patch(url, data, config)
    .then((res) => onPost?.(res.data))
    .catch(onCatch)
    .finally(onFinally);
};

export const putRequest = async ({ url, data, onPut, config }) => {
  return await client.put(url, data, config).then((res) => onPut?.(res.data));
};

export const deleteRequest = async ({
  url,
  onDelete,
  onFinally,
  onCatch,
  config,
}) => {
  return await client
    .delete(url, config)
    .then((res) => onDelete?.(res.data))
    .catch(onCatch)
    .finally(onFinally);
};
