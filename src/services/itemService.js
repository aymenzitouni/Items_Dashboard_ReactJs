import http from "./httpService";

export function getItems() {
  return http.get("/movies");
}

export function getItem(id) {
  return http.get("/movies/" + id);
}

export async function saveItem(item) {
  if (item._id) {
    const body = { ...item };
    delete body._id;
    return http.put("/movies/" + item._id, body);
  }

  return http.post("/movies/", item);
}

export function deleteItem(id) {
  http.delete("/movies/" + id);
}
