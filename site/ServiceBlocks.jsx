// Reusable blocks for Услуги / Услуга pages.

// Breadcrumb
function Crumbs({ trail }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9, flexWrap: "wrap", marginBottom: 26 }}>
      {trail.map((c, i) => (
        <React.Fragment key={i}>
          {i > 0 && <Icon name="chevron" size={13} stroke={1.8} color="var(--ml-text-muted)" />}
          {c.href
            ? <a href={c.href} style={{ font: "400 13px Inter", color: "var(--ml-text-nav)", textDecoration: "none" }}>{c.label}</a>
            : <span style={{ font: "400 13px Inter", color: "var(--ml-text-muted)" }}>{c.label}</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

// Generic page hero: eyebrow + title + lead + optional actions + side visual
function PageHero({ eyebrow, title, lead, actions, crumbs, visual = true, visualIcon = "building", visualLabel }) {
  return (
    <Section style={{ paddingTop: 48 }}>
      {crumbs && <Crumbs trail={crumbs} />}
      <div style={{ display: "grid", gridTemplateColumns: visual ? "1fr 520px" : "1fr", gap: 56, alignItems: "center" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 9, marginBottom: 22 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#141414" }} />
            <span style={{ font: "500 12px Inter", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ml-text-nav)" }}>{eyebrow}</span>
          </div>
          <h1 style={{ margin: 0, font: "500 46px/1.08 Inter", letterSpacing: "-0.018em", color: "#000", textWrap: "balance" }}>{title}</h1>
          {lead && <p style={{ margin: "24px 0 0", font: "300 18px/29px Inter", color: "#1b1b1b", maxWidth: 600, textWrap: "pretty" }}>{lead}</p>}
          {actions && <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 34, flexWrap: "wrap" }}>{actions}</div>}
        </div>
        {visual && <Placeholder style={{ minHeight: 380, borderRadius: 30 }} radius={30} icon={visualIcon} label={visualLabel} />}
      </div>
    </Section>
  );
}

// "Этапы оказания услуг" — compact numbered grid (non-slider variant for service pages)
function StagesGrid({ title = "Этапы оказания услуги", sub = "Понятный процесс от консультации до получения заключения.", num }) {
  return (
    <Section style={{ paddingTop: "var(--rt-gap)" }}>
      <SectionHead num={num} eyebrow="Процесс" title={title} sub={sub} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 0,
        borderTop: "1px solid var(--ml-border)", borderLeft: "1px solid var(--ml-border)" }}>
        {STAGES.map((s) => (
          <div key={s.n} style={{ padding: "34px 34px", borderRight: "1px solid var(--ml-border)", borderBottom: "1px solid var(--ml-border)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
              <span style={{ font: "500 40px/1 Inter", color: "var(--ml-wire-2)", letterSpacing: "-0.02em" }}>{s.n}</span>
              <Glyph size={48} radius={12} />
            </div>
            <h4 style={{ margin: "0 0 9px", font: "500 19px/25px Inter", color: "var(--ml-ink-900)" }}>{s.t}</h4>
            <p style={{ margin: 0, font: "400 14px/22px Inter", color: "var(--ml-text-slate)" }}>{s.d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

// Price table
function PriceTable({ rows, num, onCalc }) {
  return (
    <Section style={{ paddingTop: "var(--rt-gap)" }}>
      <SectionHead num={num} eyebrow="Стоимость"
        title="Стоимость и сроки"
        sub="Ориентировочные цены. Точная стоимость зависит от состава документации и сложности объекта."
        action="Рассчитать точно" onAction={onCalc} actionIcon="arrowR" />
      <div style={{ border: "1px solid var(--ml-border)", borderRadius: 24, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 220px 220px", background: "#141414", color: "#fff" }}>
          {["Тип объекта / услуги", "Срок", "Стоимость"].map((h, i) => (
            <div key={h} style={{ padding: "18px 28px", font: "500 14px Inter",
              textAlign: i ? "right" : "left", color: "#e9ebed" }}>{h}</div>
          ))}
        </div>
        {rows.map((r, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 220px 220px",
            borderTop: "1px solid var(--ml-border)", background: i % 2 ? "var(--ml-surface-1)" : "#fff" }}>
            <div style={{ padding: "20px 28px", font: "500 16px Inter", color: "var(--ml-ink-900)" }}>{r[0]}</div>
            <div style={{ padding: "20px 28px", font: "400 15px Inter", color: "var(--ml-text-slate)", textAlign: "right" }}>{r[1]}</div>
            <div style={{ padding: "20px 28px", font: "500 16px Inter", color: "#141414", textAlign: "right", whiteSpace: "nowrap" }}>{r[2]}</div>
          </div>
        ))}
      </div>
      <p style={{ margin: "16px 0 0", font: "400 13px Inter", color: "var(--ml-text-muted)" }}>
        Указанные цены не являются публичной офертой. Окончательная стоимость фиксируется в договоре.
      </p>
    </Section>
  );
}

// Cases — horizontal slider
function CasesBlock({ num }) {
  return (
    <CardSlider num={num} eyebrow="Кейсы" title="Примеры проектов"
      sub="Объекты, по которым мы провели экспертизу." perView={3} gap={20}>
      {SERVICE_CASES.map((c) => (
        <div key={c.t} style={{ height: "100%", boxSizing: "border-box",
          background: "var(--ml-surface-1)", border: "1px solid var(--ml-border)", borderRadius: 20, padding: 22 }}>
          <Placeholder style={{ width: "100%", aspectRatio: "16/10", marginBottom: 22 }} radius={14} icon="building" />
          <span style={{ font: "500 11px Inter", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ml-text-muted)" }}>{c.type}</span>
          <h4 style={{ margin: "12px 0 18px", font: "500 20px/26px Inter", color: "var(--ml-ink-900)" }}>{c.t}</h4>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 9, paddingTop: 16, borderTop: "1px solid var(--ml-border)",
            width: "100%", font: "500 14px Inter", color: "#141414" }}>
            <Icon name="check" size={17} stroke={2} /> {c.res}
          </div>
        </div>
      ))}
    </CardSlider>
  );
}

// Licenses / accreditation + lightbox
function LicenseBlock({ num, slider = true, data = SERVICE_LICENSES }) {
  const [view, setView] = React.useState(null);
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setView(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const Card = ({ l }) => (
    <div style={{ height: "100%", boxSizing: "border-box", background: "#fff", border: "1px solid var(--ml-border)", borderRadius: 20, padding: 22, display: "flex", flexDirection: "column" }}>
      <Placeholder style={{ width: "100%", aspectRatio: "3/4", marginBottom: 20 }} radius={12} icon="award" />
      <h4 style={{ margin: "0 0 8px", font: "500 16px/22px Inter", color: "var(--ml-ink-900)" }}>{l.t}</h4>
      <p style={{ margin: "0 0 20px", font: "400 13px/20px Inter", color: "var(--ml-text-slate)" }}>{l.d}</p>
      <Btn size="sm" variant="ghost" icon="search" style={{ marginTop: "auto", alignSelf: "flex-start" }}
        onClick={() => setView(l)}>Открыть полностью</Btn>
    </div>
  );

  const lightbox = view && (
    <div onClick={() => setView(null)} style={{ position: "fixed", inset: 0, zIndex: 100,
      background: "rgba(20,20,20,0.55)", backdropFilter: "blur(3px)", display: "grid", placeItems: "center", padding: 32,
      animation: "ramFade .2s ease" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: 560, maxWidth: "100%", background: "#fff",
        borderRadius: 24, padding: 28, position: "relative", animation: "ramRise .28s cubic-bezier(.2,.7,.2,1)" }}>
        <button onClick={() => setView(null)} style={{ position: "absolute", top: 20, right: 20, width: 38, height: 38,
          borderRadius: "50%", border: "1px solid var(--ml-border-2)", background: "#fff", cursor: "pointer",
          display: "grid", placeItems: "center", color: "#79828d", zIndex: 2 }}>
          <Icon name="x" size={18} stroke={1.8} />
        </button>
        <Placeholder style={{ width: "100%", aspectRatio: "3/4", marginBottom: 20 }} radius={14} icon="award" label="Скан документа" />
        <h4 style={{ margin: "0 0 6px", font: "500 20px Inter", color: "var(--ml-ink-900)" }}>{view.t}</h4>
        <p style={{ margin: 0, font: "400 14px/22px Inter", color: "var(--ml-text-slate)" }}>{view.d}</p>
      </div>
    </div>
  );

  if (slider) {
    return (
      <React.Fragment>
        <CardSlider num={num} eyebrow="Документы" title="Лицензии и аккредитации"
          sub="Подтверждаем право на проведение негосударственной экспертизы." perView={4} gap={20}>
          {data.map((l) => <Card key={l.t} l={l} />)}
        </CardSlider>
        {lightbox}
      </React.Fragment>
    );
  }

  return (
    <Section style={{ paddingTop: "var(--rt-gap)" }}>
      <SectionHead num={num} eyebrow="Документы" title="Лицензии и аккредитации"
        sub="Подтверждаем право на проведение негосударственной экспертизы." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
        {data.map((l) => <Card key={l.t} l={l} />)}
      </div>
      {lightbox}
    </Section>
  );
}

// FAQ accordion
function FaqAccordion({ items, num }) {
  const [open, setOpen] = React.useState(0);
  return (
    <Section style={{ paddingTop: "var(--rt-gap)" }}>
      <SectionHead num={num} eyebrow="Вопросы" title="Частые вопросы"
        sub="Коротко отвечаем на то, что спрашивают чаще всего." />
      <div style={{ border: "1px solid var(--ml-border)", borderRadius: 24, overflow: "hidden" }}>
        {items.map((it, i) => {
          const isOpen = open === i;
          return (
            <div key={i} style={{ borderTop: i ? "1px solid var(--ml-border)" : "none", background: isOpen ? "var(--ml-surface-1)" : "#fff" }}>
              <button onClick={() => setOpen(isOpen ? -1 : i)} style={{
                width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24,
                padding: "26px 32px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>
                <span style={{ font: "500 18px/26px Inter", color: "var(--ml-ink-900)" }}>{it.q}</span>
                <span style={{ width: 38, height: 38, borderRadius: "50%", flex: "none", border: "1px solid var(--ml-border-2)",
                  display: "grid", placeItems: "center", background: "#fff" }}>
                  <Icon name={isOpen ? "minus" : "plus"} size={18} stroke={1.8} color="#141414" />
                </span>
              </button>
              <div style={{ display: "grid", gridTemplateRows: isOpen ? "1fr" : "0fr", transition: "grid-template-rows .35s ease" }}>
                <div style={{ overflow: "hidden", minHeight: 0 }}>
                  <p style={{ margin: 0, padding: "0 92px 28px 32px", font: "400 15px/25px Inter", color: "var(--ml-text-slate)" }}>{it.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

// Stats band — big number + caption row (reusable "цифры" block)
function StatsBand({ data = STATS, dark = false }) {
  return (
    <Section style={{ paddingTop: "var(--rt-gap)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)",
        border: "1px solid " + (dark ? "#2d2d2d" : "var(--ml-border)"), borderRadius: 24, overflow: "hidden",
        background: dark ? "#141414" : "transparent" }}>
        {data.map((s, i) => (
          <div key={s.k} style={{ padding: "40px 34px", borderLeft: i ? "1px solid " + (dark ? "#2d2d2d" : "var(--ml-border)") : "none" }}>
            <div style={{ font: "500 46px/1 Inter", letterSpacing: "-0.02em", color: dark ? "#fff" : "#000" }}>
              {s.v}<span style={{ color: dark ? "#7c828b" : "var(--ml-text-muted)" }}>{s.suffix}</span>
            </div>
            <div style={{ font: "400 15px/21px Inter", color: dark ? "#a9adb4" : "var(--ml-text-nav)", marginTop: 12 }}>{s.k}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

// Closing CTA band (dark)
function CtaBand({ onCalc, title = "Готовы обсудить ваш проект?", text = "Оставьте заявку — рассчитаем стоимость экспертизы и предложим оптимальные сроки." }) {
  return (
    <Section style={{ paddingTop: "var(--rt-gap)" }}>
      <div style={{ background: "#141414", borderRadius: 30, padding: "60px 64px", display: "flex",
        alignItems: "center", justifyContent: "space-between", gap: 40, flexWrap: "wrap" }}>
        <div style={{ maxWidth: 640 }}>
          <h2 style={{ margin: 0, font: "500 34px/1.14 Inter", letterSpacing: "-0.01em", color: "#fff", textWrap: "balance" }}>{title}</h2>
          <p style={{ margin: "16px 0 0", font: "400 16px/27px Inter", color: "#a9adb4" }}>{text}</p>
        </div>
        <Btn variant="light" size="lg" onClick={onCalc} icon="arrowR">Рассчитать стоимость</Btn>
      </div>
    </Section>
  );
}

Object.assign(window, { Crumbs, PageHero, StagesGrid, StatsBand, PriceTable, CasesBlock, LicenseBlock, FaqAccordion, CtaBand });
