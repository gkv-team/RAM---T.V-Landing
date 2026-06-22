  function AboutServices({ onCalc }) {
    return (
      <Section style={{ paddingTop: "var(--rt-gap)" }}>
        <div style={{ background: "var(--ml-surface-1)", border: "1px solid var(--ml-border)", borderRadius: 30,
          padding: "52px 56px", display: "grid", gridTemplateColumns: "1fr 380px", gap: 56, alignItems: "center" }}>
          <div>
            <h2 style={{ margin: 0, font: "500 30px/1.18 Inter", letterSpacing: "-0.01em", color: "var(--ml-ink-900)", textWrap: "balance" }}>
              Цифровая подача и сопровождение
            </h2>
            <p style={{ margin: "20px 0 0", font: "400 16px/28px Inter", color: "var(--ml-text-slate)", maxWidth: 640 }}>
              Мы работаем на платформе ЕЦПЭ и помогаем подготовить документацию в машиночитаемом
              формате — пояснительную записку и техническое задание по XML-схеме Минстроя России.
              Сервисы ниже ведут на официальные платформы и инструменты подготовки документов.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
              {["ЕЦПЭ", "Госуслуги", "XML Минстрой"].map((c) => <Chip key={c}>{c}</Chip>)}
            </div>
          </div>
          <div style={{ background: "#1b1b1b", borderRadius: 24, padding: "32px 32px", color: "#fff" }}>
            <Icon name="globe" size={28} stroke={1.5} color="#fff" />
            <div style={{ font: "500 19px/26px Inter", margin: "16px 0 10px" }}>Нужна помощь с подготовкой?</div>
            <p style={{ margin: "0 0 22px", font: "400 14px/22px Inter", color: "#b4b8be" }}>
              Подготовим XML-документы и подадим проект на экспертизу через ЕЦПЭ за вас.
            </p>
            <Btn variant="light" size="sm" onClick={onCalc}>Оставить заявку</Btn>
          </div>
        </div>
      </Section>
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
            eyebrow="Сервисы"
            crumbs={[{ label: "Главная", href: RT.HOME }, { label: "Онлайн-сервисы" }]}
            title="Онлайн-сервисы"
            lead="Полезные инструменты для подготовки документации и взаимодействия с экспертизой в цифровом виде: ЕЦПЭ, Госуслуги, формирование пояснительной записки и технического задания по XML-схеме."
            visualIcon="globe" visualLabel="Онлайн-сервисы"
            actions={<Btn size="lg" onClick={openCalc} icon="arrowR">Рассчитать стоимость</Btn>} />
          <OnlineServices num="01" title="Доступные сервисы" sub="Перейдите к нужной платформе или инструменту подготовки документов." />
          <AboutServices onCalc={openCalc} />
          <CtaBand onCalc={openCalc} title="Поможем с цифровой подачей" text="Оставьте заявку — подготовим документы в нужном формате и сопроводим подачу через ЕЦПЭ." />
        </main>
        <Footer onCalc={openCalc} />
        <CalcModal open={calc} onClose={() => setCalc(false)} />
      </div>
    );
  }
  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
