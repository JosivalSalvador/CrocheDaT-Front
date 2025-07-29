import axios from "axios";


export const favoritosApi = axios.create({
    baseURL: "https://crochedat-back.onrender.com/v1",
});