export function Icon({
  name = "arrow",
  className = "",
}: {
  name?:
    | "arrow"
    | "bag"
    | "close"
    | "menu"
    | "chevron"
    | "check"
    | "search"
    | "plus"
    | "minus";
  className?: string;
}) {
  const paths = {
    arrow: "M5 19 19 5M5 5h14v14",
    bag: "M4 8h16l-1 13H5L4 8Zm4 1V6a4 4 0 0 1 8 0v3",
    close: "m6 6 12 12M6 18 18 6",
    menu: "M3 8h18M3 16h18",
    chevron: "m7 10 5 5 5-5",
    check: "m5 12 4 4L19 6",
    search: "m16 16 5 5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z",
    plus: "M12 5v14M5 12h14",
    minus: "M5 12h14",
  };
  return (
    <svg
      className={`icon ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}
