"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { toast } from "react-toastify";

interface ProdutoCarrinho extends Produto {
  quantidade: number;
}

type CarrinhoContextType = {
  carrinho: ProdutoCarrinho[];
  adicionarAoCarrinho: (produto: Produto) => void;
  removerDoCarrinho: (id: string) => Promise<void>;
  verificaCarrinho: (produto: Produto) => boolean;
  valorTotalCarrinho: () => number;
  isRemocaoPendente: boolean;
};

const CarrinhoContext = createContext<CarrinhoContextType>({
  carrinho: [],
  adicionarAoCarrinho: () => {},
  removerDoCarrinho: async () => {},
  verificaCarrinho: () => false,
  valorTotalCarrinho: () => 0,
  isRemocaoPendente: false,
});

const STORAGE_KEY = "carrinho";

export function CarrinhoProvider({ children }: { children: ReactNode }) {
  const [carrinho, setCarrinho] = useState<ProdutoCarrinho[]>([]);
  const [isRemocaoPendente, setIsRemocaoPendente] = useState(false);

  useEffect(() => {
    const armazenado = sessionStorage.getItem(STORAGE_KEY);
    if (armazenado) {
      setCarrinho(JSON.parse(armazenado));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(carrinho));
  }, [carrinho]);

  
  const adicionarAoCarrinho = (produto: Produto) => {
    const jaExiste = carrinho.some((item) => item.id === produto.id);

    setCarrinho((prev) => {
      const index = prev.findIndex((item) => item.id === produto.id);
      if (index !== -1) {
        const atualizado = [...prev];
        atualizado[index] = {
          ...atualizado[index],
          quantidade: atualizado[index].quantidade + 1,
        };
        return atualizado;
      }
      return [...prev, { ...produto, quantidade: 1 }];
    });

    jaExiste
      ? toast.info("Quantidade aumentada no carrinho.")
      : toast.success("Produto adicionado ao carrinho!");
  };



  const removerDoCarrinho = async (id: string) => {
    setIsRemocaoPendente(true);
    await new Promise((resolve) => setTimeout(resolve, 300)); // simula async
    setCarrinho((prev) => {
      const item = prev.find((produto) => produto.id === id);
      if (!item) return prev;

      if (item.quantidade > 1) {
        return prev.map((produto) =>
          produto.id === id
            ? { ...produto, quantidade: produto.quantidade - 1 }
            : produto
        );
      }

      toast.success("Produto removido do carrinho.");
      return prev.filter((produto) => produto.id !== id);
    });
    setIsRemocaoPendente(false);
  };

  const verificaCarrinho = (produto: Produto) => {
    return carrinho.some((item) => item.id === produto.id);
  };

  const valorTotalCarrinho = () => {
    return carrinho.reduce(
      (total, produto) => total + produto.price * produto.quantidade,
      0
    );
  };

  return (
    <CarrinhoContext.Provider
      value={{
        carrinho,
        adicionarAoCarrinho,
        removerDoCarrinho,
        verificaCarrinho,
        valorTotalCarrinho,
        isRemocaoPendente,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinhoContext() {
  return useContext(CarrinhoContext);
}
