import axios from "axios";

export const personService = () => {
  const baseUrl = "http://localhost:8080/person/";

  const getAll = () => {
    axios.get(baseUrl + "all").then((res) => res.data.data);
  };

  return getAll;
};
