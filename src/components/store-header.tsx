"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/features/cart/cart-context";
import { Country, markets } from "@/data/markets";
import { BrandLogo } from "./brand-logo";
import { Icon } from "./icon";
export function StoreHeader({ country }: { country: Country }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const { forCountry } = useCart();
  const path = usePathname();
  const count = forCountry(country).reduce((n, line) => n + line.quantity, 0);
  const base = `/${country}`;
  useEffect(() => {
    if (!open) return;
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [open]);
  return (
    <>
      <a className="skip-link" href="#main-content">
        Saltar al contenido
      </a>
      <div className="pilot-ribbon">
        Piloto de experiencia{" "}
        <span>Imágenes y precios de muestra · sin cobros reales</span>
      </div>
      <header className="store-header">
        <BrandLogo href={base} light />
        <nav
          id="store-navigation"
          className={`store-nav ${open ? "is-open" : ""}`}
          aria-label="Navegación principal"
        >
          <Link
            href={base}
            aria-current={
              path === `${base}/` || path === base ? "page" : undefined
            }
            onClick={() => setOpen(false)}
          >
            Inicio
          </Link>
          <Link
            href={`${base}/catalogo`}
            aria-current={path.includes("catalogo") ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            Colección
          </Link>
          <Link href={`${base}/#esencia`} onClick={() => setOpen(false)}>
            La esencia
          </Link>
        </nav>
        <div className="store-actions">
          <label className="country-select">
            <span className="sr-only">País de compra</span>
            <select
              value={country}
              onChange={(e) => {
                window.location.href = `/${e.target.value}/`;
              }}
            >
              <option value="pe">Perú · PEN</option>
              <option value="cl">Chile · CLP</option>
            </select>
          </label>
          <Link
            className="bag-link"
            href={`${base}/carrito`}
            aria-label={`Carrito, ${count} productos`}
          >
            <Icon name="bag" />
            <span>{count}</span>
          </Link>
          <button
            ref={toggle}
            className="menu-toggle"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls="store-navigation"
            onClick={() => setOpen(!open)}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </header>
    </>
  );
}
export function StoreFooter({ country }: { country: Country }) {
  return (
    <footer className="store-footer">
      <div className="footer-image">
        <img
          src="/images/caviar-piloto.png"
          alt="Caviar, fotografía de muestra del piloto"
          width="1672"
          height="941"
          loading="lazy"
        />
      </div>
      <div className="footer-content">
        <BrandLogo href={`/${country}`} light />
        <p>El placer de elegir bien.</p>
        <nav aria-label="Navegación del pie de página">
          <Link href={`/${country}/catalogo`}>
            La colección <Icon />
          </Link>
          <Link href={`/${country}/carrito`}>
            Mi selección <Icon />
          </Link>
          <Link href={country === "pe" ? "/cl" : "/pe"}>
            Explorar {country === "pe" ? "Chile" : "Perú"} <Icon />
          </Link>
        </nav>
        <div className="footer-note">
          <p>
            Estás explorando {markets[country].name}.<br />
            Solo entrega a domicilio. Cobertura por definir.
          </p>
          <Link href="/admin-demo">Administración demo</Link>
        </div>
      </div>
      <div className="footer-signature" aria-hidden="true">
        Los Patricios
      </div>
      <div className="footer-bottom">
        <span>Los Patricios Gourmet · Piloto experimental</span>
        <p>
          Fotografías generadas para el piloto. Productos, presentaciones,
          precios y stock de muestra. Sin pedidos ni pagos reales.
        </p>
      </div>
    </footer>
  );
}
