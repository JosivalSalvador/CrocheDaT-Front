"use client";

import Link from "next/link";

export default function Navbar() {

  return (
    <nav className="navbar navbar-expand-md bg-danger-subtle border-bottom border-body sticky-top">
      <div className="container-fluid">
      <a href="/" className="navbar-brand d-flex align-items-center gap-2 text-decoration-none">
        <span className="fs-3">🧶</span>
        <span className="fs-4 fw-semibold text-dark fst-italic">Crochê da T</span>
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

        <div className="collapse navbar-collapse justify-content-end" id="navbarCollapse">
          <ul className="navbar-nav d-flex gap-2 mt-2">
            <li className="nav-item">
              <Link
                href="/"
                className="btn btn-outline-secondary rounded-pill d-flex align-items-center gap-2 px-3 py-2"
              >
                <i className="bi bi-house-door-fill"></i> Início
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/carrinho"
                className="btn btn-outline-secondary rounded-pill d-flex align-items-center gap-2 px-3 py-2"
              >
                <i className="bi bi-cart-fill"></i> Carrinho
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/about"
                className="btn btn-outline-secondary rounded-pill d-flex align-items-center gap-2 px-3 py-2"
              >
                <i className="bi bi-info-circle-fill"></i> Sobre
              </Link>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  );
}
