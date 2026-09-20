const paths = {
  arrow: "M5 12h14M13 6l6 6-6 6",
  menu: "M4 6h16M4 12h16M4 18h16",
  close: "M6 6l12 12M18 6L6 18",
  external: "M14 5h5v5M19 5l-9 9M5 19h14V10",
  github: "M9 19c-4.5 1.5-4.5-2.25-6.5-2.75M15 19v-3.87a3.37 3.37 0 0 0-.94-2.61c3.12-.35 6.4-1.53 6.4-6.75a5.26 5.26 0 0 0-1.4-3.64 4.9 4.9 0 0 0-.14-3.61s-1.14-.36-3.75 1.39a12.9 12.9 0 0 0-6.34 0C6.22-1.84 5.08-1.48 5.08-1.48a4.9 4.9 0 0 0-.14 3.61 5.26 5.26 0 0 0-1.4 3.64c0 5.2 3.26 6.4 6.38 6.76A3.37 3.37 0 0 0 9 15.13V19",
  moon: "M20.5 15.2A8.5 8.5 0 0 1 8.8 3.5 8.5 8.5 0 1 0 20.5 15.2Z",
  sun: "M12 3v2M12 19v2M5.64 5.64l1.42 1.42M16.94 16.94l1.42 1.42M3 12h2M19 12h2M5.64 18.36l1.42-1.42M16.94 7.06l1.42-1.42M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z",
};

function Icon({ name = "arrow", size = 18, strokeWidth = 1.7, className = "" }) {
  const path = paths[name];
  if (!path) return null;
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}

export default Icon;
