import axios from "axios";


export const produtosApi = axios.create({
    baseURL: "https://crochedat-back.onrender.com/v1",
});