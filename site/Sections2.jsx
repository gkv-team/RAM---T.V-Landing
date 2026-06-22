// О компании, Почему нам доверяют (dark), Эксперты.

function About({ onCalc }) {
  return (
    <Section id="about" style={{ paddingTop: "var(--rt-gap)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "560px 1fr", gap: 64, alignItems: "center" }}>
        <Placeholder style={{ minHeight: 480, borderRadius: 30 }} radius={30} icon="building" label="Офис компании" />
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <span style={{ font: "500 13px Inter", color: "var(--ml-text-muted)" }}>03</span>
            <span style={{ width: 26, height: 1, background: "var(--ml-border-2)" }} />
            <span style={{ font: "500 12px Inter", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ml-text-nav)" }}>О компании</span>
          </div>
          <h2 style={{ margin: 0, font: "500 36px/1.14 Inter", letterSpacing: "-0.01em", color: "var(--ml-ink-900)", textWrap: "balance" }}>
            Аккредитованная экспертная организация полного цикла
          </h2>
          <p style={{ margin: "22px 0 0", font: "400 16px/28px Inter", color: "var(--ml-text-slate)", maxWidth: 560 }}>
            РАМ-ТВ проводит негосударственную экспертизу проектной документации и результатов
            инженерных изысканий в одной компании, работает на платформе ЕЦПЭ и сопровождает
            проект вплоть до получения разрешения на строительство.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, margin: "34px 0 36px" }}>
            {ABOUT_POINTS.map((p) => (
              <div key={p.t} style={{ display: "flex", gap: 14 }}>
                <Glyph size={44} radius={11} />
                <div>
                  <div style={{ font: "500 15px/20px Inter", color: "var(--ml-ink-900)", marginBottom: 4 }}>{p.t}</div>
                  <div style={{ font: "400 13px/20px Inter", color: "var(--ml-text-slate)" }}>{p.d}</div>
                </div>
              </div>
            ))}
          </div>
          <Btn onClick={onCalc} icon="arrowR">Обсудить ваш проект</Btn>
        </div>
      </div>
    </Section>
  );
}

function Advantages() {
  return (
    <section id="advantages" style={{ marginTop: "var(--rt-gap)", background: "#141414", color: "#fff", paddingBlock: 96 }}>
      <div style={{ maxWidth: 1600, margin: "0 auto", padding: "0 40px" }}>
        <div style={{ maxWidth: 720, marginBottom: 56 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <span style={{ font: "500 13px Inter", color: "#7c828b" }}>04</span>
            <span style={{ width: 26, height: 1, background: "#3a3a3a" }} />
            <span style={{ font: "500 12px Inter", letterSpacing: "0.18em", textTransform: "uppercase", color: "#9aa0a8" }}>Преимущества</span>
          </div>
          <h2 style={{ margin: 0, font: "500 36px/1.12 Inter", letterSpacing: "-0.01em", color: "#fff", textWrap: "balance" }}>
            Почему нам доверяют
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 0,
          borderTop: "1px solid #2d2d2d", borderLeft: "1px solid #2d2d2d" }}>
          {ADVANTAGES.map((a) => (
            <div key={a.n} style={{ padding: "38px 36px", borderRight: "1px solid #2d2d2d", borderBottom: "1px solid #2d2d2d" }}>
              <div style={{ font: "500 15px Inter", color: "#7c828b", marginBottom: 22, letterSpacing: "0.04em" }}>{a.n}</div>
              <h4 style={{ margin: "0 0 12px", font: "500 21px/27px Inter", color: "#fff" }}>{a.t}</h4>
              <p style={{ margin: 0, font: "400 14px/23px Inter", color: "#a9adb4" }}>{a.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experts({ num = "05", eyebrow = "Команда", title = "Наши эксперты", sub = "Специалисты с профильной аттестацией и практическим опытом.",
  data, action = "Все специалисты", actionHref = RT.EXPERTS, slider }) {
  const isSlider = slider !== undefined ? slider : action !== null;
  const items = data || (isSlider ? EXPERTS : EXPERTS.slice(0, 4));
  const onAction = actionHref ? () => { location.href = actionHref; } : undefined;

  const Card = ({ e }) => (
    <div style={{ height: "100%", boxSizing: "border-box", background: "var(--ml-surface-1)", border: "1px solid var(--ml-border)",
      borderRadius: 20, padding: 22 }}>
      <Placeholder style={{ width: "100%", aspectRatio: "1/1", marginBottom: 20 }} radius={14} icon="users" />
      <h4 style={{ margin: "0 0 6px", font: "500 19px Inter", color: "var(--ml-ink-900)" }}>{e.fio}</h4>
      <p style={{ margin: "0 0 16px", font: "400 13px/20px Inter", color: "var(--ml-text-slate)", minHeight: 40 }}>{e.spec}</p>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 7, paddingTop: 14, borderTop: "1px solid var(--ml-border)",
        width: "100%", font: "500 13px Inter", color: "var(--ml-text-nav)" }}>
        {e.exp}
      </div>
    </div>
  );

  if (isSlider) {
    return (
      <CardSlider id="experts" num={num} eyebrow={eyebrow} title={title} sub={sub} perView={4} gap={20}
        action={action} actionIcon="arrowR" onAction={onAction}>
        {items.map((e) => <Card key={e.fio} e={e} />)}
      </CardSlider>
    );
  }

  return (
    <Section id="experts" style={{ paddingTop: "var(--rt-gap)" }}>
      <SectionHead num={num} eyebrow={eyebrow}
        title={title}
        sub={sub}
        action={action} actionIcon="arrowR" onAction={onAction} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
        {items.map((e) => <Card key={e.fio} e={e} />)}
      </div>
    </Section>
  );
}

Object.assign(window, { About, Advantages, Experts });
