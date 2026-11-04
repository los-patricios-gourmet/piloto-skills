"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { Country, categoryNames, Category, markets } from "@/data/markets";
import { ProductCard } from "@/components/product-card";

export function CatalogClient({ country }: { country: Country }) {
  const [category, setCategory] = useState<Category | "todos">("todos");
  const [query, setQuery] = useState("");
  const products = markets[country].products;
  const categories = [...new Set(products.map((p) => p.category))];
  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          (category === "todos" || p.category === category) &&
          (!query ||
            `${p.name} ${p.short}`
              .toLocaleLowerCase("es")
              .includes(query.toLocaleLowerCase("es"))),
      ),
    [products, category, query],
  );
  return (
    <main id="main-content" className="catalog-page">
      <section className="catalog-hero">
        <div className="catalog-hero-photo">
          <img
            src="/images/trufas-piloto.png"
            alt="Trufas, fotografía provisional"
          />
        </div>
        <div className="catalog-hero-shade" />
        <div className="catalog-hero-copy">
          <h1>La colección</h1>
          <p>
            Ingredientes con carácter. Una selección piloto para explorar la
            experiencia de compra.
          </p>
        </div>
      </section>
      <section className="catalog-content section-pad">
        <div className="catalog-head">
          <div>
            <h2>Elige tu ingrediente</h2>
          </div>
          <span>{filtered.length} productos</span>
        </div>
        <div className="catalog-controls">
          <div
            className="catalog-filters"
            role="group"
            aria-label="Filtrar por categoría"
          >
            <button
              type="button"
              aria-pressed={category === "todos"}
              className={category === "todos" ? "active" : ""}
              onClick={() => setCategory("todos")}
            >
              Todo
            </button>
            {categories.map((cat) => (
              <button
                type="button"
                key={cat}
                aria-pressed={category === cat}
                className={category === cat ? "active" : ""}
                onClick={() => setCategory(cat)}
              >
                {categoryNames[cat]}
              </button>
            ))}
          </div>
          <label className="catalog-search">
            <span>BUSCAR</span>
            <input
              type="search"
              placeholder="¿Qué te gustaría descubrir?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Buscar productos"
            />
            <b>⌕</b>
          </label>
        </div>
        {filtered.length ? (
          <div className="catalog-grid">
            {filtered.map((p, i) => (
              <ProductCard
                key={p.slug}
                product={p}
                country={country}
                index={i}
              />
            ))}
          </div>
        ) : (
          <div className="catalog-empty">
            No hay productos para esa búsqueda.{" "}
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("todos");
              }}
            >
              Ver toda la colección
            </button>
          </div>
        )}
        <p className="disclaimer">
          Fotografías, nombres de selección, presentaciones, precios y stock son
          provisionales para el piloto.
        </p>
      </section>
      <section className="catalog-story" id="historia">
        <div className="story-image">
          <img
            src="/images/caviar-piloto.png"
            alt="Caviar, fotografía provisional"
          />
        </div>
        <div className="story-copy">
          <h2>
            El valor de
            <br />
            elegir bien
          </h2>
          <p>
            Una experiencia digital a la altura del ritual gastronómico:
            descubrir, conocer cada presentación y elegir con confianza.
          </p>
          <Link className="outline-action" href={`/${country}`}>
            VOLVER AL INICIO <Icon />
          </Link>
        </div>
      </section>
    </main>
  );
}
