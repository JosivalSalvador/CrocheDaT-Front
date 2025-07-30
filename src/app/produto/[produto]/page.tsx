"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useProdutosContext } from "@/app/components/produtosProvider/produtosProvider";

export default function Produto() {
  const { produtos, isLoading, isError } = useProdutosContext();
  const params = useParams();
  const nomeProduto = params?.produto as string;

  const produto = produtos.find((p) => p.id === nomeProduto || p.name === nomeProduto);

  if (isLoading) return <div>Carregando...</div>;
  if (isError || !produto) return <div>Erro ao carregar produto.</div>;

  return (
    <main>
      <div className="container p-5">
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title mb-4 fw-light">Detalhes do produto</h5>

            <h5 className="card-title mb-4 fw-bold">{produto.name}</h5>

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3 mb-3">
              {produto.photos.map((foto, index) => (
                <div className="col" key={index}>
                  <Image
                    src={foto.src}
                    alt={foto.titulo}
                    width={300}
                    height={320}
                    className="img-fluid rounded"
                  />
                </div>
              ))}
            </div>

            <p className="card-text fw-medium">
              Valor: R$ {produto.price}
            </p>
            <p className="card-text fw-medium">
              Descrição: {produto.description || "Sem descrição"}
            </p>
            <p className="card-text fw-medium">
              Material: {produto.material}
            </p>
            <p className="card-text fw-medium">
              Tempo de produção: {produto.productionTime}
            </p>
            <p className="card-text fw-medium">
              Categoria: {produto.category?.name || "Sem categoria"}
            </p>
            <p className="card-text fw-light text-muted">
              Criado em: {new Date(produto.createdAt).toLocaleDateString()}
            </p>
            <p className="card-text fw-light text-muted">
              Atualizado em: {new Date(produto.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
