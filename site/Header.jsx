// Sticky site header: logo, nav, Услуги hover mega-menu, contacts, CTA.
// home=true → anchor links scroll on the current page; otherwise they navigate to the home page.
function Header({ onCalc, onNav, onService, home = false }) {
  const nav = [
  { label: "О компании", id: "about", page: RT.ABOUT },
  { label: "Услуги", id: "services", mega: true, page: RT.ALL },
  { label: "Эксперты", id: "experts", page: RT.EXPERTS },
  { label: "Документы", id: "documents", page: RT.DOCS },
  { label: "Онлайн-сервисы", id: "online", page: RT.ONLINE },
  { label: "Отзывы", id: "reviews", page: RT.REVIEWS },
  { label: "Контакты", id: "contacts", page: RT.CONTACTS }];

  const [openMega, setOpenMega] = React.useState(false);
  const [hoverId, setHoverId] = React.useState(null);
  const closeTimer = React.useRef(null);

  const openNow = () => {clearTimeout(closeTimer.current);setOpenMega(true);};
  const closeSoon = () => {closeTimer.current = setTimeout(() => setOpenMega(false), 120);};

  const hrefFor = (n) => home ? "#" + n.id : (n.page || RT.home(n.id));
  const onItem = (e, n) => {
    setOpenMega(false);
    if (home) {e.preventDefault();onNav && onNav(n.id);}
  };

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 60 }}>
      {/* Utility bar */}
      <div className="rt-utilbar" style={{ background: "#141414", color: "#cfd3d8" }}>
        <div style={{ maxWidth: 1600, margin: "0 auto", padding: "9px 40px",
          display: "flex", alignItems: "center", gap: 26, font: "400 13px Inter" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#9aa0a8" }}>
            <Icon name="pin" size={15} stroke={1.6} /> г. Владивосток, ул. Проектная, 12, офис 410
          </span>
          <span style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 8, color: "#9aa0a8" }}>
            <Icon name="clock" size={15} stroke={1.6} /> Пн–Пт, 9:00–18:00
          </span>
          <a href="mailto:info@ram-tv.ru" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#e9ebed" }}>
            <Icon name="mail" size={15} stroke={1.6} /> info@ram-tv.ru
          </a>
        </div>
      </div>

      {/* Main bar */}
      <div style={{ background: "rgba(255,255,255,0.93)", backdropFilter: "blur(8px)", borderBottom: "1px solid #ededed" }}>
        <div style={{ maxWidth: 1600, margin: "0 auto", padding: "16px 40px",
          display: "flex", alignItems: "center", gap: 28 }}>
          <Logo />
          <nav style={{ display: "flex", alignItems: "center", gap: 26, marginLeft: 18 }}>
            {nav.map((n) =>
            <div key={n.id}
            onMouseEnter={() => {setHoverId(n.id);if (n.mega) openNow();}}
            onMouseLeave={() => {setHoverId(null);if (n.mega) closeSoon();}}
            style={{ position: "static" }}>
                <a href={hrefFor(n)} onClick={(e) => onItem(e, n)} style={{
                display: "inline-flex", alignItems: "center", gap: 5, cursor: "pointer", whiteSpace: "nowrap",
                font: "500 14px Inter", letterSpacing: "0.005em", textDecoration: "none",
                color: hoverId === n.id || n.mega && openMega ? "var(--ml-text-nav)" : "#141414",
                transition: "color .15s ease"
              }}>
                  {n.label}
                  {n.mega && <Icon name="chevron" size={13} stroke={2} style={{ transform: openMega ? "rotate(-90deg)" : "rotate(90deg)", opacity: .6, transition: "transform .2s ease" }} />}
                </a>
              </div>
            )}
          </nav>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 22 }}>
            <a href="tel:+74951234567" style={{ display: "grid", gap: 2, textDecoration: "none", textAlign: "right" }}>
              <span style={{ font: "600 16px Inter", color: "#141414", whiteSpace: "nowrap" }}>+7 (495) 123-45-67</span>
              <span style={{ font: "400 11px Inter", color: "var(--ml-text-nav)", letterSpacing: "0.02em" }}>Заказать звонок</span>
            </a>
            <Btn size="md" onClick={onCalc}>Рассчитать стоимость</Btn>
          </div>
        </div>

        {/* Mega-menu */}
        <div
          onMouseEnter={openNow} onMouseLeave={closeSoon}
          style={{
            position: "absolute", left: 0, right: 0, top: "100%",
            background: "#fff", borderBottom: "1px solid #ededed",
            boxShadow: openMega ? "0 24px 48px rgba(20,24,33,0.10)" : "none",
            opacity: openMega ? 1 : 0, visibility: openMega ? "visible" : "hidden",
            transform: openMega ? "translateY(0)" : "translateY(-8px)",
            transition: "opacity .18s ease, transform .18s ease, visibility .18s",
            pointerEvents: openMega ? "auto" : "none"
          }}>
          <div style={{ maxWidth: 1600, margin: "0 auto", padding: "40px 40px 44px",
            display: "grid", gridTemplateColumns: "1fr 1fr 300px", gap: 40 }}>
            {SERVICE_GROUPS.map((grp) =>
            <div key={grp.key}>
                <a href={home ? "#services" : RT.ALL}
                  onClick={home ? (e) => { e.preventDefault(); setOpenMega(false); onNav && onNav("services"); } : undefined}
                  style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18, textDecoration: "none" }}>
                  <Glyph size={34} radius={9} />
                  <span style={{ font: "500 16px Inter", color: "var(--ml-ink-900)" }}>{grp.title}</span>
                </a>
                <div style={{ display: "grid", gap: 2 }}>
                  {grp.items.map((it) =>
                <a key={it.slug}
                  href={home && onService ? undefined : RT.detail(it.slug)}
                  onClick={home && onService ? (e) => { e.preventDefault(); setOpenMega(false); onService(it.slug); } : undefined}
                  style={{
                  font: "400 14px/1.3 Inter", color: "var(--ml-text-2)", cursor: "pointer", textDecoration: "none",
                  padding: "8px 10px", borderRadius: 8, transition: "background .12s, color .12s"
                }}
                onMouseEnter={(e) => {e.currentTarget.style.background = "var(--ml-surface-1)";e.currentTarget.style.color = "#141414";}}
                onMouseLeave={(e) => {e.currentTarget.style.background = "transparent";e.currentTarget.style.color = "var(--ml-text-2)";}}>
                      {it.n}
                    </a>
                )}
                </div>
              </div>
            )}
            {/* Promo callout */}
            <div style={{ background: "#1b1b1b", borderRadius: 20, padding: "28px 28px",
              display: "flex", flexDirection: "column", color: "#fff" }}>
              <Glyph size={40} radius={11} />
              <div style={{ font: "500 19px/26px Inter", margin: "16px 0 10px" }}>
                Не знаете, какая экспертиза нужна?
              </div>
              <p style={{ margin: "0 0 22px", font: "400 14px/22px Inter", color: "#b4b8be" }}>
                Поможем определить состав работ и рассчитаем стоимость для вашего объекта.
              </p>
              <Btn variant="light" size="sm" onClick={onCalc} style={{ marginTop: "auto", alignSelf: "flex-start" }}>
                Рассчитать стоимость
              </Btn>
            </div>
          </div>
        </div>
      </div>
    </header>);

}
window.Header = Header;