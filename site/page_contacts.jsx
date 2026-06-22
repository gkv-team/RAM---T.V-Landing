  function App() {
    const [calc, setCalc] = React.useState(false);
    const openCalc = () => setCalc(true);
    return (
      <div>
        <Header onCalc={openCalc} />
        <main>
          <PageHero
            eyebrow="Контакты"
            crumbs={[{ label: "Главная", href: RT.HOME }, { label: "Контакты" }]}
            title="Контакты"
            lead="Свяжитесь с нами удобным способом — по телефону, почте или в мессенджерах. Проконсультируем по экспертизе, поможем подобрать состав услуг и подготовим расчёт стоимости."
            visualIcon="pin" visualLabel="Офис компании"
            actions={<React.Fragment>
              <Btn size="lg" onClick={openCalc} icon="arrowR">Рассчитать стоимость</Btn>
              <a href="tel:+74951234567" style={{ display: "grid", gap: 2, textDecoration: "none" }}>
                <span style={{ font: "600 19px Inter", color: "#141414", whiteSpace: "nowrap" }}>+7 (495) 123-45-67</span>
                <span style={{ font: "400 13px Inter", color: "var(--ml-text-nav)" }}>Пн–Пт, 9:00–18:00</span>
              </a>
            </React.Fragment>} />
          <Contacts onCalc={openCalc} showHead={false} />
          <LeadForm />
        </main>
        <Footer onCalc={openCalc} />
        <CalcModal open={calc} onClose={() => setCalc(false)} />
      </div>
    );
  }
  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
