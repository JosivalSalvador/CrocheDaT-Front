import Image from "next/image";
import { useCarrinhoContext } from "../carrinhoProvider/carrinhoProvider";
import { useRouter } from "next/navigation";

interface CardProdutoProps {
  produto: Produto;
  mostrarImagem?: boolean;
  mostrarBotao?: boolean;
}

export default function CardProduto({
  produto,
  mostrarImagem = true,
  mostrarBotao = true,
}: CardProdutoProps) {
  const { adicionarAoCarrinho, verificaCarrinho } = useCarrinhoContext();
  const estaNoCarrinho = verificaCarrinho(produto);
  const router = useRouter();

  const verDetalhesProduto = (id: string) => {
    router.push(`/produto/${id}`);
  };

  return (
    <div className="col">
      <div className="card h-100 border-0 shadow-sm rounded-3">
        {mostrarImagem && produto.photos.length > 0 && (
          <div
            style={{ height: "350px", overflow: "hidden", cursor: "pointer" }}
            onClick={() => verDetalhesProduto(produto.id)}
          >
            <Image
              src={produto.photos[0].src}
              alt={produto.photos[0].titulo}
              width={400}
              height={200}
              className="w-100"
              style={{ objectFit: "cover", height: "100%" }}
            />
          </div>
        )}

        <div className="card-body bg-light d-flex flex-column justify-content-between">
          <div>
            <h5 className="card-title fw-semibold text-truncate" title={produto.name}>
              {produto.name}
            </h5>
            <h6 className="text-success fw-bold mb-3">
              R$ {produto.price}
            </h6>
          </div>

          {mostrarBotao && (
            <button
              className={
                estaNoCarrinho
                  ? "btn btn-success w-100"
                  : "btn btn-outline-warning w-100"
              }
              type="button"
              onClick={() => adicionarAoCarrinho(produto)}
              disabled={estaNoCarrinho}
            >
              <i className={`bi ${estaNoCarrinho ? "bi-check-circle" : "bi-cart"} me-2`}></i>
              {estaNoCarrinho ? "No carrinho" : "Adicionar ao carrinho"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
