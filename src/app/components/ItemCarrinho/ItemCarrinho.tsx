import Image from "next/image";
import { useCarrinhoContext } from "../carrinhoProvider/carrinhoProvider";

interface ItemCarrinhoProps {
  itemCarrinho: Produto & { quantidade: number };
}

export default function ItemCarrinho({ itemCarrinho }: ItemCarrinhoProps) {
  const {
    removerDoCarrinho,
    adicionarAoCarrinho,
    isRemocaoPendente,
  } = useCarrinhoContext();

  return (
    <div className="d-flex align-items-center">
      {/* Imagem do produto */}
      <Image
        className="rounded"
        src={itemCarrinho.photos[0].src}
        alt={itemCarrinho.photos[0].titulo}
        width={70}
        height={70}
      />

      {/* Detalhes do produto */}
      <div className="flex-grow-1 ms-3">
        <h6 className="mb-1">{itemCarrinho.name}</h6>
        <small className="text-muted d-block">{itemCarrinho.description}</small>
        <div className="mt-2">
          <small className="fw-bold">
            R$ {itemCarrinho.price.toFixed(2)} x {itemCarrinho.quantidade} ={" "}
            R$ {(itemCarrinho.price * itemCarrinho.quantidade).toFixed(2)}
          </small>
        </div>

        {/* Controles de quantidade */}
        <div className="d-flex align-items-center mt-2 gap-2">
          <button
            onClick={() => removerDoCarrinho(itemCarrinho.id)}
            className="btn btn-outline-secondary btn-sm"
            disabled={isRemocaoPendente}
          >
            –
          </button>
          <span className="fw-bold">{itemCarrinho.quantidade}</span>
          <button
            onClick={() => adicionarAoCarrinho(itemCarrinho)}
            className="btn btn-outline-secondary btn-sm"
          >
            +
          </button>
        </div>
      </div>

      {/* Botão remover */}
      <button
        onClick={() => removerDoCarrinho(itemCarrinho.id)}
        className="btn btn-outline-danger btn-sm ms-3"
        disabled={isRemocaoPendente}
      >
        {isRemocaoPendente ? "..." : "Remover"}
      </button>
    </div>
  );
}
