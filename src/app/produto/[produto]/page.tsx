"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useProdutosContext } from "@/app/components/produtosProvider/produtosProvider";
import { useCarrinhoContext } from "@/app/components/carrinhoProvider/carrinhoProvider";

export default function Produto() {
  const { produtos, isLoading, isError } = useProdutosContext();
  const { adicionarAoCarrinho, verificaCarrinho } = useCarrinhoContext();
  const params = useParams();
  const nomeProduto = params?.produto as string;

  const produto = produtos.find((p) => p.id === nomeProduto || p.name === nomeProduto);

  if (isLoading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-3 text-muted">Carregando produto...</p>
      </div>
    );
  }

  if (isError || !produto) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-danger" role="alert">
          Erro ao carregar o produto.
        </div>
      </div>
    );
  }

  const estaNoCarrinho = verificaCarrinho(produto);

  return (
    <main className="bg-light py-5">
      <div className="container">
        <div className="row g-5">
          {/* Galeria */}
          <div className="col-md-6">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <div className="row g-2">
                  {produto.photos.map((foto, index) => (
                    <div className="col-6" key={index}>
                      <Image
                        src={foto.src}
                        alt={foto.titulo}
                        width={500}
                        height={500}
                        className="img-fluid rounded border"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Detalhes */}
          <div className="col-md-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body d-flex flex-column">
                <h1 className="card-title fw-bold mb-2">{produto.name}</h1>
                <h4 className="text-success mb-4">R$ {produto.price}</h4>

                <button
                  className={`btn ${
                    estaNoCarrinho ? "btn-success" : "btn-outline-warning"
                  } w-100 mb-4`}
                  onClick={() => adicionarAoCarrinho(produto)}
                  disabled={estaNoCarrinho}
                >
                  <i className="bi bi-cart me-2"></i>
                  {estaNoCarrinho ? "Produto no carrinho" : "Adicionar ao carrinho"}
                </button>

                <ul className="list-group list-group-flush mb-3">
                  <li className="list-group-item">
                    <strong>Descrição:</strong> {produto.description || "Sem descrição"}
                  </li>
                  <li className="list-group-item">
                    <strong>Material:</strong> {produto.material}
                  </li>
                  <li className="list-group-item">
                    <strong>Tempo de produção:</strong> {produto.productionTime}
                  </li>
                  <li className="list-group-item">
                    <strong>Categoria:</strong> {produto.category?.name || "Sem categoria"}
                  </li>
                </ul>

                <div className="text-muted small mt-auto pt-3 border-top">
                  <p className="mb-1">
                    <strong>Criado em:</strong>{" "}
                    {new Date(produto.createdAt).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Atualizado em:</strong>{" "}
                    {new Date(produto.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
