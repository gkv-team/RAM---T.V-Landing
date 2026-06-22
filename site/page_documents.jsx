  function App() {
    const [calc, setCalc] = React.useState(false);
    const openCalc = () => setCalc(true);
    return (
      <div>
        <Header onCalc={openCalc} />
        <main>
          <PageHero
            eyebrow="Документы"
            crumbs={[{ label: "Главная", href: RT.HOME }, { label: "Документы" }]}
            title="Документы и аккредитация"
            lead="Официальные документы компании: свидетельство об аккредитации, регламенты, аттестаты экспертов, анкеты и образцы заявлений. Все документы доступны для просмотра и скачивания."
            visualIcon="pdf" visualLabel="Документы компании"
            actions={<Btn size="lg" onClick={openCalc} icon="arrowR">Рассчитать стоимость</Btn>} />
          <Documents num="01" data={DOCUMENTS} action={null} actionHref={null}
            title="Все документы" sub="Нажмите «Открыть PDF», чтобы просмотреть документ." />
          <CtaBand onCalc={openCalc} title="Остались вопросы по документам?" text="Свяжитесь с нами — поможем подобрать нужные формы и проконсультируем по аккредитации." />
        </main>
        <Footer onCalc={openCalc} />
        <CalcModal open={calc} onClose={() => setCalc(false)} />
      </div>
    );
  }
  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
