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

  const verDetalhesProduto = (id: string) =>{
    router.push(`/produto/${id}`)
  }
  return (
    <div className="col">
      <div className="card shadow-sm h-100">
        {mostrarImagem && produto.photos.length > 0 && (
          <Image
            src={produto.photos[0].src}
            className="card-img-top"
            alt={produto.photos[0].titulo}
            width={150}
            height={230}
            style={{ cursor: 'pointer' }}
            onClick={() => verDetalhesProduto(produto.id)}
          />
        )}

        <div className="card-body bg-light">
          <h5 className="card-title fw-bold">{produto.name}</h5>

          <h6 className="text-success fw-bold mb-3">
            R$ {produto.price}
          </h6>

          {mostrarBotao && (
            <button
              className={
                estaNoCarrinho
                  ? "btn btn-success d-block w-100"
                  : "btn btn-outline-warning d-block w-100"
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
