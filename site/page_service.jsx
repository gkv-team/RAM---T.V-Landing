  function DescriptionBlock({ svc, num, onCalc }) {
    return (
      <Section style={{ paddingTop: "var(--rt-gap)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 460px", gap: 56, alignItems: "start" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <span style={{ font: "500 13px Inter", color: "var(--ml-text-muted)" }}>{num}</span>
              <span style={{ width: 26, height: 1, background: "var(--ml-border-2)" }} />
              <span style={{ font: "500 12px Inter", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ml-text-nav)" }}>Об услуге</span>
            </div>
            <h2 style={{ margin: 0, font: "500 32px/1.16 Inter", letterSpacing: "-0.01em", color: "var(--ml-ink-900)", textWrap: "balance" }}>
              Что входит в услугу
            </h2>
            {svc.intro.map((p, i) => (
              <p key={i} style={{ margin: "20px 0 0", font: "400 16px/28px Inter", color: "var(--ml-text-slate)", maxWidth: 640 }}>{p}</p>
            ))}
            <h3 style={{ margin: "36px 0 18px", font: "500 19px Inter", color: "var(--ml-ink-900)" }}>Что мы проверяем</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 28px" }}>
              {svc.checks.map((c) => (
                <div key={c} style={{ display: "flex", gap: 11, alignItems: "flex-start" }}>
                  <span style={{ marginTop: 1, flex: "none" }}><Icon name="check" size={18} stroke={2.2} color="#141414" /></span>
                  <span style={{ font: "400 15px/22px Inter", color: "var(--ml-text-2)" }}>{c}</span>
                </div>
              ))}
            </div>
          </div>

          {/* sticky aside */}
          <div style={{ position: "sticky", top: 110, background: "#1b1b1b", borderRadius: 24, padding: "34px 34px", color: "#fff" }}>
            <div style={{ font: "500 20px/27px Inter", marginBottom: 12 }}>Нужен расчёт по вашему объекту?</div>
            <p style={{ margin: "0 0 24px", font: "400 14px/23px Inter", color: "#b4b8be" }}>
              Оставьте заявку — подготовим предварительную стоимость и сроки в течение рабочего дня.
            </p>
            <div style={{ display: "grid", gap: 14, marginBottom: 26 }}>
              {[["clock", "Ответ в течение рабочего дня"], ["shield", "Конфиденциальность гарантируем"], ["award", "Аккредитованная организация"]].map(([ic, tx]) => (
                <div key={tx} style={{ display: "flex", alignItems: "center", gap: 12, font: "400 14px Inter", color: "#cfd3d8" }}>
                  <Glyph size={22} radius={6} /> {tx}
                </div>
              ))}
            </div>
            <Btn variant="light" onClick={onCalc} style={{ width: "100%" }} icon="arrowR">Рассчитать стоимость</Btn>
          </div>
        </div>
      </Section>
    );
  }

  function App() {
    const [calc, setCalc] = React.useState(false);
    const openCalc = () => setCalc(true);
    const slug = new URLSearchParams(location.search).get("s") || "ekspertiza-pd";
    const svc = getService(slug);

    React.useEffect(() => { document.title = svc.title + " — РАМ-ТВ"; }, [svc.title]);

    return (
      <div>
        <Header onCalc={openCalc} />
        <main>
          <PageHero
            eyebrow={svc.group}
            crumbs={[{ label: "Главная", href: RT.HOME }, { label: "Услуги", href: RT.ALL }, { label: svc.title }]}
            title={svc.title}
            lead={svc.lead}
            visualIcon={svc.icon} visualLabel="Визуализация услуги"
            actions={<React.Fragment>
              <Btn size="lg" onClick={openCalc} icon="arrowR">Рассчитать стоимость</Btn>
              <a href={RT.ALL} style={{ display: "inline-flex", alignItems: "center", gap: 8, font: "500 15px Inter", color: "var(--ml-text-nav)" }}>
                <Icon name="arrowL" size={17} stroke={1.8} /> Все услуги
              </a>
            </React.Fragment>} />

          <DescriptionBlock svc={svc} num="01" onCalc={openCalc} />
          <PriceTable rows={svc.prices} num="02" onCalc={openCalc} />
          <CasesBlock num="03" />
          <Experts num="04" eyebrow="Команда" title="Наши эксперты"
            sub="Над вашим проектом работают аттестованные эксперты профильных направлений." />
          <LicenseBlock num="05" />
          <Reviews onCalc={openCalc} num="06" />
          <FaqAccordion items={svc.faq} num="07" />

          {/* closing CTA */}
          <Section style={{ paddingTop: "var(--rt-gap)" }}>
            <div style={{ background: "#141414", borderRadius: 30, padding: "60px 64px", display: "flex",
              alignItems: "center", justifyContent: "space-between", gap: 40, flexWrap: "wrap" }}>
              <div style={{ maxWidth: 640 }}>
                <h2 style={{ margin: 0, font: "500 34px/1.14 Inter", letterSpacing: "-0.01em", color: "#fff", textWrap: "balance" }}>
                  Готовы обсудить ваш проект?
                </h2>
                <p style={{ margin: "16px 0 0", font: "400 16px/27px Inter", color: "#a9adb4" }}>
                  Оставьте заявку — рассчитаем стоимость экспертизы «{svc.title.toLowerCase()}» и предложим оптимальные сроки.
                </p>
              </div>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <Btn variant="light" size="lg" onClick={openCalc} icon="arrowR">Рассчитать стоимость</Btn>
              </div>
            </div>
          </Section>
        </main>
        <Footer onCalc={openCalc} />
        <CalcModal open={calc} onClose={() => setCalc(false)} />
      </div>
    );
  }
  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
