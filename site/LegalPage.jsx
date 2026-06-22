// Shared layout for simple legal / text pages (title + description).
function LegalPage({ eyebrow = "Документ", title, updated, paragraphs = [] }) {
  const [calc, setCalc] = React.useState(false);
  const openCalc = () => setCalc(true);

  React.useEffect(() => { document.title = title + " — РАМ-ТВ"; }, [title]);

  return (
    <div>
      <Header onCalc={openCalc} />
      <main>
        <Section style={{ paddingTop: 48 }}>
          <Crumbs trail={[{ label: "Главная", href: RT.HOME }, { label: title }]} />
          <h1 style={{ margin: 0, font: "500 46px/1.08 Inter", letterSpacing: "-0.018em", color: "#000", textWrap: "balance", maxWidth: 900 }}>{title}</h1>
        </Section>

        <Section style={{ paddingTop: 44 }}>
          <div style={{ borderTop: "1px solid var(--ml-border)", paddingTop: 44, maxWidth: 760 }}>
            {paragraphs.map((p, i) => (
              <p key={i} style={{ margin: i ? "22px 0 0" : 0, font: "400 17px/29px Inter", color: "var(--ml-text-slate)", textWrap: "pretty" }}>{p}</p>
            ))}
          </div>
        </Section>
      </main>
      <Footer onCalc={openCalc} />
      <CalcModal open={calc} onClose={() => setCalc(false)} />
    </div>
  );
}
window.LegalPage = LegalPage;
