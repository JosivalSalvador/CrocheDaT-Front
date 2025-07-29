import CardProduto from "../CardProduto/CardProduto";
import { useProdutosContext } from "../produtosProvider/produtosProvider";

export default function ListagemProdutos() {
  const { produtos } = useProdutosContext();


  const produtosPorCategoria = produtos.reduce((acc, produto) => {
    const categoria = produto.category?.name || "Sem categoria";
    if (!acc[categoria]) acc[categoria] = [];
    acc[categoria].push(produto);
    return acc;
  }, {} as Record<string, typeof produtos>);

  return (
    <div className="row row-cols-1 row-cols-lg-2">
      <div className="col-lg-9">
        <h5 className="mb-3">Produtos disponíveis:</h5>

        {Object.entries(produtosPorCategoria).map(([categoria, lista]) => (
          <div key={categoria} className="mb-4">
            <h6 className="fw-bold mb-3">{categoria}</h6>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
              {lista.map((produto) => (
                <CardProduto key={produto.id} produto={produto} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
