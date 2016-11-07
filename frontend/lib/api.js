// XXX: backend URL

export function fetchInitialData() {
  return fetch('http://localhost:8080/api/all-data')
    .then(res => res.json());
}
