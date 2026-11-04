import Link from "next/link";
import { Country, formatPrice, Product } from "@/data/markets";
import { Icon } from "./icon";
import { Entrance } from "./entrance";

export function ProductCard({
  country,
  product,
  index = 0,
}: {
  country: Country;
  product: Product;
  index?: number;
}) {
  return (
    <Entrance delay={Math.min(index * 70, 280)} className="product-card">
      <Link
        href={`/${country}/producto/${product.slug}`}
        className="product-card-link"
        aria-label={`Ver ${product.name}`}
      >
        <div className="product-card-image">
          <img
            src={product.image}
            alt={`Imagen provisional de ${product.name}`}
          />
          <span className="product-card-arrow" aria-hidden="true">
            <Icon />
          </span>
        </div>
        <h3 className="catalog-product-title">{product.name}</h3>
        <div className="product-card-meta">
          <span>Desde {formatPrice(country, product.variants[0].price)}</span>
        </div>
        <p>{product.short}</p>
      </Link>
    </Entrance>
  );
}
