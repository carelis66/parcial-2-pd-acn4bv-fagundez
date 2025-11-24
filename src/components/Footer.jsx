
export default function Footer() {
  return (
    <footer className="text-center p-3" style={{ backgroundColor: "#000" }}>
      <p className="text-light m-0">
        © {new Date().getFullYear()} Élite SPA — Cuidado Premium
      </p>
    </footer>
  );
}
