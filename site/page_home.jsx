  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "density": "airy",
    "placeholderLabels": true,
    "utilityBar": true
  }/*EDITMODE-END*/;

  const GAPS = { compact: "84px", regular: "116px", airy: "148px" };

  function App() {
    const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
    const [calc, setCalc] = React.useState(false);
    const [svcSlug, setSvcSlug] = React.useState(null);
    const openCalc = () => setCalc(true);
    const openService = (slug) => setSvcSlug(slug);
    const nav = (id) => {
      const el = document.getElementById(id);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 96;
        window.scrollTo({ top: id === "top" ? 0 : y, behavior: "smooth" });
      }
    };
    return (
      <div style={{ "--rt-gap": GAPS[t.density] || "116px" }}
        data-phlabels={t.placeholderLabels ? "on" : "off"}
        data-utilbar={t.utilityBar ? "on" : "off"}>
        <Header onCalc={openCalc} onNav={nav} onService={openService} home={true} />
        <main>
          <Hero onCalc={openCalc} onNav={nav} />
          <Services onCalc={openCalc} onService={openService} />
          <Stages onCalc={openCalc} />
          <About onCalc={openCalc} />
          <Advantages />
          <Experts action={null} slider={true} />
          <LeadForm />
          <Documents expandable={true} />
          <OnlineServices />
          <Reviews onCalc={openCalc} />
          <Contacts onCalc={openCalc} />
        </main>
        <Footer onCalc={openCalc} onNav={nav} onService={openService} home={true} />
        <CalcModal open={calc} onClose={() => setCalc(false)} />
        <ServiceModal slug={svcSlug} onClose={() => setSvcSlug(null)} onCalc={openCalc} />

        <TweaksPanel title="Tweaks">
          <TweakSection label="Макет" />
          <TweakRadio label="Ритм секций" value={t.density}
            options={["compact", "regular", "airy"]}
            onChange={(v) => setTweak("density", v)} />
          <TweakToggle label="Подписи на плейсхолдерах" value={t.placeholderLabels}
            onChange={(v) => setTweak("placeholderLabels", v)} />
          <TweakToggle label="Верхняя инфо-полоса" value={t.utilityBar}
            onChange={(v) => setTweak("utilityBar", v)} />
        </TweaksPanel>
      </div>
    );
  }
  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
