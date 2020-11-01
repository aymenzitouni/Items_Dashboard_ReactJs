import http from "./httpService";

export function login(username, password) {
  return http.post("http://localhost:3900/api/auth", {
    email: username,
    password,
  });
}
