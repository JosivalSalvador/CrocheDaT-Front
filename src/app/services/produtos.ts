import { favoritosApi } from ".";


export async function getListaFavorito(): Promise<Produto[]> {
    return await favoritosApi.get("/products").then((response)=> response.data)
}

