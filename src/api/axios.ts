import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:7293/api", // Modifica con il tuo URL dell'API
});

export default instance;
