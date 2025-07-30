"use client";

import ListagemProdutos from "./components/ListagemProdutos/ListagemProdutos";

export default function App() {
  return (
    <main className="bg-light py-5">
      <div className="container py-4">
      
        <section
          className="text-dark p-5 rounded shadow mb-5 text-center text-md-start"
          style={{
            background: "linear-gradient(135deg, #fbe6d4, #fdebd2, #f8d9c4)",
          }}
        >
          <div className="row align-items-center">
            <div className="col">
              <h2 className="display-4 fw-bold mb-3">
                ✨ Crochê para brilhar nas festas de fim de ano
              </h2>
              <p className="lead mb-0">
                Amigo secreto, ceia em família ou virada do ano, nossas peças artesanais são o presente perfeito e o toque final no seu visual.
              </p>
            </div>
          </div>
        </section>
   
        <section id="produtos" className="py-5 bg-light border-top border-3 border-warning-subtle shadow-sm">
          <div className="container">
            <div className="mb-5 text-center text-md-start">
              <h2 className="display-6 fw-bold mb-3">
                <span className="px-4 py-2 rounded-pill bg-warning-subtle text-dark shadow-sm">
                  ✨ Produtos em destaque para as festas
                </span>
              </h2>
            </div>
            <div className="mt-5">
              <ListagemProdutos />
            </div>
          </div>
        </section>



      </div>
    </main>
  );
}
