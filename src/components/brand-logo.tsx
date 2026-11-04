import Link from "next/link";

export function BrandLogo({
  href = "/",
  light = false,
}: {
  href?: string;
  light?: boolean;
}) {
  return (
    <Link
      className={`brand-logo ${light ? "brand-logo-light" : ""}`}
      href={href}
      aria-label="Los Patricios Gourmet, ir al inicio"
    >
      <img
        src={
          light
            ? "/brand/logo-dark-official.png"
            : "/brand/logo-light-official.png"
        }
        alt="Los Patricios Gourmet"
      />
    </Link>
  );
}
