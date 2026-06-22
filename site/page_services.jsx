  function ServiceGroupBlock({ grp, num }) {
    return (
      <Section id={"group-" + grp.key} style={{ paddingTop: "var(--rt-gap)", scrollMarginTop: 130 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 40 }}>
          <Glyph size={52} radius={13} />
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <span style={{ font: "500 13px Inter", color: "var(--ml-text-muted)" }}>{num}</span>
              <span style={{ width: 22, height: 1, background: "var(--ml-border-2)" }} />
              <span style={{ font: "500 12px Inter", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ml-text-nav)" }}>Раздел</span>
            </div>
            <h2 style={{ margin: 0, font: "500 30px/1.1 Inter", letterSpacing: "-0.01em", color: "var(--ml-ink-900)" }}>{grp.title}</h2>
          </div>
          <span style={{ marginLeft: "auto", font: "400 14px Inter", color: "var(--ml-text-nav)" }}>{grp.items.length} услуг</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {grp.items.map((it) => <SubServiceCard key={it.slug} item={it} grpKey={grp.key} />)}
        </div>
      </Section>
    );
  }

  function SubServiceCard({ item, grpKey }) {
    const [hover, setHover] = React.useState(false);
    const card = SERVICE_CARDS.find((c) => c.slug === item.slug);
    const svc = getService(item.slug);
    return (
      <a href={RT.detail(item.slug)} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        style={{ textDecoration: "none", background: hover ? "#fff" : "var(--ml-surface-1)",
          border: "1px solid " + (hover ? "var(--ml-border-2)" : "var(--ml-border)"), borderRadius: 20, padding: 28,
          display: "flex", flexDirection: "column", transform: hover ? "translateY(-3px)" : "none",
          transition: "background .16s, border-color .16s, transform .16s" }}>
        <Glyph size={50} radius={12} style={{ marginBottom: 22 }} />
        <h4 style={{ margin: "0 0 10px", font: "500 18px/24px Inter", color: "var(--ml-ink-900)" }}>{item.n}</h4>
        <p style={{ margin: "0 0 20px", font: "400 14px/22px Inter", color: "var(--ml-text-slate)" }}>
          {(card && card.d) || svc.lead.slice(0, 96) + "…"}
        </p>
        <span style={{ marginTop: "auto", display: "inline-flex", alignItems: "center", gap: 7,
          font: "500 13px Inter", color: hover ? "#141414" : "var(--ml-text-nav)", transition: "color .16s" }}>
          Подробнее <Icon name="arrowR" size={15} stroke={2} />
        </span>
      </a>
    );
  }

  function App() {
    const [calc, setCalc] = React.useState(false);
    const openCalc = () => setCalc(true);

    React.useEffect(() => {
      const id = location.hash.slice(1);
      if (!id) return;
      const scrollToHash = () => {
        const el = document.getElementById(id);
        if (!el) return false;
        const y = el.getBoundingClientRect().top + window.scrollY - 120;
        window.scrollTo({ top: y, behavior: "smooth" });
        return true;
      };
      // React mounts synchronously, but wait a frame for layout/fonts before measuring.
      requestAnimationFrame(() => { if (!scrollToHash()) setTimeout(scrollToHash, 150); });
    }, []);

    return (
      <div>
        <Header onCalc={openCalc} />
        <main>
          <PageHero
            eyebrow="Услуги"
            crumbs={[{ label: "Главная", href: RT.HOME }, { label: "Услуги" }]}
            title="Экспертиза и сопровождение проектов"
            lead="Проводим негосударственную экспертизу проектной документации, результатов инженерных изысканий и сметной документации, а также сопровождаем проект на всех этапах согласования."
            visualIcon="layers" visualLabel="Услуги компании"
            actions={<React.Fragment>
              <Btn size="lg" onClick={openCalc} icon="arrowR">Рассчитать стоимость</Btn>
              <a href="tel:+74951234567" style={{ display: "grid", gap: 2, textDecoration: "none" }}>
                <span style={{ font: "600 19px Inter", color: "#141414", whiteSpace: "nowrap" }}>+7 (495) 123-45-67</span>
                <span style={{ font: "400 13px Inter", color: "var(--ml-text-nav)" }}>Консультация бесплатно</span>
              </a>
            </React.Fragment>} />

          <ServiceGroupBlock grp={SERVICE_GROUPS[0]} num="01" />
          <ServiceGroupBlock grp={SERVICE_GROUPS[1]} num="02" />
          <StagesGrid num="03" title="Этапы оказания услуг" />
        </main>
        <Footer onCalc={openCalc} />
        <CalcModal open={calc} onClose={() => setCalc(false)} />
      </div>
    );
  }
  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
