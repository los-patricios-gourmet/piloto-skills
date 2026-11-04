import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { Entrance } from "@/components/entrance";
import { Icon } from "@/components/icon";
export default function CountryEntry() {
  return (
    <main className="entry-page">
      <header className="entry-top">
        <BrandLogo light />
        <span>Tradición. Calidad. Exclusividad.</span>
      </header>
      <div className="entry-layout">
        <div className="entry-copy">
          <Entrance>
            <h1>
              El gusto
              <br />
              de elegir
            </h1>
          </Entrance>
          <Entrance delay={90}>
            <p>
              Los Patricios Gourmet. Ingredientes de excepción para tu mesa, en
              Perú y Chile.
            </p>
          </Entrance>
          <Entrance delay={150}>
            <div className="entry-markets">
              <Link href="/pe">
                <span>
                  Perú
                  <Icon />
                </span>
                <small>Caviar y trufas · S/</small>
              </Link>
              <Link href="/cl">
                <span>
                  Chile
                  <Icon />
                </span>
                <small>Caviar, trufas, Wagyu y foie gras · CLP</small>
              </Link>
            </div>
          </Entrance>
        </div>
        <div className="entry-visual">
          <img
            src="/images/caviar-piloto.png"
            alt="Caviar sobre piedra oscura, fotografía de muestra"
            width="1672"
            height="941"
            fetchPriority="high"
          />
          <span>La excepción está en el ingrediente.</span>
        </div>
      </div>
      <footer className="entry-bottom">
        <span>Piloto visual · imágenes y precios de muestra · sin cobros</span>
        <Link href="/admin-demo">
          Administración demo <Icon />
        </Link>
      </footer>
    </main>
  );
}
