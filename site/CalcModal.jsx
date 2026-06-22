// «Рассчитать стоимость» modal.
function CalcModal({ open, onClose }) {
  const [sent, setSent] = React.useState(false);
  const [svc, setSvc] = React.useState("");
  const [open2, setOpen2] = React.useState(false);
  React.useEffect(() => { if (open) { setSent(false); setSvc(""); setOpen2(false); } }, [open]);
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;

  const services = [
    "Экспертиза проектной документации",
    "Экспертиза результатов инженерных изысканий",
    "Экспертиза смет",
  ];
  const ta = { ...fieldStyle, height: 96, padding: "15px 22px", borderRadius: 22, resize: "none", fontFamily: "Inter" };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 100,
      background: "rgba(20,20,20,0.45)", backdropFilter: "blur(3px)", display: "grid", placeItems: "center", padding: 24,
      animation: "ramFade .2s ease" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: 600, maxWidth: "100%", maxHeight: "92vh", overflowY: "auto",
        background: "#fff", borderRadius: 30, padding: "44px 48px", position: "relative", animation: "ramRise .28s cubic-bezier(.2,.7,.2,1)" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 24, right: 24, width: 38, height: 38,
          borderRadius: "50%", border: "1px solid var(--ml-border-2)", background: "#fff", cursor: "pointer",
          display: "grid", placeItems: "center", color: "#79828d" }}>
          <Icon name="x" size={18} stroke={1.8} />
        </button>

        {sent ? (
          <div style={{ padding: "28px 0", textAlign: "center", display: "grid", placeItems: "center", gap: 10 }}>
            <span style={{ width: 68, height: 68, borderRadius: "50%", background: "#1b1b1b", display: "grid", placeItems: "center", marginBottom: 8 }}>
              <Icon name="check" size={30} stroke={2.4} color="#fff" />
            </span>
            <h3 style={{ margin: 0, font: "500 28px Inter", color: "#000" }}>Заявка принята</h3>
            <p style={{ margin: 0, font: "400 15px/24px Inter", color: "var(--ml-text-slate)", maxWidth: 360 }}>
              Эксперт рассчитает стоимость и свяжется с вами в течение рабочего дня.
            </p>
            <Btn onClick={onClose} style={{ marginTop: 14 }}>Хорошо</Btn>
          </div>
        ) : (
          <React.Fragment>
            <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 14 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#141414" }} />
              <span style={{ font: "500 12px Inter", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ml-text-nav)" }}>Расчёт стоимости</span>
            </div>
            <h3 style={{ margin: "0 0 8px", font: "500 30px Inter", color: "#000", letterSpacing: "-0.01em" }}>Рассчитать стоимость</h3>
            <p style={{ margin: "0 0 26px", font: "400 15px/24px Inter", color: "var(--ml-text-slate)" }}>
              Заполните форму — подготовим предварительный расчёт под ваш объект.
            </p>
            <div style={{ display: "grid", gap: 14 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <input style={fieldStyle} placeholder="Имя" />
                <input style={fieldStyle} placeholder="Телефон" />
              </div>
              <input style={fieldStyle} placeholder="E-mail" />

              {/* Service select */}
              <div style={{ position: "relative" }}>
                <button onClick={() => setOpen2((v) => !v)} style={{ ...fieldStyle, display: "flex", alignItems: "center",
                  justifyContent: "space-between", cursor: "pointer", color: svc ? "#141414" : "var(--ml-text-faint)", textAlign: "left" }}>
                  {svc || "Вид услуги"}
                  <Icon name="chevron" size={16} stroke={2} color="#79828d" style={{ transform: open2 ? "rotate(90deg)" : "rotate(90deg)" }} />
                </button>
                {open2 && (
                  <div style={{ position: "absolute", top: "calc(100% + 8px)", left: 0, right: 0, zIndex: 5,
                    background: "#fff", border: "1px solid var(--ml-border-2)", borderRadius: 18, padding: 8,
                    boxShadow: "0 18px 40px rgba(20,24,33,0.12)" }}>
                    {services.map((s) => (
                      <a key={s} onClick={() => { setSvc(s); setOpen2(false); }} style={{ display: "block", padding: "12px 16px",
                        borderRadius: 10, cursor: "pointer", font: "400 14px Inter", color: "var(--ml-text-2)", transition: "background .12s" }}
                        onMouseEnter={(e) => e.currentTarget.style.background = "var(--ml-surface-1)"}
                        onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>{s}</a>
                    ))}
                  </div>
                )}
              </div>

              <input style={fieldStyle} placeholder="Объект" />
              <textarea style={ta} placeholder="Сообщение" />
              <Btn onClick={() => setSent(true)} style={{ width: "100%", padding: 17 }} icon="arrowR">Рассчитать</Btn>
              <p style={{ margin: "2px 0 0", font: "400 12px/18px Inter", color: "var(--ml-text-muted)", textAlign: "center" }}>
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности и обработкой персональных данных.
              </p>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}
window.CalcModal = CalcModal;
