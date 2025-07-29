"use client";

import { useMutation, useQuery } from "@tanstack/react-query"; 
import { removeProdutoFavorito, addProdutoFavorito, getListaFavorito} from "../../services/produtos";
import { calculaValorComPorcentagemDeDesconto } from "@/app/helpers";
import { createContext, useContext, ReactNode } from "react";
import { toast } from "react-toastify";


type FavoritosContextType = {
  favoritos: Produto[];
  adicionarAosFavoritos: (produto: Produto) => void;
  removerFavorito: (id: string) => void;
  verificaFavorito: (produto: Produto) => boolean;
  valorTotalFavoritos: () => number;
  isAddFavoritoPending: boolean;
  isRemoveFavoritoPending: boolean;
};

const FavoritosContext = createContext<FavoritosContextType>({
  favoritos: [],
  adicionarAosFavoritos: () => {},
  removerFavorito: () => {},
  verificaFavorito: () => false,
  valorTotalFavoritos: () => 0,
  isAddFavoritoPending: false,
  isRemoveFavoritoPending: false,
});


export function FavoritosProvider({ children }: { children: ReactNode }) {

  const {data: favoritos = [], refetch} = useQuery({
    queryKey: ["listaFavoritos"],
    queryFn: getListaFavorito,
  });

  const addMutation = useMutation({
    mutationFn: addProdutoFavorito,
    onSuccess: () => {
      toast.success("Adicionado aos favoritos!");
      refetch()
    },
    onError: () => {
      toast.error("Erro ao adicionar aos favoritos.");
    },
  });

  const removeMutation = useMutation({
    mutationFn: removeProdutoFavorito,
    onSuccess: () => {
      toast.success("Removido dos favoritos.");
      refetch()
    },
    onError: () => {
      toast.error("Erro ao remover dos favoritos.");
    },
  });

  const adicionarAosFavoritos = (produto: Produto) => {
    addMutation.mutate(produto);
  };

  const removerFavorito = (id: string) => {
    removeMutation.mutate(id);
  };

  const verificaFavorito = (produto: Produto) => {
    return favoritos.some((item) => item.id === produto.id);
  };

  const valorTotalFavoritos = () => {
    return favoritos.reduce((acc, produto) => {
      return (
        acc +
        calculaValorComPorcentagemDeDesconto(
          Number(produto.preco),
          produto.desconto
        )
      );
    }, 0);
  };


  return (
    <FavoritosContext.Provider
      value={{
        favoritos,
        adicionarAosFavoritos,
        removerFavorito,
        verificaFavorito,
        valorTotalFavoritos,
        isAddFavoritoPending: addMutation.isPending,
        isRemoveFavoritoPending: removeMutation.isPending,
      }}
    >
      {children}
    </FavoritosContext.Provider>
  );
}

export function useFavoritosContext() {
  return useContext(FavoritosContext);
}
