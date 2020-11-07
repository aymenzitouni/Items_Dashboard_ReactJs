import http from "./httpService";
import jwtDecode from "jwt-decode";

export function login(username, password) {
  return http.post("/auth", {
    email: username,
    password,
  });
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("token");
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export default {
  login,
  getCurrentUser,
};
