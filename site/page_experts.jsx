  function App() {
    const [calc, setCalc] = React.useState(false);
    const openCalc = () => setCalc(true);
    return (
      <div>
        <Header onCalc={openCalc} />
        <main>
          <PageHero
            eyebrow="Команда"
            crumbs={[{ label: "Главная", href: RT.HOME }, { label: "Эксперты" }]}
            title="Эксперты компании"
            lead="В команде — аттестованные эксперты по всем профильным направлениям: архитектурные и конструктивные решения, инженерные системы, изыскания, пожарная безопасность, экология и сметная документация."
            visualIcon="users" visualLabel="Команда экспертов"
            actions={<React.Fragment>
              <Btn size="lg" onClick={openCalc} icon="arrowR">Рассчитать стоимость</Btn>
              <a href={RT.CONTACTS} style={{ display: "inline-flex", alignItems: "center", gap: 8, font: "500 15px Inter", color: "var(--ml-text-nav)" }}>
                Связаться <Icon name="arrowR" size={17} stroke={1.8} />
              </a>
            </React.Fragment>} />
          <Experts num="01" eyebrow="Специалисты" title="Все специалисты"
            sub="Каждый эксперт имеет действующую квалификационную аттестацию по своему направлению."
            data={EXPERTS} action={null} actionHref={null} />
          <StatsBand />
          <CtaBand onCalc={openCalc} title="Нужна консультация эксперта?" text="Опишите задачу — направим её профильному специалисту и подготовим расчёт." />
        </main>
        <Footer onCalc={openCalc} />
        <CalcModal open={calc} onClose={() => setCalc(false)} />
      </div>
    );
  }
  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
