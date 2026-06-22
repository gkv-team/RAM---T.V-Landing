// Отзывы (carousel) и Контакты.

function Stars({ n }) {
  return (
    <span style={{ display: "inline-flex", gap: 4 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon key={i} name="star" size={18} stroke={1}
          color={i < n ? "#141414" : "var(--ml-border-2)"}
          style={{ fill: i < n ? "#141414" : "none" }} />
      ))}
    </span>
  );
}

function ReviewCard({ r }) {
  return (
    <div style={{ background: "var(--ml-surface-1)", border: "1px solid var(--ml-border)", borderRadius: 30, padding: "38px 40px",
      display: "flex", flexDirection: "column", height: "100%", boxSizing: "border-box" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Placeholder style={{ width: 56, height: 56 }} radius={50} />
          <div>
            <div style={{ font: "500 18px Inter", color: "var(--ml-ink-900)" }}>{r.n}</div>
            <div style={{ font: "400 13px Inter", color: "var(--ml-text-nav)", marginTop: 3 }}>{r.role}</div>
          </div>
        </div>
        <Stars n={r.r} />
      </div>
      <p style={{ margin: "0 0 26px", font: "400 15px/26px Inter", color: "var(--ml-text-slate)" }}>{r.t}</p>
      <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 10, paddingTop: 22, borderTop: "1px solid var(--ml-border)" }}>
        <Chip>{r.d}</Chip><Chip>{r.src}</Chip>
      </div>
    </div>
  );
}

function Reviews({ onCalc, num = "09", title = "Отзывы клиентов", sub = "Мнение заказчиков о нашей работе.", layout = "carousel" }) {
  const [idx, setIdx] = React.useState(0);
  const perView = 2;
  const maxIdx = REVIEWS.length - perView;
  const clamp = (v) => Math.max(0, Math.min(maxIdx, v));

  if (layout === "grid") {
    return (
      <Section id="reviews" style={{ paddingTop: "var(--rt-gap)" }}>
        <SectionHead num={num} eyebrow="Отзывы" title={title} sub={sub} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {REVIEWS.map((r) => <ReviewCard key={r.n} r={r} />)}
        </div>
      </Section>
    );
  }

  return (
    <Section id="reviews" style={{ paddingTop: "var(--rt-gap)" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 32, marginBottom: 44, flexWrap: "wrap" }}>
        <div style={{ maxWidth: 720 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <span style={{ font: "500 13px Inter", color: "var(--ml-text-muted)" }}>{num}</span>
            <span style={{ width: 26, height: 1, background: "var(--ml-border-2)" }} />
            <span style={{ font: "500 12px Inter", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ml-text-nav)" }}>Отзывы</span>
          </div>
          <h2 style={{ margin: 0, font: "500 34px/1.12 Inter", letterSpacing: "-0.01em", color: "var(--ml-ink-900)" }}>{title}</h2>
          <p style={{ margin: "16px 0 0", font: "400 16px/27px Inter", color: "var(--ml-text-slate)" }}>{sub}</p>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <SliderArrow dir="left" disabled={idx === 0} onClick={() => setIdx((v) => clamp(v - 1))} />
          <SliderArrow dir="right" disabled={idx >= maxIdx} onClick={() => setIdx((v) => clamp(v + 1))} />
        </div>
      </div>

      <div style={{ overflow: "hidden" }}>
        <div style={{ display: "flex", gap: 20, transition: "transform .5s cubic-bezier(.4,0,.1,1)",
          transform: `translateX(calc(${-idx} * (100% + 20px) / ${perView}))` }}>
          {REVIEWS.map((r) => (
            <div key={r.n} style={{ flex: `0 0 calc((100% - ${20 * (perView - 1)}px) / ${perView})` }}>
              <ReviewCard r={r} />
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", marginTop: 32 }}>
        <div style={{ display: "flex", gap: 7 }}>
          {Array.from({ length: maxIdx + 1 }).map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} style={{
              width: i === idx ? 30 : 9, height: 9, borderRadius: 50, border: "none", cursor: "pointer",
              background: i === idx ? "#141414" : "var(--ml-border-2)", transition: "all .25s ease", padding: 0 }} />
          ))}
        </div>
      </div>
    </Section>
  );
}

function Contacts({ onCalc, showHead = true, num = "10" }) {
  const rows = [
    { icon: "phone", k: "Телефоны", v: "+7 (495) 123-45-67" },
    { icon: "phone", k: "Отдел экспертизы", v: "+7 (495) 123-45-68" },
    { icon: "mail", k: "E-mail", v: "info@ram-tv.ru" },
    { icon: "telegram", k: "Мессенджеры", v: "Telegram · WhatsApp" },
    { icon: "pin", k: "Адрес офиса", v: "г. Москва, ул. Проектная, 12, офис 410" },
    { icon: "clock", k: "Режим работы", v: "Пн–Пт, 9:00–18:00" },
  ];
  const reqs = [
    ["Полное наименование", "ООО «РАМ-ТВ»"],
    ["ИНН / КПП", "7701234567 / 770101001"],
    ["ОГРН", "1157700012345"],
    ["Расчётный счёт", "40702 810 4 0000 0001234"],
  ];
  return (
    <Section id="contacts" style={{ paddingTop: "var(--rt-gap)" }}>
      {showHead && <SectionHead num={num} eyebrow="Контакты" title="Контакты" />}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Left: contact rows + requisites */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ background: "var(--ml-surface-1)", border: "1px solid var(--ml-border)", borderRadius: 24, padding: "14px 32px" }}>
            {rows.map((r, i) => (
              <div key={r.k} style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px 0",
                borderTop: i ? "1px solid var(--ml-border)" : "none" }}>
                <Glyph size={44} radius={11} />
                <div>
                  <div style={{ font: "400 13px Inter", color: "var(--ml-text-nav)", marginBottom: 3 }}>{r.k}</div>
                  <div style={{ font: "500 16px Inter", color: "var(--ml-ink-900)", whiteSpace: "nowrap" }}>{r.v}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: "#141414", borderRadius: 24, padding: "30px 32px", color: "#fff" }}>
            <div style={{ font: "500 16px Inter", marginBottom: 20 }}>Реквизиты юридического лица</div>
            <div style={{ display: "grid", gap: 0 }}>
              {reqs.map(([k, v], i) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: 16, padding: "12px 0",
                  borderTop: i ? "1px solid #2d2d2d" : "none" }}>
                  <span style={{ font: "400 13px Inter", color: "#9aa0a8" }}>{k}</span>
                  <span style={{ font: "400 14px Inter", color: "#e9ebed", textAlign: "right" }}>{v}</span>
                </div>
              ))}
            </div>
            <Btn variant="light" onClick={onCalc} style={{ marginTop: 26, width: "100%" }}>Оставить заявку</Btn>
          </div>
        </div>
        {/* Right: map */}
        <Placeholder style={{ minHeight: 560, borderRadius: 24 }} radius={24} icon="pin" label="Интерактивная карта" />
      </div>
    </Section>
  );
}

Object.assign(window, { Reviews, Contacts });
