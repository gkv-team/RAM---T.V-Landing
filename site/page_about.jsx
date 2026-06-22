  function Phone() {
    return (
      <a href="tel:+74951234567" style={{ display: "grid", gap: 2, textDecoration: "none" }}>
        <span style={{ font: "600 19px Inter", color: "#141414", whiteSpace: "nowrap" }}>+7 (495) 123-45-67</span>
        <span style={{ font: "400 13px Inter", color: "var(--ml-text-nav)" }}>Консультация бесплатно</span>
      </a>
    );
  }
  function App() {
    const [calc, setCalc] = React.useState(false);
    const openCalc = () => setCalc(true);
    return (
      <div>
        <Header onCalc={openCalc} />
        <main>
          <PageHero
            eyebrow="О компании"
            crumbs={[{ label: "Главная", href: RT.HOME }, { label: "О компании" }]}
            title="Аккредитованная экспертиза полного цикла"
            lead="РАМ-ТВ — негосударственная экспертная организация. Проводим экспертизу проектной документации, результатов инженерных изысканий и сметной документации, работаем на платформе ЕЦПЭ и сопровождаем проект вплоть до получения разрешения на строительство."
            visualIcon="building" visualLabel="Офис компании"
            actions={<React.Fragment><Btn size="lg" onClick={openCalc} icon="arrowR">Рассчитать стоимость</Btn><Phone /></React.Fragment>} />
          <Advantages />
          <StatsBand />
          <Experts />
          <LicenseBlock num="05" />
          <CtaBand onCalc={openCalc} title="Обсудим ваш проект?" text="Расскажите об объекте — подберём оптимальный маршрут экспертизы и рассчитаем стоимость." />
        </main>
        <Footer onCalc={openCalc} />
        <CalcModal open={calc} onClose={() => setCalc(false)} />
      </div>
    );
  }
  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
