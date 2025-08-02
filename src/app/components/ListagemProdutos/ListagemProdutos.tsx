import CardProduto from "../CardProduto/CardProduto";
import { useProdutosContext } from "../produtosProvider/produtosProvider";

export default function ListagemProdutos() {
  const { produtos, isLoading } = useProdutosContext();

  const produtosPorCategoria = produtos.reduce((acc, produto) => {
    const categoria = produto.category?.name || "Sem categoria";
    if (!acc[categoria]) acc[categoria] = [];
    acc[categoria].push(produto);
    return acc;
  }, {} as Record<string, typeof produtos>);

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-lg-12">
          {isLoading ? (
            <>
              {[...Array(2)].map((_, idx) => (
                <div key={idx} className="mb-4">
                  <h3 className="fw-bold placeholder-glow">
                    <span className="placeholder col-4"></span>
                  </h3>
                  <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="col">
                        <div className="card placeholder-glow">
                          <div className="card-img-top placeholder" style={{ height: "150px" }}></div>
                          <div className="card-body">
                            <h5 className="card-title placeholder col-6"></h5>
                            <p className="card-text placeholder col-8"></p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </>
          ) : (
            Object.entries(produtosPorCategoria).map(([categoria, lista]) => (
              <div key={categoria} className="mb-4">
                <h3 className="fw-bold mb-3">{categoria}</h3>
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
                  {lista.map((produto) => (
                    <CardProduto key={produto.id} produto={produto} />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
