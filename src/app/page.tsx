"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Script from "next/script";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

function FadeSection({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const pillars = [
  {
    number: "01",
    title: "Decode",
    body: "We identify the patterns keeping you stuck. Your mindset, your habits, your internal dialogue. Nothing gets skipped over, nothing gets masked.",
  },
  {
    number: "02",
    title: "Interrupt",
    body: "You learn to actually break the cycles. Nervous system regulation, nutrition that works with your body, and a mindset that stops working against you.",
  },
  {
    number: "03",
    title: "Rebuild",
    body: "This is where the glow comes from. Real, sustainable habits that stick because they fit you specifically, not some generic program built for someone else.",
  },
];

const testimonials = [
  {
    name: "Sarah M.",
    quote: "My skin has never looked better. I get asked about it constantly.",
  },
  {
    name: "Jordan L.",
    quote: "I was skeptical at first but after just a few weeks I was completely hooked.",
  },
  {
    name: "Alex R.",
    quote: "Grace genuinely changed how I feel in my own skin. Worth every penny.",
  },
];

export default function Home() {
  const ctaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLIFrameElement>(null);

  const initPlayer = () => {
    if (!videoRef.current || typeof window === "undefined") return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const player = (window as any).Stream(videoRef.current);
    player.addEventListener("play", () => {
      videoRef.current?.requestFullscreen?.();
    });
  };

  return (
    <main className="overflow-x-hidden" style={{ color: "var(--text)" }}>

      {/* ── NAV ── */}
      <nav
        className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-8 py-5"
        style={{ background: "rgba(245,238,230,0.85)", backdropFilter: "blur(12px)" }}
      >
        <span className="text-xl tracking-wide" style={{ fontFamily: "var(--font-playfair)" }}>
          The Gracie Glow
        </span>
        <a
          href="https://www.instagram.com/thegracieglow"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity"
        >
          @thegracieglow
        </a>
      </nav>

      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-20 overflow-hidden"
        style={{ background: "linear-gradient(160deg, var(--cream) 0%, #f0ece6 60%, var(--sage) 100%)" }}
      >
        <div className="float-blob absolute -top-20 -left-20 w-96 h-96 rounded-full opacity-25 pointer-events-none"
          style={{ background: "radial-gradient(circle, var(--blush), transparent 70%)" }} />
        <div className="float-blob-slow absolute bottom-10 -right-24 w-80 h-80 rounded-full opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, var(--sage), transparent 70%)" }} />
        <div className="float-blob absolute top-1/3 -right-10 w-56 h-56 rounded-full opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, var(--mauve), transparent 70%)", animationDelay: "3s" }} />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative z-10 flex flex-col items-center text-center max-w-3xl"
        >
          <motion.p variants={fadeUp} className="text-sm tracking-[0.25em] uppercase opacity-60 mb-4">
            A message from Grace
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="shimmer-text text-5xl md:text-7xl leading-tight mb-6"
            style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
          >
            Your Glow Era
            <br />
            Starts Here.
          </motion.h1>

          <motion.p variants={fadeUp} className="text-sm opacity-50 max-w-sm mb-8 leading-relaxed tracking-wide">
            Watch before scrolling further.
          </motion.p>

          <motion.div
            variants={fadeUp}
            style={{ aspectRatio: "16/9", width: "min(90vw, 1100px)" }}
            className="video-card rounded-3xl overflow-hidden shadow-2xl mb-10"
          >
            <iframe
              ref={videoRef}
              className="w-full h-full"
              src="https://iframe.videodelivery.net/fc1afea69705d57a245df35b36af48f3?poster=https%3A%2F%2Fvideodelivery.net%2Ffc1afea69705d57a245df35b36af48f3%2Fthumbnails%2Fthumbnail.jpg%3Fwidth%3D1920%26height%3D1080"
              title="The Gracie Glow VSL"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              style={{ border: "none" }}
            />
          </motion.div>

          <motion.button
            variants={fadeUp}
            onClick={() => ctaRef.current?.scrollIntoView({ behavior: "smooth" })}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="btn-glow px-10 py-4 rounded-full text-base tracking-widest uppercase font-medium transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, var(--mauve), var(--blush))",
              color: "var(--text)",
              boxShadow: "0 8px 30px rgba(211,184,174,0.5)",
            }}
          >
            Apply now →
          </motion.button>
        </motion.div>
      </section>

      {/* ── PROBLEM ── */}
      <section className="py-24 px-6" style={{ background: "var(--cream)" }}>
        <FadeSection className="max-w-2xl mx-auto text-center">
          <motion.p variants={fadeUp} className="text-sm tracking-[0.25em] uppercase opacity-50 mb-4">
            Sound familiar?
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl mb-12 leading-snug"
            style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
          >
            Quietly exhausted.
            <br />
            Still showing up.
          </motion.h2>

          <div className="flex flex-col gap-5 text-left">
            {[
              "You're doing all the right things and still don't feel like yourself.",
              "You've tried new routines, new diets, new mindsets. The results never last.",
              "You're overwhelmed by conflicting advice and don't know who to actually trust.",
              "You're tired of running on empty while looking fine on the outside.",
            ].map((item) => (
              <motion.div
                key={item}
                variants={fadeUp}
                className="flex items-start gap-4 p-5 rounded-2xl"
                style={{ background: "var(--blush)", opacity: 0.9 }}
              >
                <span className="mt-0.5 text-lg leading-none" style={{ color: "var(--mauve)" }}>✦</span>
                <p className="text-base leading-relaxed opacity-80">{item}</p>
              </motion.div>
            ))}
          </div>
        </FadeSection>
      </section>

      {/* ── REFRAME ── */}
      <section
        className="py-24 px-6 text-center"
        style={{ background: "linear-gradient(160deg, var(--sage) 0%, var(--cream) 100%)" }}
      >
        <FadeSection className="max-w-2xl mx-auto">
          <motion.p variants={fadeUp} className="text-sm tracking-[0.25em] uppercase opacity-50 mb-4">
            Here&apos;s the truth
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl leading-snug mb-6"
            style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
          >
            You are not broken.
            <br />
            You are patterned.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg opacity-70 leading-relaxed max-w-xl mx-auto">
            The habits, the cycles, the way you feel in your body. These are patterns. And patterns can change. The next 12 weeks are about understanding yours and rebuilding from the inside out.
          </motion.p>
        </FadeSection>
      </section>

      {/* ── PILLARS ── */}
      <section className="py-24 px-6" style={{ background: "var(--cream)" }}>
        <FadeSection className="max-w-5xl mx-auto">
          <motion.div variants={fadeUp} className="text-center mb-16">
            <p className="text-sm tracking-[0.25em] uppercase opacity-50 mb-3">The 12-week program</p>
            <h2
              className="text-4xl md:text-5xl"
              style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
            >
              How It Works
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((p) => (
              <motion.div
                key={p.number}
                variants={fadeUp}
                className="video-card flex flex-col p-8 rounded-3xl"
                style={{
                  background: "var(--blush)",
                  boxShadow: "0 8px 40px rgba(211,184,174,0.2)",
                }}
              >
                <span
                  className="text-5xl font-light mb-6 opacity-30"
                  style={{ fontFamily: "var(--font-playfair)", color: "var(--mauve)" }}
                >
                  {p.number}
                </span>
                <h3
                  className="text-xl mb-3"
                  style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
                >
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed opacity-70">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </FadeSection>
      </section>

      {/* ── MID-PAGE CTA ── */}
      <section className="py-16 px-6 text-center" style={{ background: "#edeae4" }}>
        <FadeSection className="max-w-xl mx-auto flex flex-col items-center gap-6">
          <motion.p
            variants={fadeUp}
            className="text-2xl md:text-3xl leading-snug"
            style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
          >
            Ready to see if this is the right fit for you?
          </motion.p>
          <motion.div variants={fadeUp}>
            <motion.a
              href="/apply"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="btn-glow inline-block px-10 py-4 rounded-full text-sm tracking-widest uppercase font-medium transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, var(--blush), var(--mauve))",
                color: "var(--text)",
                boxShadow: "0 8px 30px rgba(211,184,174,0.4)",
              }}
            >
              Apply now →
            </motion.a>
          </motion.div>
        </FadeSection>
      </section>

      {/* ── WHAT WE COVER ── */}
      <section className="py-24 px-6" style={{ background: "var(--sage)" }}>
        <FadeSection className="max-w-4xl mx-auto">
          <motion.div variants={fadeUp} className="text-center mb-16">
            <p className="text-sm tracking-[0.25em] uppercase opacity-50 mb-3">Inside the program</p>
            <h2
              className="text-4xl md:text-5xl"
              style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
            >
              What We Actually Work On
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "✦",
                title: "Mindset and Internal Dialogue",
                body: "The way you talk to yourself shapes everything. We work on recalibrating the patterns of thought that keep you stuck in the same cycles.",
              },
              {
                icon: "◎",
                title: "Nervous System Regulation",
                body: "Chronic stress lives in the body, not just the mind. You'll learn practical tools to interrupt anxiety and bring yourself back to balance.",
              },
              {
                icon: "❋",
                title: "Nutrition and Metabolism",
                body: "Not another diet. We focus on how to actually fuel your body in a way that feels sustainable and works with your biology, not against it.",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="video-card flex flex-col gap-4 p-8 rounded-3xl"
                style={{ background: "var(--cream)", boxShadow: "0 8px 40px rgba(211,184,174,0.15)" }}
              >
                <span className="text-2xl" style={{ color: "var(--mauve)" }}>{item.icon}</span>
                <h3 className="text-xl" style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed opacity-70">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </FadeSection>
      </section>

      {/* ── SOCIAL PROOF BAR ── */}
      <section
        className="py-8 px-6"
        style={{ background: "var(--cream)", borderTop: "1px solid rgba(211,184,174,0.3)", borderBottom: "1px solid rgba(211,184,174,0.3)" }}
      >
        <FadeSection className="flex flex-wrap items-center justify-center gap-10 md:gap-20 text-center">
          {[
            { stat: "12 Weeks", label: "1:1 Program Length" },
            { stat: "Limited", label: "Spots Available" },
            { stat: "⭐⭐⭐⭐⭐", label: "Client Results" },
          ].map((item) => (
            <motion.div key={item.label} variants={fadeUp}>
              <div className="text-2xl font-semibold" style={{ fontFamily: "var(--font-playfair)" }}>
                {item.stat}
              </div>
              <div className="text-xs tracking-widest uppercase opacity-60 mt-1">{item.label}</div>
            </motion.div>
          ))}
        </FadeSection>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section
        className="py-24 px-6"
        style={{ background: "linear-gradient(180deg, var(--cream) 0%, #edeae4 100%)" }}
      >
        <FadeSection className="max-w-5xl mx-auto">
          <motion.div variants={fadeUp} className="text-center mb-16">
            <p className="text-sm tracking-[0.25em] uppercase opacity-50 mb-3">Don&apos;t take my word for it</p>
            <h2
              className="text-4xl md:text-5xl"
              style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
            >
              Real People. Real Results.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                variants={fadeUp}
                className="video-card rounded-3xl overflow-hidden flex flex-col"
                style={{ background: "var(--cream)", boxShadow: "0 8px 40px rgba(211,184,174,0.25)" }}
              >
                {/* Swap for real video embed or thumbnail */}
                <div
                  className="relative flex items-center justify-center"
                  style={{ background: "var(--sage)", aspectRatio: "4/5" }}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                    style={{ background: "rgba(245,238,230,0.9)" }}
                  >
                    <svg className="w-6 h-6 ml-1" viewBox="0 0 24 24" fill="currentColor" style={{ color: "var(--text)" }}>
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-base leading-relaxed opacity-75 mb-4 italic">&ldquo;{t.quote}&rdquo;</p>
                  <p className="text-sm font-medium tracking-wide">{t.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </FadeSection>
      </section>

      {/* ── CTA ── */}
      <section
        ref={ctaRef}
        className="relative py-28 px-6 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #2c2c2c 0%, #3d3530 100%)" }}
      >
        <div className="float-blob-slow absolute -top-16 -right-16 w-72 h-72 rounded-full opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, var(--blush), transparent 70%)" }} />
        <div className="float-blob absolute -bottom-10 -left-10 w-56 h-56 rounded-full opacity-15 pointer-events-none"
          style={{ background: "radial-gradient(circle, var(--mauve), transparent 70%)" }} />

        <FadeSection className="relative z-10 max-w-xl mx-auto text-center">
          <motion.p variants={fadeUp} className="text-sm tracking-[0.25em] uppercase mb-4" style={{ color: "var(--mauve)" }}>
            Spots are limited
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl mb-6"
            style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, color: "var(--cream)" }}
          >
            Ready to find out
            <br />
            if this is for you?
          </motion.h2>

          <motion.p variants={fadeUp} className="text-base mb-10 leading-relaxed" style={{ color: "rgba(245,238,230,0.6)" }}>
            Apply below and Grace will reach out personally. No pressure, just a real conversation about where you're at and whether this is the right fit.
          </motion.p>

          <motion.div variants={fadeUp}>
            <motion.a
              href="/apply"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="btn-glow inline-block px-12 py-4 rounded-full text-base tracking-widest uppercase font-medium transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, var(--blush), var(--mauve))",
                color: "var(--text)",
                boxShadow: "0 8px 30px rgba(211,184,174,0.35)",
              }}
            >
              Apply now →
            </motion.a>
          </motion.div>
        </FadeSection>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-10 px-6 text-center" style={{ background: "#2c2c2c" }}>
        <p className="text-sm tracking-widest uppercase" style={{ color: "rgba(245,238,230,0.35)" }}>
          © {new Date().getFullYear()} The Gracie Glow &nbsp;·&nbsp;{" "}
          <a
            href="https://www.instagram.com/thegracieglow"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            @thegracieglow
          </a>
        </p>
      </footer>

      <Script
        src="https://embed.cloudflarestream.com/embed/sdk.latest.min.js"
        onLoad={initPlayer}
      />
    </main>
  );
}
