// Dark site footer.
function Footer({ onCalc, onNav, onService, home = false }) {
  const PAGE_OF = { top: RT.HOME, about: RT.ABOUT, experts: RT.EXPERTS, documents: RT.DOCS, online: RT.ONLINE, reviews: RT.REVIEWS, contacts: RT.CONTACTS };
  const cols = [
  { head: "Навигация", links: [["Главная", "top"], ["О компании", "about"], ["Эксперты", "experts"], ["Документы", "documents"], ["Онлайн-сервисы", "online"], ["Отзывы", "reviews"], ["Контакты", "contacts"]] },
  { head: "Услуги", svc: true, links: SERVICE_GROUPS[0].items.slice(0, 5).concat(SERVICE_GROUPS[1].items.slice(0, 3)) }];

  const contacts = [
  { v: "+7 (495) 123-45-67" },
  { v: "info@ram-tv.ru" },
  { v: "г. Владивосток, ул. Проектная, 12" },
  { v: "Пн–Пт, 9:00–18:00" }];

  const reqs = [
  ["Наименование", "ООО «РАМ-ТВ»"],
  ["ИНН / КПП", "7701234567 / 770101001"],
  ["ОГРН", "1157700012345"],
  ["Р/счёт", "40702 810 4 0000 0001234"],
  ["Юр. адрес", "г. Владивосток, ул. Проектная, 12"]];

  return (
    <footer style={{ background: "#141414", color: "#fff", marginTop: 120 }}>
      <div style={{ maxWidth: 1600, margin: "0 auto", padding: "76px 40px 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "320px 1fr 1fr 300px", gap: 48 }}>
          {/* Brand */}
          <div>
            <Logo light />
            <p style={{ margin: "26px 0 0", font: "400 14px/23px Inter", color: "#9aa0a8", maxWidth: 280 }}>
              Негосударственная экспертиза проектной документации, инженерных изысканий и смет.
            </p>
          </div>
          {/* Link columns */}
          {cols.map((col) =>
          <div key={col.head}>
              <div style={{ font: "500 15px Inter", color: "#fff", marginBottom: 22 }}>{col.head}</div>
              <div style={{ display: "grid", gap: 13 }}>
                {col.svc ?
              col.links.map((it) =>
              <a key={it.slug}
              href={home && onService ? undefined : RT.detail(it.slug)}
              onClick={home && onService ? (e) => { e.preventDefault(); onService(it.slug); } : undefined}
              style={{ font: "400 14px/1.3 Inter", color: "#9aa0a8", cursor: "pointer", textDecoration: "none", transition: "color .12s" }}
              onMouseEnter={(e) => e.currentTarget.style.color = "#fff"}
              onMouseLeave={(e) => e.currentTarget.style.color = "#9aa0a8"}>{it.n}</a>
              ) :
              col.links.map(([l, id]) =>
              <a key={l}
              href={home ? "#" + id : (PAGE_OF[id] || RT.HOME)}
              onClick={home ? (e) => { e.preventDefault(); onNav && onNav(id); } : undefined}
              style={{ font: "400 14px/1.3 Inter", color: "#9aa0a8", cursor: "pointer", textDecoration: "none", transition: "color .12s" }}
              onMouseEnter={(e) => e.currentTarget.style.color = "#fff"}
              onMouseLeave={(e) => e.currentTarget.style.color = "#9aa0a8"}>{l}</a>
              )}
              </div>
            </div>
          )}
          {/* Contacts */}
          <div>
            <div style={{ font: "500 15px Inter", color: "#fff", marginBottom: 22 }}>Контакты</div>
            <div style={{ display: "grid", gap: 16, marginBottom: 26 }}>
              {contacts.map((c) =>
              <div key={c.v} style={{ font: "400 14px/1.4 Inter", color: "#cfd3d8" }}>{c.v}</div>
              )}
            </div>
            <Btn variant="light" size="sm" onClick={onCalc}>Рассчитать стоимость</Btn>
          </div>
        </div>
        <div style={{ height: 1, background: "#2d2d2d", margin: "60px 0 0" }} />
        {/* Legal requisites */}
        <div style={{ padding: "30px 0 8px" }}>
          <div style={{ font: "500 13px Inter", letterSpacing: "0.14em", textTransform: "uppercase", color: "#7c828b", marginBottom: 18 }}>Реквизиты юридического лица</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 24 }}>
            {reqs.map(([k, v]) =>
            <div key={k}>
                <div style={{ font: "400 12px Inter", color: "#7c828b", marginBottom: 6 }}>{k}</div>
                <div style={{ font: "400 14px/1.4 Inter", color: "#e9ebed" }}>{v}</div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div style={{ background: "#0f0f0f", marginTop: 40 }}>
        <div style={{ maxWidth: 1600, margin: "0 auto", padding: "22px 40px",
          display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center", font: "400 13px Inter", color: "#8a8f96" }}>
          <span>© 2026 ООО «РАМ-ТВ». Все права защищены.</span>
          <a href={RT.TERMS} style={{ color: "#8a8f96", cursor: "pointer", textDecoration: "none", transition: "color .12s" }}
            onMouseEnter={(e) => e.currentTarget.style.color = "#fff"}
            onMouseLeave={(e) => e.currentTarget.style.color = "#8a8f96"}>Пользовательское соглашение</a>
          <a href={RT.PRIVACY} style={{ color: "#8a8f96", cursor: "pointer", textDecoration: "none", transition: "color .12s" }}
            onMouseEnter={(e) => e.currentTarget.style.color = "#fff"}
            onMouseLeave={(e) => e.currentTarget.style.color = "#8a8f96"}>Политика конфиденциальности</a>
          <span style={{ marginLeft: "auto" }}>Разработано в «<a style={{ color: "#cfd3d8", cursor: "pointer", textDecoration: "none" }}>Digital-агентстве House</a>»</span>
        </div>
      </div>
    </footer>);

}
window.Footer = Footer;