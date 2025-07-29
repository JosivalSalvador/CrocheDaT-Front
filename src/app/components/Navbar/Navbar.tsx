"use client";

import Link from "next/link";
import { useState } from "react";
import ListagemCarrinho from "../ListagemCarrinho/ListagemCarrinho";

export default function Navbar() {
  const [mostrarCarrinho, setMostrarCarrinho] = useState(false);

  return (
    <nav className="navbar navbar-expand-md bg-light border-bottom border-body sticky-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Loja WA
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Abrir menu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <Link className="nav-link" href="/">
                Início
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/sobre">
                Sobre
              </Link>
            </li>
          </ul>

          <div className="dropdown">
            <button
              className="btn btn-outline-primary dropdown-toggle"
              type="button"
              onClick={() => setMostrarCarrinho(!mostrarCarrinho)}
            >
              Carrinho
            </button>
            {mostrarCarrinho && (
              <div className="dropdown-menu show p-3" style={{ minWidth: "300px" }}>
                <ListagemCarrinho />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
