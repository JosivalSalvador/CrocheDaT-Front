import axios from "axios";


export const produtosApi = axios.create({
    baseURL: "https://clean-hildegarde-crochedat-90e09757.koyeb.app/v1",
});