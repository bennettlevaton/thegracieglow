"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const whenOptions = [
  "Morning", "Night", "At work", "Around food", "In relationships", "Social situations", "Other",
];

const howLongOptions = [
  "Less than 6 months",
  "6 months to 1 year",
  "1 to 3 years",
  "3 to 5 years",
  "5+ years",
];

const inputStyle = {
  background: "rgba(245,238,230,0.8)",
  color: "#2c2c2c",
  border: "1.5px solid rgba(211,184,174,0.5)",
};

export default function ApplyPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    oneThhing: "",
    whenItHappens: [] as string[],
    whenOther: "",
    triedBefore: "",
    howLong: "",
    resolved: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const set = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const toggleWhen = (option: string) => {
    setForm((prev) => ({
      ...prev,
      whenItHappens: prev.whenItHappens.includes(option)
        ? prev.whenItHappens.filter((o) => o !== option)
        : [...prev.whenItHappens, option],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const whenItHappens = [
      ...form.whenItHappens.filter((o) => o !== "Other"),
      form.whenItHappens.includes("Other") && form.whenOther ? `Other: ${form.whenOther}` : null,
    ]
      .filter(Boolean)
      .join(", ");

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, whenItHappens, _trap: "" }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <main
        className="min-h-screen flex items-center justify-center px-6"
        style={{ background: "linear-gradient(160deg, var(--cream) 0%, var(--blush) 100%)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-md"
        >
          <p className="text-4xl mb-6">✦</p>
          <h1
            className="text-4xl mb-4"
            style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, color: "#2c2c2c" }}
          >
            Application received.
          </h1>
          <p className="text-base opacity-70 leading-relaxed mb-8" style={{ color: "#2c2c2c" }}>
            Grace will be in touch personally within 48 hours. Keep an eye on your inbox.
          </p>
          <motion.a
            href="/"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block px-8 py-3 rounded-full text-sm tracking-widest uppercase font-medium transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, var(--blush), var(--mauve))",
              color: "#2c2c2c",
              boxShadow: "0 8px 30px rgba(211,184,174,0.4)",
            }}
          >
            Back to home
          </motion.a>
        </motion.div>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen px-6 py-20"
      style={{ background: "linear-gradient(160deg, var(--cream) 0%, var(--blush) 60%, var(--mauve) 100%)", color: "#2c2c2c" }}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        className="max-w-2xl mx-auto"
      >
        <motion.a
          variants={fadeUp}
          href="/"
          className="inline-block text-sm tracking-widest uppercase opacity-50 hover:opacity-80 transition-opacity mb-12"
        >
          ← Back
        </motion.a>

        <motion.p variants={fadeUp} className="text-sm tracking-[0.25em] uppercase opacity-50 mb-3">
          12-week 1:1 program
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="text-4xl md:text-5xl mb-4 leading-tight"
          style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
        >
          Apply to Work with Grace
        </motion.h1>

        <motion.p variants={fadeUp} className="text-base opacity-65 mb-12 leading-relaxed">
          Take a few minutes to answer honestly. Grace reads every application personally and will reach out within 48 hours.
        </motion.p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <input type="text" name="_trap" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
          {/* Name + Email */}
          <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium tracking-wide">Name <span style={{ color: "var(--mauve)" }}>*</span></label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Your name"
                className="px-5 py-3 rounded-2xl text-sm outline-none transition-shadow focus:shadow-md"
                style={inputStyle}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium tracking-wide">Email <span style={{ color: "var(--mauve)" }}>*</span></label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="your@email.com"
                className="px-5 py-3 rounded-2xl text-sm outline-none transition-shadow focus:shadow-md"
                style={inputStyle}
              />
            </div>
          </motion.div>

          {/* Phone */}
          <motion.div variants={fadeUp} className="flex flex-col gap-2">
            <label className="text-sm font-medium tracking-wide">
              Phone <span className="opacity-40 font-normal">(optional)</span>
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              placeholder="+1 (000) 000-0000"
              className="px-5 py-3 rounded-2xl text-sm outline-none transition-shadow focus:shadow-md"
              style={inputStyle}
            />
          </motion.div>

          {/* Main question */}
          <motion.div variants={fadeUp} className="flex flex-col gap-2">
            <label className="text-sm font-medium tracking-wide leading-relaxed">
              What is the one thing you keep telling yourself you&apos;re going to change but haven&apos;t yet? <span style={{ color: "var(--mauve)" }}>*</span>
            </label>
            <textarea
              required
              rows={4}
              value={form.oneThhing}
              onChange={(e) => set("oneThhing", e.target.value)}
              placeholder="Be as honest as you can..."
              className="px-5 py-3 rounded-2xl text-sm outline-none transition-shadow focus:shadow-md resize-none"
              style={inputStyle}
            />
          </motion.div>

          {/* When it happens */}
          <motion.div variants={fadeUp} className="flex flex-col gap-3">
            <label className="text-sm font-medium tracking-wide">
              When do you notice it happening most? <span className="opacity-40 font-normal">(select all that apply)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {whenOptions.map((opt) => {
                const active = form.whenItHappens.includes(opt);
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => toggleWhen(opt)}
                    className="px-4 py-2 rounded-full text-sm transition-all duration-200"
                    style={{
                      background: active ? "var(--mauve)" : "rgba(245,238,230,0.8)",
                      color: "#2c2c2c",
                      border: `1.5px solid ${active ? "var(--mauve)" : "rgba(211,184,174,0.5)"}`,
                    }}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {form.whenItHappens.includes("Other") && (
              <input
                type="text"
                value={form.whenOther}
                onChange={(e) => set("whenOther", e.target.value)}
                placeholder="Tell us more..."
                className="px-5 py-3 rounded-2xl text-sm outline-none transition-shadow focus:shadow-md"
                style={inputStyle}
              />
            )}
          </motion.div>

          {/* What they've tried */}
          <motion.div variants={fadeUp} className="flex flex-col gap-2">
            <label className="text-sm font-medium tracking-wide">What have you already tried to fix it?</label>
            <textarea
              rows={3}
              value={form.triedBefore}
              onChange={(e) => set("triedBefore", e.target.value)}
              placeholder="Diets, routines, therapy, books, programs..."
              className="px-5 py-3 rounded-2xl text-sm outline-none transition-shadow focus:shadow-md resize-none"
              style={inputStyle}
            />
          </motion.div>

          {/* How long */}
          <motion.div variants={fadeUp} className="flex flex-col gap-3">
            <label className="text-sm font-medium tracking-wide">How long has this been going on?</label>
            <div className="flex flex-wrap gap-2">
              {howLongOptions.map((opt) => {
                const active = form.howLong === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => set("howLong", active ? "" : opt)}
                    className="px-4 py-2 rounded-full text-sm transition-all duration-200"
                    style={{
                      background: active ? "var(--mauve)" : "rgba(245,238,230,0.8)",
                      color: "#2c2c2c",
                      border: `1.5px solid ${active ? "var(--mauve)" : "rgba(211,184,174,0.5)"}`,
                    }}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Future pacing */}
          <motion.div variants={fadeUp} className="flex flex-col gap-2">
            <label className="text-sm font-medium tracking-wide leading-relaxed">
              What would your life look like a year from now?
            </label>
            <textarea
              rows={4}
              value={form.resolved}
              onChange={(e) => set("resolved", e.target.value)}
              placeholder="Paint the picture..."
              className="px-5 py-3 rounded-2xl text-sm outline-none transition-shadow focus:shadow-md resize-none"
              style={inputStyle}
            />
          </motion.div>

          {/* Submit */}
          <motion.div variants={fadeUp}>
            {status === "error" && (
              <p className="text-sm mb-4 opacity-70" style={{ color: "#c0392b" }}>
                Something went wrong. Please try again or email Grace directly.
              </p>
            )}
            <motion.button
              type="submit"
              disabled={status === "loading"}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-4 rounded-full text-sm tracking-widest uppercase font-medium transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, var(--blush), var(--mauve))",
                color: "#2c2c2c",
                boxShadow: "0 8px 30px rgba(211,184,174,0.4)",
                opacity: status === "loading" ? 0.6 : 1,
              }}
            >
              {status === "loading" ? "Submitting..." : "Submit application →"}
            </motion.button>
          </motion.div>
        </form>
      </motion.div>
    </main>
  );
}
