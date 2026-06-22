// Лид-форма, Документы, Онлайн-сервисы.

function LeadForm() {
  const [sent, setSent] = React.useState(false);
  const [files, setFiles] = React.useState([]);
  const inputRef = React.useRef(null);
  const onFiles = (e) => {
    const f = Array.from(e.target.files || []).map((x) => x.name);
    setFiles((prev) => [...prev, ...f].slice(0, 6));
    e.target.value = "";
  };
  const removeFile = (i) => setFiles((prev) => prev.filter((_, idx) => idx !== i));
  const ta = { ...fieldStyle, height: 120, padding: "16px 22px", borderRadius: 24, resize: "none", fontFamily: "Inter" };
  return (
    <Section id="lead" style={{ paddingTop: "var(--rt-gap)" }}>
      <div style={{ background: "#f0f0f0", borderRadius: 30, padding: "60px 60px",
        display: "grid", gridTemplateColumns: "440px 1fr", gap: 64 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <span style={{ font: "500 13px Inter", color: "var(--ml-text-muted)" }}>06</span>
            <span style={{ width: 26, height: 1, background: "var(--ml-border-2)" }} />
            <span style={{ font: "500 12px Inter", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ml-text-nav)" }}>Заявка</span>
          </div>
          <h2 style={{ margin: 0, font: "500 40px/1.12 Inter", letterSpacing: "-0.01em", color: "#000", textWrap: "balance" }}>
            Оставить заявку
          </h2>
          <p style={{ margin: "20px 0 32px", font: "400 16px/28px Inter", color: "var(--ml-text-slate)", maxWidth: 380 }}>
            Получите консультацию и предварительный расчёт стоимости. Можно приложить документацию
            по объекту — так расчёт будет точнее.
          </p>
          <div style={{ display: "grid", gap: 16 }}>
            {[["clock", "Ответим в течение рабочего дня"], ["shield", "Конфиденциальность гарантируем"], ["support", "Консультация бесплатна"]].map(([ic, tx]) => (
              <div key={tx} style={{ display: "flex", alignItems: "center", gap: 12, font: "400 15px Inter", color: "var(--ml-text-2)" }}>
                <Glyph size={24} radius={6} /> {tx}
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#fff", borderRadius: 24, padding: "40px 40px" }}>
          {sent ? (
            <div style={{ display: "grid", placeItems: "center", height: "100%", minHeight: 360, textAlign: "center", gap: 8 }}>
              <span style={{ width: 64, height: 64, borderRadius: "50%", background: "#1b1b1b", display: "grid", placeItems: "center", marginBottom: 8 }}>
                <Icon name="check" size={28} stroke={2.4} color="#fff" />
              </span>
              <h3 style={{ margin: 0, font: "500 26px Inter", color: "#000" }}>Заявка отправлена</h3>
              <p style={{ margin: 0, font: "400 15px/24px Inter", color: "var(--ml-text-slate)", maxWidth: 320 }}>
                Эксперт свяжется с вами в течение рабочего дня и подготовит предварительный расчёт.
              </p>
            </div>
          ) : (
            <div style={{ display: "grid", gap: 14 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <input style={fieldStyle} placeholder="Имя" />
                <input style={fieldStyle} placeholder="Телефон" />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <input style={fieldStyle} placeholder="E-mail" />
                <input style={fieldStyle} placeholder="Объект" />
              </div>
              <textarea style={ta} placeholder="Сообщение" />

              {/* file upload */}
              <div onClick={() => inputRef.current && inputRef.current.click()}
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
                  border: "1px dashed var(--ml-border-input)", borderRadius: 18, padding: "16px 22px", cursor: "pointer",
                  background: "var(--ml-surface-1)" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 12, font: "400 14px Inter", color: "var(--ml-text-2)" }}>
                  <Icon name="upload" size={20} stroke={1.6} color="#141414" />
                  {files.length ? `${files.length} файл(ов) выбрано` : "Перетащите файлы или выберите вручную"}
                </span>
                <Btn size="sm" variant="ghost">Прикрепить файл</Btn>
              </div>
              <input ref={inputRef} type="file" multiple onChange={onFiles} style={{ display: "none" }} />
              {files.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {files.map((f, i) => (
                    <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "6px 8px 6px 12px",
                      borderRadius: 6, background: "var(--ml-surface-1)", border: "1px solid var(--ml-border)", font: "400 13px Inter", color: "var(--ml-text-2)" }}>
                      <Icon name="pdf" size={14} stroke={1.6} /> {f}
                      <button type="button" onClick={() => removeFile(i)} aria-label={"Удалить файл " + f}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "var(--ml-border)"; e.currentTarget.style.color = "#141414"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--ml-text-muted)"; }}
                        style={{ display: "grid", placeItems: "center", width: 20, height: 20, marginLeft: 2, padding: 0,
                          border: "none", borderRadius: 5, background: "transparent", color: "var(--ml-text-muted)",
                          cursor: "pointer", transition: "background .14s, color .14s" }}>
                        <Icon name="x" size={13} stroke={2} />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              <Btn onClick={() => setSent(true)} style={{ width: "100%", padding: 17 }} icon="arrowR">Отправить</Btn>
              <p style={{ margin: "2px 0 0", font: "400 12px/18px Inter", color: "var(--ml-text-muted)", textAlign: "center" }}>
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности и обработкой персональных данных.
              </p>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}

function Documents({ num = "07", data, action = "Все документы", actionHref = RT.DOCS,
  title = "Документы и аккредитация", sub = "Официальные документы компании.", expandable = false }) {
  const [expanded, setExpanded] = React.useState(false);
  const items = expandable ? (expanded ? DOCUMENTS : DOCUMENTS.slice(0, 4)) : (data || DOCUMENTS.slice(0, 4));
  const headAction = expandable ? null : action;
  const onHeadAction = expandable
    ? undefined
    : (actionHref ? () => { location.href = actionHref; } : undefined);
  return (
    <Section id="documents" style={{ paddingTop: "var(--rt-gap)" }}>
      <SectionHead num={num} eyebrow="Документы"
        title={title}
        sub={sub}
        action={headAction} actionIcon="arrowR" onAction={onHeadAction} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
        {items.map((d) => (
          <div key={d.t} style={{ background: "#fff", border: "1px solid var(--ml-border)", borderRadius: 20,
            padding: 22, display: "flex", flexDirection: "column" }}>
            <Placeholder style={{ width: "100%", aspectRatio: "3/4", marginBottom: 20 }} radius={12} icon="pdf" label="PDF" />
            <h4 style={{ margin: "0 0 8px", font: "500 17px/23px Inter", color: "var(--ml-ink-900)" }}>{d.t}</h4>
            <p style={{ margin: "0 0 20px", font: "400 13px/21px Inter", color: "var(--ml-text-slate)" }}>{d.d}</p>
            <Btn size="sm" variant="ghost" icon="external" style={{ marginTop: "auto", alignSelf: "flex-start" }}>Открыть PDF</Btn>
          </div>
        ))}
      </div>
      {expandable && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: 36 }}>
          {expanded
            ? <Btn variant="ghost" icon="minus" onClick={() => setExpanded(false)}>Скрыть документы</Btn>
            : <Btn variant="ghost" icon="plus" onClick={() => setExpanded(true)}>Показать все документы</Btn>}
        </div>
      )}
    </Section>
  );
}

function OnlineServices({ num = "08", action, actionHref, title = "Онлайн-сервисы", sub = "Полезные инструменты для подготовки документации." }) {
  return (
    <Section id="online" style={{ paddingTop: "var(--rt-gap)" }}>
      <SectionHead num={num} eyebrow="Сервисы"
        title={title}
        sub={sub}
        action={action} actionIcon="arrowR" onAction={actionHref ? () => { location.href = actionHref; } : undefined} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
        {ONLINE_SERVICES.map((s) => (
          <div key={s.t} style={{ background: "var(--ml-surface-1)", border: "1px solid var(--ml-border)",
            borderRadius: 20, padding: 30, display: "flex", flexDirection: "column" }}>
            <Glyph size={54} radius={14} style={{ marginBottom: 24 }} />
            <h4 style={{ margin: "0 0 10px", font: "500 20px Inter", color: "var(--ml-ink-900)" }}>{s.t}</h4>
            <p style={{ margin: "0 0 24px", font: "400 14px/22px Inter", color: "var(--ml-text-slate)" }}>{s.d}</p>
            <a href={s.url || "#"} style={{ marginTop: "auto", display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer",
              font: "500 14px Inter", color: "#141414", textDecoration: "none" }}>
              {s.cta} <Icon name="external" size={16} stroke={1.8} />
            </a>
          </div>
        ))}
      </div>
    </Section>
  );
}

Object.assign(window, { LeadForm, Documents, OnlineServices });
