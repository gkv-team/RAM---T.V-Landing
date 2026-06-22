// Service detail popup — shows the same description content as the Услуга page,
// rendered inside a modal. Opened from the Услуги section, header mega-menu and footer.

function SvcCheckList({ checks }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 28px" }}>
      {checks.map((c) => (
        <div key={c} style={{ display: "flex", gap: 11, alignItems: "flex-start" }}>
          <span style={{ marginTop: 1, flex: "none" }}><Icon name="check" size={18} stroke={2.2} color="#141414" /></span>
          <span style={{ font: "400 15px/22px Inter", color: "var(--ml-text-2)" }}>{c}</span>
        </div>
      ))}
    </div>
  );
}

function SvcPriceTable({ rows }) {
  return (
    <div style={{ border: "1px solid var(--ml-border)", borderRadius: 20, overflow: "hidden" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 150px 150px", background: "#141414", color: "#fff" }}>
        {["Тип объекта / услуги", "Срок", "Стоимость"].map((h, i) => (
          <div key={h} style={{ padding: "15px 22px", font: "500 13px Inter",
            textAlign: i ? "right" : "left", color: "#e9ebed" }}>{h}</div>
        ))}
      </div>
      {rows.map((r, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 150px 150px",
          borderTop: "1px solid var(--ml-border)", background: i % 2 ? "var(--ml-surface-1)" : "#fff" }}>
          <div style={{ padding: "16px 22px", font: "500 15px Inter", color: "var(--ml-ink-900)" }}>{r[0]}</div>
          <div style={{ padding: "16px 22px", font: "400 14px Inter", color: "var(--ml-text-slate)", textAlign: "right" }}>{r[1]}</div>
          <div style={{ padding: "16px 22px", font: "500 15px Inter", color: "#141414", textAlign: "right", whiteSpace: "nowrap" }}>{r[2]}</div>
        </div>
      ))}
    </div>
  );
}

function SvcFaq({ items }) {
  const [open, setOpen] = React.useState(0);
  return (
    <div style={{ border: "1px solid var(--ml-border)", borderRadius: 20, overflow: "hidden" }}>
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i} style={{ borderTop: i ? "1px solid var(--ml-border)" : "none", background: isOpen ? "var(--ml-surface-1)" : "#fff" }}>
            <button onClick={() => setOpen(isOpen ? -1 : i)} style={{
              width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20,
              padding: "20px 24px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left", fontFamily: "Inter" }}>
              <span style={{ font: "500 16px/23px Inter", color: "var(--ml-ink-900)" }}>{it.q}</span>
              <span style={{ width: 32, height: 32, borderRadius: "50%", flex: "none", border: "1px solid var(--ml-border-2)",
                display: "grid", placeItems: "center", background: "#fff" }}>
                <Icon name={isOpen ? "minus" : "plus"} size={16} stroke={1.8} color="#141414" />
              </span>
            </button>
            <div style={{ display: "grid", gridTemplateRows: isOpen ? "1fr" : "0fr", transition: "grid-template-rows .3s ease" }}>
              <div style={{ overflow: "hidden", minHeight: 0 }}>
                <p style={{ margin: 0, padding: "0 64px 22px 24px", font: "400 14px/24px Inter", color: "var(--ml-text-slate)" }}>{it.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ServiceModal({ slug, onClose, onCalc }) {
  const open = !!slug;

  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    if (open) {
      window.addEventListener("keydown", onKey);
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
    }
  }, [open, onClose]);

  if (!open) return null;
  const svc = getService(slug);
  const calc = () => { onClose(); onCalc && onCalc(); };

  const sec = { marginTop: 44 };
  const h3 = { margin: "0 0 18px", font: "500 21px Inter", color: "var(--ml-ink-900)" };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 120,
      background: "rgba(20,20,20,0.55)", backdropFilter: "blur(3px)",
      display: "flex", justifyContent: "center", alignItems: "flex-start",
      padding: "48px 24px", overflowY: "auto", animation: "ramFade .2s ease" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: 940, maxWidth: "100%", background: "#fff",
        borderRadius: 30, position: "relative", animation: "ramRise .3s cubic-bezier(.2,.7,.2,1)", overflow: "hidden" }}>

        {/* Sticky top bar */}
        <div style={{ position: "sticky", top: 0, zIndex: 2, background: "rgba(255,255,255,0.94)", backdropFilter: "blur(6px)",
          borderBottom: "1px solid var(--ml-border)", display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: 16, padding: "18px 28px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 9 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#141414" }} />
            <span style={{ font: "500 12px Inter", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ml-text-nav)" }}>{svc.group}</span>
          </div>
          <button onClick={onClose} aria-label="Закрыть" style={{ width: 40, height: 40, flex: "none",
            borderRadius: "50%", border: "1px solid var(--ml-border-2)", background: "#fff", cursor: "pointer",
            display: "grid", placeItems: "center", color: "#79828d" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#141414"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#79828d"; }}>
            <Icon name="x" size={18} stroke={1.8} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "40px 48px 48px" }}>
          {/* Hero: title + lead + visual */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 40, alignItems: "start" }}>
            <div>
              <h2 style={{ margin: 0, font: "500 36px/1.12 Inter", letterSpacing: "-0.018em", color: "#000", textWrap: "balance" }}>{svc.title}</h2>
              <p style={{ margin: "20px 0 0", font: "300 17px/28px Inter", color: "#1b1b1b", textWrap: "pretty" }}>{svc.lead}</p>
              <div style={{ marginTop: 28 }}>
                <Btn size="lg" onClick={calc} icon="arrowR">Рассчитать стоимость</Btn>
              </div>
            </div>
            <Placeholder style={{ width: "100%", aspectRatio: "4/5" }} radius={20} icon={svc.icon} label="Визуализация услуги" />
          </div>

          {/* Что входит */}
          <div style={sec}>
            <h3 style={h3}>Что входит в услугу</h3>
            {svc.intro.map((p, i) => (
              <p key={i} style={{ margin: i ? "16px 0 0" : 0, font: "400 16px/28px Inter", color: "var(--ml-text-slate)" }}>{p}</p>
            ))}
          </div>

          {/* Что мы проверяем */}
          <div style={sec}>
            <h3 style={h3}>Что мы проверяем</h3>
            <SvcCheckList checks={svc.checks} />
          </div>

          {/* Стоимость */}
          <div style={sec}>
            <h3 style={h3}>Стоимость и сроки</h3>
            <SvcPriceTable rows={svc.prices} />
            <p style={{ margin: "14px 0 0", font: "400 13px Inter", color: "var(--ml-text-muted)" }}>
              Указанные цены не являются публичной офертой. Окончательная стоимость фиксируется в договоре.
            </p>
          </div>

          {/* FAQ */}
          <div style={sec}>
            <h3 style={h3}>Частые вопросы</h3>
            <SvcFaq items={svc.faq} />
          </div>

          {/* CTA */}
          <div style={{ ...sec, background: "#141414", borderRadius: 24, padding: "36px 40px",
            display: "flex", alignItems: "center", justifyContent: "space-between", gap: 28, flexWrap: "wrap" }}>
            <div style={{ maxWidth: 520 }}>
              <div style={{ font: "500 24px/1.18 Inter", letterSpacing: "-0.01em", color: "#fff", textWrap: "balance" }}>Готовы обсудить ваш проект?</div>
              <p style={{ margin: "12px 0 0", font: "400 15px/25px Inter", color: "#a9adb4" }}>
                Оставьте заявку — рассчитаем стоимость и предложим оптимальные сроки.
              </p>
            </div>
            <Btn variant="light" size="lg" onClick={calc} icon="arrowR">Оставить заявку</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ServiceModal });
