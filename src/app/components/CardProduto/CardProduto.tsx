import { calculaValorComPorcentagemDeDesconto } from "@/app/helpers";
import Image from "next/image";
import { useFavoritosContext } from "../favoritosProvider/favoritosProvider";

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

  const { adicionarAosFavoritos, verificaFavorito, isAddFavoritoPending } = useFavoritosContext(); 

  const ehFavorito = verificaFavorito(produto)

  return (
    <div className="col">
      <div className="card shadow-sm h-100">
        {mostrarImagem ? (
          <Image
            src={produto.photos[0].src}
            className="card-img-top"
            alt={produto.photos[0].titulo}
            width={150}
            height={180}
          />
        ) : null}

        <div className="card-body bg-ligth">
          <span className="badge text-bg-success text-white mb-2 ">
            {produto.desconto}% de desconto
          </span>

          <h5 className="card-title fw-bold">{produto.name}</h5>
          <span className="text-secondary">De R$ {produto.price}</span>
          <h5 className="card-text">
            Por R${" "}
            {calculaValorComPorcentagemDeDesconto(
              Number(produto.price),
              produto.desconto
            )}
          </h5>
          {mostrarBotao ? (
            <button
              className={
                ehFavorito
                  ? "btn btn-success d-block w-100"
                  : "btn btn-secondary d-block w-100"
              }
              type="button"
              onClick={() => adicionarAosFavoritos(produto)}
              disabled={ehFavorito || isAddFavoritoPending}
            >
              {ehFavorito ? "Favoritado": isAddFavoritoPending ? "Adicionando...": "Favoritar"}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
