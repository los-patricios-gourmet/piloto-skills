"use client";
import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/icon";
import {
  Country,
  Product,
  formatPrice,
  markets,
  categoryNames,
} from "@/data/markets";
import { useCart } from "@/features/cart/cart-context";

export function ProductClient({
  country,
  product,
}: {
  country: Country;
  product: Product;
}) {
  const [selected, setSelected] = useState(product.variants[0].id);
  const [quantity, setQuantity] = useState(1);
  const [notice, setNotice] = useState(false);
  const { add, forCountry } = useCart();
  const variant = product.variants.find((v) => v.id === selected)!;
  const inBag = forCountry(country)
    .filter((line) => line.slug === product.slug && line.variantId === selected)
    .reduce((n, line) => n + line.quantity, 0);
  const available = Math.max(0, variant.stock - inBag);
  const related = markets[country].products
    .filter((p) => p.slug !== product.slug)
    .slice(0, 2);
  function addItem() {
    if (available === 0) return;
    add(country, product.slug, selected, Math.min(quantity, available));
    setNotice(true);
    window.setTimeout(() => setNotice(false), 3200);
  }
  return (
    <main id="main-content" className="detail-page">
      <div className="detail-breadcrumb">
        <Link href={`/${country}`}>{markets[country].name}</Link>
        <span>/</span>
        <Link href={`/${country}/catalogo`}>Colección</Link>
        <span>/</span>
        <strong>{product.name}</strong>
      </div>
      <section className="detail-layout">
        <div className="detail-gallery">
          <div className="detail-main-image">
            <img
              src={product.image}
              alt={`Fotografía provisional de ${product.name}`}
            />
            <span>IMAGEN PROVISIONAL</span>
          </div>
          <div className="detail-thumbnail">
            <img src={product.image} alt="Vista de muestra del producto" />
          </div>
        </div>
        <div className="detail-content">
          <h1>{categoryNames[product.category]}</h1>
          <p className="detail-lead">{product.short}</p>
          <span className="detail-divider" />
          <p className="detail-description">{product.description}</p>
          <div className="variant-heading">
            <span>Elige tu presentación</span>
            <small>Peso fijo · precio por presentación</small>
          </div>
          <div
            className="variant-options"
            role="group"
            aria-label="Presentación de peso"
          >
            {product.variants.map((v) => (
              <button
                type="button"
                key={v.id}
                className={selected === v.id ? "selected" : ""}
                onClick={() => {
                  setSelected(v.id);
                  setQuantity(1);
                }}
                aria-pressed={selected === v.id}
              >
                <strong>{v.weight}</strong>
                <span>{formatPrice(country, v.price)}</span>
              </button>
            ))}
          </div>
          <div className="purchase-row">
            <div className="qty-control">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label="Disminuir cantidad"
              >
                <Icon name="minus" />
              </button>
              <span>{quantity}</span>
              <button
                type="button"
                onClick={() =>
                  setQuantity(Math.min(variant.stock, quantity + 1))
                }
                aria-label="Aumentar cantidad"
              >
                <Icon name="plus" />
              </button>
            </div>
            <strong className="detail-price">
              {formatPrice(country, variant.price * quantity)}
            </strong>
          </div>
          <button
            className="filled-action detail-add"
            type="button"
            onClick={addItem}
            disabled={available === 0}
          >
            {available === 0 ? "Stock demo agotado" : "Añadir a mi selección"}{" "}
            <span>
              <Icon />
            </span>
          </button>
          {notice && (
            <p className="added-notice" role="status">
              Agregado al carrito de prueba.{" "}
              <Link href={`/${country}/carrito`}>Ver carrito <Icon /></Link>
            </p>
          )}
          <p className="disclaimer">
            Precio y stock piloto. Delivery a domicilio; cobertura y costo
            definitivos por confirmar. No se procesa una compra real.
          </p>
        </div>
      </section>
      <section className="related section-pad">
        <h2>Completa tu mesa</h2>
        <div className="related-grid">
          {related.map((p) => (
            <Link key={p.slug} href={`/${country}/producto/${p.slug}`}>
              <img src={p.image} alt={`Imagen provisional de ${p.name}`} />
              <div>
                <span>{p.category.toUpperCase()}</span>
                <strong>{p.name}</strong>
                <b>
                  <Icon />
                </b>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
