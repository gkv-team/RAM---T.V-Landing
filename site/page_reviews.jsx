  function App() {
    const [calc, setCalc] = React.useState(false);
    const openCalc = () => setCalc(true);
    return (
      <div>
        <Header onCalc={openCalc} />
        <main>
          <PageHero
            eyebrow="Отзывы"
            crumbs={[{ label: "Главная", href: RT.HOME }, { label: "Отзывы" }]}
            title="Отзывы клиентов"
            lead="Мнение заказчиков о нашей работе: застройщиков, технических заказчиков, проектных организаций и инвесторов. Отзывы собраны с платформы ЕЦПЭ и независимых сервисов."
            visualIcon="chat" visualLabel="Отзывы клиентов"
            actions={<Btn size="lg" onClick={openCalc} icon="arrowR">Рассчитать стоимость</Btn>} />
          <Reviews onCalc={openCalc} num="01" layout="grid" title="Все отзывы" sub="Реальные отзывы наших заказчиков по проектам экспертизы." />
          <StatsBand />
          <CtaBand onCalc={openCalc} title="Хотите так же?" text="Оставьте заявку — проведём экспертизу в срок и поможем получить положительное заключение." />
        </main>
        <Footer onCalc={openCalc} />
        <CalcModal open={calc} onClose={() => setCalc(false)} />
      </div>
    );
  }
  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
