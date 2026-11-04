"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Country, categoryNames, formatPrice, markets } from "@/data/markets";
import { useCart } from "@/features/cart/cart-context";
import { Icon } from "@/components/icon";
import { Entrance } from "@/components/entrance";

const descriptions = {
  caviar: "El detalle que cambia toda la mesa.",
  trufas: "Un aroma que deja su propia huella.",
  wagyu: "El carácter se reconoce en el corte.",
  "foie-gras": "Una textura para detener el tiempo.",
};

export function MarketExperience({ country }: { country: Country }) {
  const market = markets[country];
  const [active, setActive] = useState(0);
  const [weight, setWeight] = useState(0);
  const [added, setAdded] = useState(false);
  const { add, forCountry } = useCart();
  const photo = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const product = market.products[active];
  const variant = product.variants[weight];
  const inBag = forCountry(country)
    .filter((l) => l.slug === product.slug && l.variantId === variant.id)
    .reduce((s, l) => s + l.quantity, 0);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  function select(index: number, keyboard: boolean) {
    if (index === active) return;
    setActive(index);
    setWeight(0);
    setAdded(false);
    if (
      !keyboard &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      photo.current?.animate(
        [
          { opacity: 0.35, transform: "scale(1.025)" },
          { opacity: 1, transform: "scale(1)" },
        ],
        { duration: 280, easing: "cubic-bezier(.23,1,.32,1)" },
      );
  }
  return (
    <main id="main-content">
      <section
        className="vitrine"
        aria-label={`Selección gourmet de ${market.name}`}
      >
        <div className="vitrine-photo" ref={photo}>
          {market.products.map((p, i) => (
            <img
              key={p.slug}
              src={p.image}
              alt={
                i === active
                  ? `${categoryNames[p.category]}, fotografía editorial de muestra`
                  : ""
              }
              className={i === active ? "is-active" : ""}
              fetchPriority={i === 0 ? "high" : "auto"}
              width="1672"
              height="941"
            />
          ))}
        </div>
        <div className="vitrine-copy">
          <Entrance effect="rise">
            <h1>
              Ingredientes <br />
              de excepción
            </h1>
          </Entrance>
          <Entrance delay={70}>
            <p className="vitrine-intro">
              {country === "pe"
                ? "Caviar y trufas para tu mesa."
                : "Caviar, trufas, Wagyu y foie gras."}{" "}
              Descubre la selección de {market.name}.
            </p>
          </Entrance>
          <Entrance effect="settle" delay={140}>
            <h2 className="ingredient-name" aria-live="polite">
              {categoryNames[product.category]}
            </h2>
          </Entrance>
          <Entrance delay={200}>
            <p className="ingredient-description">
              {descriptions[product.category]}
            </p>
          </Entrance>
          <Entrance effect="rise" delay={250}>
            <div className="vitrine-buy" data-ui>
              <label htmlFor="vitrine-weight">
                Presentación
                <select
                  id="vitrine-weight"
                  value={weight}
                  onChange={(e) => {
                    setWeight(Number(e.target.value));
                    setAdded(false);
                  }}
                >
                  {product.variants.map((v, i) => (
                    <option key={v.id} value={i}>
                      {v.weight} · {formatPrice(country, v.price)}
                    </option>
                  ))}
                </select>
              </label>
              <button
                className="primary-action"
                disabled={inBag >= variant.stock}
                onClick={() => {
                  add(country, product.slug, variant.id);
                  setAdded(true);
                  if (timer.current) clearTimeout(timer.current);
                  timer.current = setTimeout(() => setAdded(false), 2500);
                }}
              >
                {inBag >= variant.stock
                  ? "Stock demo agotado"
                  : added
                    ? "En tu selección"
                    : "Añadir a mi selección"}
                <Icon name={added ? "check" : "plus"} />
              </button>
            </div>
          </Entrance>
          <Entrance delay={300}>
            <div className="vitrine-detail">
              <Link href={`/${country}/producto/${product.slug}`}>
                Conocer el ingrediente <Icon />
              </Link>
              <span role="status">
                {added ? (
                  <Link href={`/${country}/carrito`}>
                    Ver carrito de prueba
                  </Link>
                ) : (
                  "Precio de muestra · sin cobros"
                )}
              </span>
            </div>
          </Entrance>
        </div>
        <div className="vitrine-bottom">
          <div className="ingredient-switcher" aria-label="Elegir ingrediente">
            {market.products.map((p, i) => (
              <button
                key={p.slug}
                type="button"
                aria-pressed={i === active}
                onClick={(e) => select(i, e.detail === 0)}
              >
                <span>{categoryNames[p.category]}</span>
                <Icon name={i === active ? "arrow" : "plus"} />
              </button>
            ))}
          </div>
          <a className="explore-link" href="#coleccion">
            Explora la colección <Icon name="chevron" />
          </a>
        </div>
      </section>
      <section className="collection-section" id="coleccion">
        <div className="chapter-heading">
          <Entrance effect="rise">
            <h2>La colección</h2>
          </Entrance>
          <Entrance delay={80}>
            <p>
              Una selección para {market.name}.<br />
              Cada ingrediente, su propio carácter.
            </p>
          </Entrance>
          <Entrance delay={140}>
            <Link href={`/${country}/catalogo`} className="plain-link">
              Ver catálogo <Icon />
            </Link>
          </Entrance>
        </div>
        <div className="editorial-products">
          {market.products.map((p, i) => (
            <Entrance
              effect="settle"
              key={p.slug}
              className={`editorial-product editorial-product-${i}`}
              delay={i * 70}
            >
              <Link
                href={`/${country}/producto/${p.slug}`}
                className="editorial-product-image"
              >
                <img
                  src={p.image}
                  alt={`${categoryNames[p.category]}, imagen de muestra`}
                  width="1672"
                  height="941"
                  loading="lazy"
                />
                <span className="image-action">
                  <Icon />
                </span>
              </Link>
              <div className="editorial-product-info">
                <div>
                  <h3>
                    <Link href={`/${country}/producto/${p.slug}`}>
                      {categoryNames[p.category]}
                    </Link>
                  </h3>
                  <p>{p.variants.map((v) => v.weight).join(" / ")}</p>
                </div>
                <Link
                  href={`/${country}/producto/${p.slug}`}
                  className="product-price"
                >
                  Desde {formatPrice(country, p.variants[0].price)}
                  <Icon />
                </Link>
              </div>
            </Entrance>
          ))}
        </div>
      </section>
      <section className="brand-story" id="esencia">
        <div className="brand-story-image">
          <img
            src="/images/trufas-piloto.png"
            alt="Detalle de la textura de las trufas, imagen de muestra"
            loading="lazy"
            width="1672"
            height="941"
          />
        </div>
        <div className="brand-story-copy">
          <Entrance effect="rise">
            <h2>
              El gusto por
              <br />
              el detalle
            </h2>
          </Entrance>
          <Entrance delay={80}>
            <p className="story-statement">
              Tradición, calidad y exclusividad definen Los Patricios Gourmet.
            </p>
          </Entrance>
          <Entrance delay={150}>
            <p>
              De la primera elección al último detalle de la mesa. Un espacio
              para descubrir ingredientes con personalidad y encontrar la
              presentación que acompaña tu ocasión.
            </p>
          </Entrance>
          <Entrance delay={220}>
            <Link href={`/${country}/catalogo`} className="light-link">
              Encuentra tu ingrediente <Icon />
            </Link>
          </Entrance>
        </div>
      </section>
      <section className="table-section">
        <Entrance effect="rise" className="table-heading">
          <h2>Tu próxima mesa</h2>
          <p>Del ingrediente al encuentro.</p>
        </Entrance>
        <div className="table-steps">
          <Entrance delay={60}>
            <h3>Elige el ingrediente</h3>
            <p>
              Explora el catálogo de {market.name} y descubre cada selección en
              detalle.
            </p>
            <Link href={`/${country}/catalogo`}>
              Explorar catálogo <Icon />
            </Link>
          </Entrance>
          <Entrance delay={130}>
            <h3>Encuentra tu presentación</h3>
            <p>
              Elige un peso fijo, con precio y disponibilidad propios. Sin
              cálculos por peso variable.
            </p>
            <Link href={`/${country}/producto/${market.products[0].slug}`}>
              Ver presentaciones <Icon />
            </Link>
          </Entrance>
          <Entrance delay={200}>
            <h3>Recíbelo a domicilio</h3>
            <p>
              Entrega a domicilio. Las zonas, tarifas y condiciones se
              confirmarán antes del lanzamiento.
            </p>
            <Link href={`/${country}/carrito`}>
              Ver mi selección <Icon />
            </Link>
          </Entrance>
        </div>
      </section>
    </main>
  );
}
