import fetch from "dva/fetch";

export default function request(url, options = {}) {
  return fetch(url, options).then(response => response.json());
}
