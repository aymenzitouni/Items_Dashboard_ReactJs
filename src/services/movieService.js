import http from "./httpService";

export function getMovies() {
  return http.get("http://localhost:3900/api/movies");
}

export function getMovie(id) {
  return http.get("http://localhost:3900/api/movies/" + id);
}

export async function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put("http://localhost:3900/api/movies/" + movie._id, body);
  }

  return http.post("http://localhost:3900/api/movies", movie);
}

export function deleteMovie(id) {
  http.delete("http://localhost:3900/api/movies/" + id);
}
