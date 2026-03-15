export default function Nav() {
  return (
    <nav className="w-full bg-crime-black px-6 md:px-16 py-5 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(204, 34, 0, 0.3)" }}>
      <span className="font-headline font-extrabold text-parchment text-2xl uppercase tracking-wider">
        KETCHUP CRIMES
      </span>
      <span className="font-label text-muted-gray text-xs tracking-[0.08em] hidden sm:block">
        CASE #00001 — INVESTIGATION IN PROGRESS
      </span>
    </nav>
  );
}
