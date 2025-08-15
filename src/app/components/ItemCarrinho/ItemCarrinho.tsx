import Image from "next/image";
import { useCarrinhoContext } from "../carrinhoProvider/carrinhoProvider";
import { useRouter } from "next/navigation";

interface ItemCarrinhoProps {
  itemCarrinho: Produto & { quantidade: number };
}

export default function ItemCarrinho({ itemCarrinho }: ItemCarrinhoProps) {
  const { removerDoCarrinho, adicionarAoCarrinho, isRemocaoPendente } =
    useCarrinhoContext();

  const { quantidade, ...produto } = itemCarrinho;
  const router = useRouter();

  const verDetalhesProduto = (id: string) => {
    router.push(`/produto/${id}`);
  };

  return (
    <div
      className="d-flex align-items-center justify-content-between flex-wrap w-100 p-2"
      style={{
        minHeight: "100px",
        border: "1px solid #eee",
        borderRadius: "8px",
      }}
    >
      {/* Imagem */}
      <div
        style={{
          flexShrink: 0,
          cursor: "pointer",
          height: "90px",
          width: "90px",
        }}
        onClick={() => verDetalhesProduto(produto.id)}
      >
        <Image
          className="rounded"
          src={itemCarrinho.photos[0].src}
          alt={itemCarrinho.photos[0].titulo}
          width={90}
          height={90}
          style={{ objectFit: "cover", height: "100%", width: "100%" }}
        />
      </div>

      {/* Info */}
      <div className="flex-grow-1 d-flex flex-column justify-content-between min-w-0 px-2 mb-3">
        <div>
          <h6 className="mt-3 mb-1 text-truncate">{itemCarrinho.name}</h6>
          <small className="text-muted d-block mb-4 text-truncate">
            {itemCarrinho.category.name}
          </small>
        </div>

        {/* Preço */}
        <small className="fw-bold">
          R$ {itemCarrinho.price} × {quantidade} ={" "}
          R$ {(itemCarrinho.price * quantidade).toFixed(2)}
        </small>
      </div>

      {/* Botões na direita e centralizados */}
      <div className="d-flex align-items-center gap-2 ms-auto mt-2 mt-sm-0">
        <button
          onClick={() => removerDoCarrinho(itemCarrinho.id)}
          className="btn btn-outline-danger btn-sm"
          disabled={isRemocaoPendente}
        >
          –
        </button>
        <span className="fw-bold">{quantidade}</span>
        <button
          onClick={() => adicionarAoCarrinho(produto)}
          className="btn btn-outline-warning btn-sm"
        >
          +
        </button>
      </div>
    </div>
  );
}
