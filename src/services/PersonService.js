import axios from "axios";

export class personService {
  baseUrl = "http://localhost:8080/users/";

  getAll() {
    return axios.get(this.baseUrl + "all").then((res) => res.data.data);
  }
}
