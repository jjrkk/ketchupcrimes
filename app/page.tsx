"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import CrimeTape from "@/components/ui/CrimeTape";
import Stamp from "@/components/ui/Stamp";

const PRODUCTS = [
  { id: "EXH-001", name: "Exhibit A — The Classic Tee", image: "/images/designs/ketchup-is-a-crime.jpeg" },
  { id: "EXH-002", name: "Case File Mug", image: "/images/designs/evidence-label.jpeg" },
  { id: "EXH-003", name: "Evidence Sticker Pack", image: "/images/designs/wanted-heinz.jpeg" },
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setError("Transmission failed. Please attempt to file your report again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-crime-black">
      <Nav />

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative px-6 pt-20 pb-0 md:px-16 max-w-6xl mx-auto">
        {/* Stamp — positioned relative to section, sits at top-right corner of headline block */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: [0.8, 1.05, 1.0] }}
          transition={{ delay: 0.6, duration: 0.45, times: [0, 0.6, 1] }}
          className="absolute top-12 right-6 md:right-16 hidden sm:block"
        >
          <Stamp text="COMING SOON" rotation={-3} />
        </motion.div>

        <div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="font-headline font-extrabold text-parchment uppercase leading-none text-5xl sm:text-6xl md:text-7xl"
          >
            THE INVESTIGATION<br />IS UNDERWAY.
          </motion.h1>

          {/* Mobile stamp — below headline, inline */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: [0.8, 1.05, 1.0] }}
            transition={{ delay: 0.6, duration: 0.45, times: [0, 0.6, 1] }}
            className="mt-4 sm:hidden"
          >
            <Stamp text="COMING SOON" rotation={-2} width={240} height={88} fontSize={18} />
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="font-document text-parchment/70 text-lg md:text-xl mt-8 max-w-xl leading-relaxed"
        >
          The Bureau of Ketchup Enforcement is preparing its case.
          <br />
          Evidence is being compiled. Charges will be filed.
        </motion.p>
      </section>

      {/* ── Crime tape divider ─────────────────────────────── */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        transition={{ delay: 1.0, duration: 0.8, ease: "easeOut" }}
        className="mt-16 overflow-hidden"
      >
        <CrimeTape height={32} />
      </motion.div>

      {/* ── Email capture ──────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.4 }}
        className="px-6 py-20 md:px-16 max-w-2xl mx-auto"
      >
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div key="form" exit={{ opacity: 0 }}>
              <p className="font-label text-parchment text-xs tracking-[0.08em] uppercase mb-5">
                REQUEST CASE FILE UPDATES — CLASSIFIED DISTRIBUTION LIST
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                  className="flex-1 bg-parchment text-crime-black font-document px-4 py-3 border border-evidence-red outline-none focus:ring-2 focus:ring-evidence-red placeholder:text-crime-black/40"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-crime-black text-parchment font-headline font-extrabold uppercase px-8 py-3 border border-parchment/30 hover:border-parchment transition-colors disabled:opacity-50 whitespace-nowrap tracking-wider"
                >
                  {loading ? "FILING..." : "FILE YOUR REPORT"}
                </button>
              </form>
              {error && (
                <p className="font-label text-evidence-red text-xs mt-3">{error}</p>
              )}
              <p className="font-label text-muted-gray text-xs mt-4 tracking-wide">
                Your information will be held as evidence. No ketchup sympathisers.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-parchment p-10 flex flex-col items-center text-center"
            >
              <Stamp text="APPROVED" colour="#2A7A2A" rotation={-2} />
              <p className="font-document text-crime-black mt-6 text-lg leading-relaxed">
                Your report has been received.
                <br />
                Case file updates incoming.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>

      {/* ── Crime tape divider (second) ─────────────────────── */}
      <CrimeTape height={32} />

      {/* ── Evidence locker teaser ────────────────────────── */}
      <section className="px-6 py-16 md:px-16 max-w-6xl mx-auto">
        <p className="font-label text-muted-gray text-xs tracking-[0.08em] uppercase mb-10">
          EVIDENCE CURRENTLY UNDER REVIEW
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 + i * 0.1, duration: 0.4 }}
              className="relative bg-parchment p-4"
              style={{ border: "1px solid rgba(245, 240, 232, 0.2)" }}
            >
              {/* Bureau label */}
              <p className="font-label text-muted-gray tracking-[0.08em] mb-1" style={{ fontSize: "9px" }}>
                BUREAU OF KETCHUP ENFORCEMENT
              </p>
              {/* Case number */}
              <p className="font-label text-xs text-crime-black/50 mb-3 tracking-[0.08em]">
                {product.id}
              </p>
              {/* Product image */}
              <div className="relative w-full aspect-square mb-4 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              {/* Product name */}
              <p className="font-document text-crime-black text-sm font-bold leading-snug" style={{ fontFamily: "'Courier Prime', monospace" }}>
                {product.name}
              </p>
            </motion.div>
          ))}
        </div>

        <p className="font-label text-muted-gray text-xs tracking-wide mt-8">
          Evidence release date: TBD. Stand by for case updates.
        </p>
      </section>

      <Footer />
    </main>
  );
}
