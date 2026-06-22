// Hero, Услуги (expandable), Этапы работы (slider).

function Hero({ onCalc, onNav }) {
  const creds = [
    { k: "Аккредитация", v: "ПД и РИИ" },
    { k: "Платформа", v: "ЕЦПЭ" },
    { k: "Опыт", v: "12 лет" },
    { k: "Заключений", v: "1 400+" },
  ];
  return (
    <Section id="top" style={{ paddingTop: 76 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 480px", gap: 56, alignItems: "stretch" }}>
        {/* Left */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: 8 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 9, marginBottom: 26 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#141414" }} />
            <span style={{ font: "500 12px Inter", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ml-text-nav)" }}>
              Негосударственная экспертиза
            </span>
          </div>
          <h1 style={{ margin: 0, font: "500 54px/1.08 Inter", letterSpacing: "-0.018em", color: "#000" }}>
            Экспертиза проектной<br />документации,<br />изысканий и смет
          </h1>
          <p style={{ margin: "28px 0 0", font: "300 18px/29px Inter", color: "#1b1b1b", maxWidth: 540, textWrap: "pretty" }}>
            Помогаем получить положительное заключение, избежать ошибок в документации
            и подготовить проект к получению разрешения на строительство.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 22, marginTop: 38, flexWrap: "wrap" }}>
            <Btn size="lg" onClick={onCalc} icon="arrowR">Рассчитать стоимость экспертизы</Btn>
            <a href="tel:+74951234567" style={{ display: "grid", gap: 2, textDecoration: "none" }}>
              <span style={{ font: "600 19px Inter", color: "#141414", whiteSpace: "nowrap" }}>+7 (495) 123-45-67</span>
              <span style={{ font: "400 13px Inter", color: "var(--ml-text-nav)" }}>Консультация бесплатно</span>
            </a>
          </div>
        </div>
        {/* Right — two service direction blocks (click to jump to the service) */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {SERVICE_GROUPS.map((grp) => <HeroDirection key={grp.key} grp={grp} onNav={onNav} />)}
        </div>
      </div>

      {/* Credential strip */}
      <div style={{ marginTop: 84, display: "grid", gridTemplateColumns: "repeat(4,1fr)",
        border: "1px solid var(--ml-border)", borderRadius: 20, overflow: "hidden" }}>
        {creds.map((c, i) => (
          <div key={c.k} style={{ padding: "26px 30px", borderLeft: i ? "1px solid var(--ml-border)" : "none" }}>
            <div style={{ font: "500 28px Inter", color: "#000", letterSpacing: "-0.01em" }}>{c.v}</div>
            <div style={{ font: "400 14px Inter", color: "var(--ml-text-nav)", marginTop: 6 }}>{c.k}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function HeroDirection({ grp, onNav }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button onClick={() => onNav && onNav("group-" + grp.key)}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        flex: 1, textAlign: "left", cursor: "pointer", font: "inherit", appearance: "none",
        background: hover ? "#141414" : "var(--ml-surface-1)",
        border: "1px solid " + (hover ? "#141414" : "var(--ml-border)"),
        borderRadius: 30, padding: "28px 30px",
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        transition: "background .18s ease, border-color .18s ease",
      }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <Glyph size={46} radius={12} />
        <Icon name="arrowR" size={20} stroke={1.9} color={hover ? "#fff" : "var(--ml-text-muted)"} />
      </div>
      <div>
        <h3 style={{ margin: "22px 0 0", font: "500 24px/1.12 Inter", letterSpacing: "-0.01em", color: hover ? "#fff" : "var(--ml-ink-900)" }}>{grp.title}</h3>
        <span style={{ display: "block", marginTop: 9, font: "400 14px Inter", color: hover ? "#aeb4bc" : "var(--ml-text-nav)" }}>
          {grp.items.length} {plural(grp.items.length, ["услуга", "услуги", "услуг"])} · выбрать
        </span>
      </div>
    </button>
  );
}

function plural(n, forms) {
  const a = Math.abs(n) % 100, b = a % 10;
  if (a > 10 && a < 20) return forms[2];
  if (b > 1 && b < 5) return forms[1];
  if (b === 1) return forms[0];
  return forms[2];
}

function ServiceChip({ label, href, variant = "default", icon = "external", onClick }) {
  const [hover, setHover] = React.useState(false);
  const dark = variant === "more";
  const bg = dark ? (hover ? "#2a2a2a" : "#141414") : (hover ? "#141414" : "#fff");
  const fg = dark ? "#fff" : (hover ? "#fff" : "var(--ml-text-2)");
  const Tag = onClick ? "button" : "a";
  return (
    <Tag href={href} onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 17px", borderRadius: 50,
        border: "1px solid " + (dark ? "transparent" : "var(--ml-border-2)"),
        background: bg, color: fg, font: "500 14px Inter", textDecoration: "none", cursor: "pointer",
        whiteSpace: "nowrap", transition: "background .16s ease, color .16s ease, border-color .16s ease",
      }}>
      {label}
      <Icon name={icon} size={14} stroke={1.9} color={dark ? "#fff" : (hover ? "#fff" : "var(--ml-text-muted)")} />
    </Tag>
  );
}

function ServiceDirectionCard({ grp, onService }) {
  return (
    <div id={"group-" + grp.key} style={{ scrollMarginTop: 96, background: "var(--ml-surface-1)", border: "1px solid var(--ml-border)", borderRadius: 30,
      padding: "42px 44px", display: "flex", flexDirection: "column", height: "100%", boxSizing: "border-box", overflow: "hidden" }}>
      {/* head */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 30 }}>
        <Glyph size={56} radius={14} />
        <div>
          <h3 style={{ margin: 0, font: "500 28px/1.1 Inter", letterSpacing: "-0.01em", color: "var(--ml-ink-900)" }}>{grp.title}</h3>
          <span style={{ font: "400 14px Inter", color: "var(--ml-text-nav)" }}>
            {grp.items.length} {plural(grp.items.length, ["услуга", "услуги", "услуг"])}
          </span>
        </div>
      </div>

      {/* chips — all services shown, click opens the service popup */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {grp.items.map((it) => (
          <ServiceChip key={it.slug} label={it.n} icon="arrowR"
            href={onService ? undefined : RT.detail(it.slug)}
            onClick={onService ? (e) => { e && e.preventDefault(); onService(it.slug); } : undefined} />
        ))}
      </div>

      {/* full-width media placeholder banner, flush to the bottom of the card */}
      <div style={{ marginTop: "auto", paddingTop: 28, marginLeft: -44, marginRight: -44, marginBottom: -42 }}>
        <Placeholder style={{ width: "100%", height: 168 }} radius={0} />
      </div>
    </div>
  );
}

function Services({ onCalc, onService }) {
  return (
    <Section id="services" style={{ paddingTop: "var(--rt-gap)" }}>
      <SectionHead num="01" eyebrow="Услуги"
        title="Экспертиза по двум направлениям"
        sub="Проводим экспертизу проектной документации, инженерных изысканий и сметной документации, а также сопровождаем проект на всех этапах. Нажмите на услугу, чтобы узнать подробности." />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, alignItems: "stretch" }}>
        {SERVICE_GROUPS.map((grp) => <ServiceDirectionCard key={grp.key} grp={grp} onService={onService} />)}
      </div>
    </Section>
  );
}

function Stages({ onCalc }) {
  return (
    <Section id="stages" style={{ paddingTop: "var(--rt-gap)" }}>
      <div style={{ marginBottom: 44, maxWidth: 720 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
          <span style={{ font: "500 13px Inter", color: "var(--ml-text-muted)" }}>02</span>
          <span style={{ width: 26, height: 1, background: "var(--ml-border-2)" }} />
          <span style={{ font: "500 12px Inter", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ml-text-nav)" }}>Процесс</span>
        </div>
        <h2 style={{ margin: 0, font: "500 34px/1.12 Inter", letterSpacing: "-0.01em", color: "var(--ml-ink-900)" }}>Как проходит экспертиза</h2>
        <p style={{ margin: "16px 0 0", font: "400 16px/27px Inter", color: "var(--ml-text-slate)", maxWidth: 560 }}>
          Понятный процесс от консультации до получения заключения.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
        {STAGES.map((s) => (
          <div key={s.n} style={{ background: "var(--ml-surface-1)", border: "1px solid var(--ml-border)", borderRadius: 20, padding: "32px 30px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 26 }}>
              <span style={{ font: "500 46px/1 Inter", color: "var(--ml-wire-2)", letterSpacing: "-0.02em" }}>{s.n}</span>
              <Glyph size={52} radius={13} />
            </div>
            <h4 style={{ margin: "0 0 10px", font: "500 20px/26px Inter", color: "var(--ml-ink-900)" }}>{s.t}</h4>
            <p style={{ margin: 0, font: "400 14px/23px Inter", color: "var(--ml-text-slate)" }}>{s.d}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 36 }}>
        <Btn onClick={onCalc} icon="arrowR">Получить консультацию</Btn>
      </div>
    </Section>
  );
}

Object.assign(window, { Hero, HeroDirection, Services, Stages });
