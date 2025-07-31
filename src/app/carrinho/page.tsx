"use client";

import ListagemCarrinho from "../components/ListagemCarrinho/ListagemCarrinho";
import { useCarrinhoContext } from "../components/carrinhoProvider/carrinhoProvider";

export default function App() {
  const { carrinho } = useCarrinhoContext();
  const numeroWhatsApp = "5592984902857";

  const enviarWhatsApp = () => {
    if (carrinho.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }

    const mensagem = carrinho
      .map(
        (item) =>
          `• ${item.name} (Qtd: ${item.quantidade}) - R$ ${item.price}`
      )
      .join("\n");

    const textoFinal = `Olá! Gostaria de finalizar o pedido com os seguintes itens:\n\n${mensagem}`;
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(textoFinal)}`;
    window.open(url, "_blank");
  };

  return (
    <main>
      <div className="container p-5">
        <ListagemCarrinho />
        <button
          className="btn btn-success mt-4"
          onClick={enviarWhatsApp}
        >
          Enviar pedido pelo WhatsApp
        </button>
      </div>
    </main>
  );
}
