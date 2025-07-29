import Image from "next/image";
import { useCarrinhoContext } from "../carrinhoProvider/carrinhoProvider";

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

  return (
    <div className="col">
      <div className="card shadow-sm h-100">
        {mostrarImagem && produto.photos.length > 0 && (
          <Image
            src={produto.photos[0].src}
            className="card-img-top"
            alt={produto.photos[0].titulo}
            width={150}
            height={180}
          />
        )}

        <div className="card-body bg-light">
          <h5 className="card-title fw-bold">{produto.name}</h5>

          <h6 className="text-success fw-bold mb-2">
            R$ {produto.price.toFixed(2)}
          </h6>

          <small className="text-muted d-block mb-3">
            {produto.category.name}
          </small>

          {mostrarBotao && (
            <button
              className={
                estaNoCarrinho
                  ? "btn btn-success d-block w-100"
                  : "btn btn-outline-primary d-block w-100"
              }
              type="button"
              onClick={() => adicionarAoCarrinho(produto)}
              disabled={estaNoCarrinho}
            >
              {estaNoCarrinho ? "No carrinho" : "Adicionar ao carrinho"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
