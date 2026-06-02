import { Document, Page, View, Text, Image, StyleSheet } from "@react-pdf/renderer";
import type { OrthodonticsContractData } from "@types";

const LOGO_BASE64 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAasAAAGrAQMAAABE3youAAAAAXNSR0IB2cksfwAAAAZQTFRFnc74////EdbysgAAAAJ0Uk5TAP9bkSK1AAAE1UlEQVR4nO2cTZLUMAyFaaAKdnAD5iZwM+BmcBPmBrCDKmAYx3+SLdvSC6XCVLJg0tAfsaUnp6djvduTwfEQ/ri/G/zrbUaNuQH2/kM6+fzOgL36Wq76VI89+1nPf7xUY2++rN4h/eXtN3317bUSYxcb/M+ri8mXE7AaxnhIwRSwkrN8CLnrsXaM4ih7rB2jOMoe68YojbLD+jFKo+ywfozSKDtMGKMwyhaTxiiMssVefJewX88XWKPH4aCa1+LU+sk1mDy1fnINJk+tn1yDDabWj4q/HEytmxzHRlPrJsex0dS6yXFsOLVuWOzVcGrt5Dj2MKSauwHD6GrcHnx1ZphUa2UgrOYYNolI8072YhKRJiYMm0SkiQnFZhFpYkKxsUbCwXRCsWlE+Fvp+dtPU+zjBxmbBpKHkmDjqokHrR2CzQPJQ0mwmbTCQeVFsEUg+YTq6SKQLJQEWwSShbJiq0CyUFZsFUgWyorNFRkOosqKreLPMlCxZfxZIMrZMpA0AxWblnY87u86bB1/moGCreNPM1CwdfxpBgq2jj/NQMEU8aeRyCdL/YejZKBgirSRGiiYIm0kcRnTpI0kLmOatJHEZUyTNpK4jGnSRhKXMVXaSCjST1XaauIypkpbTVzGVGmriUuYLm01cQnTpa0mLmG6tNXEJUyXtpq4c5gy2zWE8Ycy2yXfCVNmu+Q7Ycpsl3xHTJvtku9TmFYkRSYR04qkyCRi2myXfEdMne0SjDOYWiRZJhFTiyTLJGJqkWSZnMH0IskyOTC9SLJMDkwvkiyTM5heW1ldB2YQSQ7iCcygraSuAzNoK6nrDGbQVlLXCcwiySTKgFkkmUR5ArNIMonyBGZRctJywEySTMHHMZOSo5ZPYCYlRy2fwExKjlrGMVsBxBLAMVsBxBLAMVsBxBK4WQsgloA7ZqybmDQYM9bNUTk4Zqybo3JwzFg3R+V4Y9ZyOwoOxqzldhScN2Yt7qO8YcxapUedemPm4g617Y2Z14SwKnhj5qUkLCabYOYVKKxBzph94QpL1x6Yfb0LK94emH11DevrHph9UQ7L8n+NAbeAx5vAhfUYcJ96vFNdWI8Bd8XH++KFbYoBny8eP2Fc2IVd2IVd2IVd2IX9M9gWn7ku7G9hW/xGtQW2xW/5W2BbfPPki23x/SSIbfG9Moht8TwAxLZ4jrPHEzEQ2+JJ5hbPhLd4uu674WCLPRi+21K22KnjvHnJd2OW76Yz3w114GZBEPPdCOm7ydN3A6vz5lzfjce+m6rBnd++29N9t96D/QG+TQzODRpgF4lvqwvYj+PbNAR2NoF9VL7NXmhHGtj/5tukB3YSgn2LYJekbysn2G+KdreCvbRg565vezHYAw12XIP93WA3Odq7DnbKg335oAsA6DkAOhyAfgqgewPqFQE6U4A+GKDrBujxATqKgP4loFsK6s0COsGAvjOgyw3oqQM6+IB+Qag7EeiFtAolNbEiGOjzBLpKgR5WqGMW6M8FuoGB3mOg0xnqqwa6uIGecaBDHeiHh7rvgV5/oLMg6GMIuiaiHo2gIyToPwm6XaLemqCTJ+gbKi9fdNGSMdATFXRgBf1eUXdZ0MsWdM5FfXpBV2DQgxh1PAb9ldnlxIvJGOgdTeqg0/4UA32xVy7cfwDK0Q455LkqTQAAAABJRU5ErkJggg==";

const PHASES = [
  { key: "preventivo", label: "Preventivo" },
  { key: "ortopedico", label: "Ortopédico" },
  { key: "ortodonciaCompensacion", label: "Ort. de compensación" },
  { key: "ortodonciaCirugia", label: "Ort. para cirugía ortognática" },
  { key: "interceptivo", label: "Interceptivo" },
  { key: "correctivo", label: "Correctivo" },
  { key: "ortodonciaPeriodontal", label: "Ort. de compromiso periodontal" },
  { key: "ortodonciaRehabilitacion", label: "Ort. para rehabilitación" },
] as const;

const CONDICIONES = [
  `El Presupuesto no incluye:
- Documentación para el diagnóstico (radiografías, fotografías, modelos, etc.)
- Curaciones y/o extracciones dentales
- Cirugías
- Retenedores o placas de contención post-tratamiento`,
  `Las cuotas mensuales son una modalidad de pago acordada en este contrato y deben pagarse mensualmente hasta completar la última cuota. No están relacionadas con la frecuencia de las citas de control en el tratamiento, las mismas que se establecen de acuerdo a la técnica de tratamiento y la colaboración del paciente.`,
];

const B = 1;
const C = "#000000";

const s = StyleSheet.create({
  page: {
    padding: 35,
    fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.4,
  },

  /* ── Header ── */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 50,
    height: 50,
  },
  headerRight: {
    alignItems: "flex-end",
  },
  formNumber: {
    fontFamily: "Helvetica",
    fontSize: 8,
    color: "#555",
  },
  doctorNameHeader: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    marginTop: 2,
  },

  /* ── Title ── */
  title: {
    fontFamily: "Helvetica-Bold",
    fontSize: 13,
    textAlign: "center",
    textTransform: "uppercase",
    marginTop: 8,
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
    textAlign: "center",
    textTransform: "uppercase",
    marginBottom: 10,
  },

  /* ── Fecha ── */
  fechaRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  fechaLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    marginRight: 6,
  },
  fechaBox: {
    borderBottomWidth: B,
    borderBottomColor: C,
    width: 100,
  },

  /* ── Section titles — sin borde ── */
  sectionTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    textTransform: "uppercase",
    marginTop: 10,
    marginBottom: 4,
  },

  /* ── Table ── */
  table: {
    borderWidth: B,
    borderColor: C,
  },
  tableRow: {
    flexDirection: "row",
  },
  rowDivider: {
    borderBottomWidth: B,
    borderBottomColor: C,
  },

  /* ── Celdas — sin borde individual ── */
  cell: {
    padding: 3,
    fontFamily: "Helvetica",
    fontSize: 9,
  },
  cellBold: {
    padding: 3,
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
  },
  cellHeader: {
    padding: 3,
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    backgroundColor: "#e8e8e8",
  },

  /* ── Patient data ── */
  patientRow: {
    flexDirection: "row",
  },
  patientLabel: {
    padding: 3,
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    backgroundColor: "#f0f0f0",
  },
  patientValue: {
    padding: 3,
    fontFamily: "Helvetica",
    fontSize: 9,
  },

  /* ── Phases ── */
  phasesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  phaseItem: {
    width: "50%",
    fontFamily: "Helvetica",
    fontSize: 9,
    padding: 3,
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 12,
    height: 12,
    borderWidth: B,
    borderColor: C,
    marginRight: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxMark: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
  },

  /* ── Aparatologia ── */
  aparatologiaBox: {
    borderWidth: B,
    borderColor: C,
    minHeight: 60,
    padding: 6,
    fontFamily: "Helvetica",
    fontSize: 9,
  },
  aparatologiaItem: {
    fontSize: 9,
    marginBottom: 2,
  },

  /* ── Budget ── */
  tiempoRow: {
    flexDirection: "row",
  },
  tiempoLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    padding: 3,
    width: "50%",
  },
  tiempoValue: {
    fontFamily: "Helvetica",
    fontSize: 9,
    padding: 3,
    width: "50%",
    flexDirection: "row",
    alignItems: "center",
  },
  presupuestoHeader: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    textAlign: "center",
    padding: 3,
  },
  totalLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    padding: 3,
    width: "60%",
    textAlign: "right",
  },
  totalValue: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    padding: 3,
    width: "40%",
    textAlign: "right",
  },
  controlText: {
    fontFamily: "Helvetica",
    fontSize: 8,
    padding: 3,
  },

  /* ── Payment responsibility ── */
  paymentRow: {
    flexDirection: "row",
  },
  paymentLabel: {
    padding: 3,
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    backgroundColor: "#f0f0f0",
  },
  paymentValue: {
    padding: 3,
    fontFamily: "Helvetica",
    fontSize: 9,
  },

  /* ── Conditions ── */
  conditionsSection: {
    marginTop: 10,
  },
  conditionsItem: {
    fontFamily: "Helvetica",
    fontSize: 8.5,
    lineHeight: 1.5,
    marginBottom: 6,
    paddingLeft: 8,
  },
  conditionsSubItem: {
    fontFamily: "Helvetica",
    fontSize: 8.5,
    lineHeight: 1.5,
    paddingLeft: 16,
  },

  /* ── Signatures ── */
  signatureSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  signatureBlock: {
    width: "45%",
  },
  signatureLine: {
    borderBottomWidth: B,
    borderBottomColor: C,
    marginBottom: 4,
  },
  signatureLabel: {
    fontFamily: "Helvetica",
    fontSize: 9,
  },
  doctorSignature: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    textAlign: "center",
  },

  /* ── Footer ── */
  footer: {
    marginTop: 20,
    borderTopWidth: B,
    borderTopColor: C,
    paddingTop: 6,
    fontFamily: "Helvetica",
    fontSize: 8,
    textAlign: "center",
    color: "#444",
  },
});

type Props = {
  data: OrthodonticsContractData;
};

function Checkbox({ checked }: { checked: boolean }) {
  return (
    <View style={s.checkbox}>
      {checked && <Text style={s.checkboxMark}>X</Text>}
    </View>
  );
}

export function OrthodonticsContractPDF({ data }: Props) {
  const formResponse = data.formResponse as Record<string, unknown>;
  const faseTratamiento = (formResponse?.faseTratamiento ?? {}) as Record<
    string,
    boolean
  >;
  const aparatologia = (formResponse?.aparatologia ?? []) as Array<
    Record<string, unknown>
  >;
  const observaciones = formResponse?.observaciones as string | undefined;

  const hasBudgetRows = data.budgetRows && data.budgetRows.length > 0;

  return (
    <Document>
      <Page size="A4" style={s.page}>
        {/* ═══════════ HEADER ═══════════ */}
        <View style={s.header}>
          <View style={s.headerLeft}>
            <Image src={LOGO_BASE64} style={s.logo} />
          </View>
          <View style={s.headerRight}>
            <Text style={s.formNumber}>FORM N° FT-ORT-32</Text>
            <Text style={s.doctorNameHeader}>
              {data.doctor.doctorName || "DRA. LIPCIA CATACORA VARGAS"}
            </Text>
          </View>
        </View>

        {/* ═══════════ TITLE ═══════════ */}
        <Text style={s.title}>Tratamiento de Ortopedia</Text>
        <Text style={s.subtitle}>Presupuesto-Contrato</Text>

        {/* ═══════════ FECHA ═══════════ */}
        <View style={s.fechaRow}>
          <Text style={s.fechaLabel}>Fecha</Text>
          <View style={s.fechaBox} />
        </View>

        {/* ═══════════ DATOS DEL PACIENTE ═══════════ */}
        <Text style={s.sectionTitle}>Datos del Paciente</Text>
        <View style={s.table}>
          <View style={[s.patientRow, s.rowDivider]}>
            <Text style={[s.patientLabel, { width: "15%" }]}>Nombre</Text>
            <Text style={[s.patientValue, { width: "55%" }]}>
              {data.patient.firstName} {data.patient.lastName}
            </Text>
            <Text style={[s.patientLabel, { width: "10%" }]}>Edad</Text>
            <Text style={[s.patientValue, { width: "20%" }]}>
              {data.patient.age}
            </Text>
          </View>
          <View style={s.patientRow}>
            <Text style={[s.patientLabel, { width: "15%" }]}>Dirección</Text>
            <Text style={[s.patientValue, { width: "45%" }]}>
              {data.patient.address}
            </Text>
            <Text style={[s.patientLabel, { width: "10%" }]}>Teléfono</Text>
            <Text style={[s.patientValue, { width: "30%" }]}>
              {data.patient.phone}
            </Text>
          </View>
        </View>

        {/* ═══════════ FASE DEL TRATAMIENTO ═══════════ */}
        <Text style={s.sectionTitle}>Fase del Tratamiento</Text>
        <View style={s.table}>
          <View style={s.phasesGrid}>
            {PHASES.map((phase) => (
              <View key={phase.key} style={s.phaseItem}>
                <Checkbox checked={!!faseTratamiento[phase.key]} />
                <Text>{phase.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ═══════════ APARATOLOGÍA ═══════════ */}
        <Text style={s.sectionTitle}>Aparatología</Text>
        <View style={s.aparatologiaBox}>
          {aparatologia.length > 0 ? (
            aparatologia.map((item, i) => (
              <Text key={i} style={s.aparatologiaItem}>
                • {String(item.arcada ?? "")} -{" "}
                {String(item.aparato ?? "")}
                {item.especificacion
                  ? ` (${String(item.especificacion)})`
                  : ""}
              </Text>
            ))
          ) : (
            <Text style={{ color: "#999" }}>&nbsp;</Text>
          )}
        </View>

        {/* ═══════════ TIEMPO Y PRESUPUESTO ═══════════ */}
        <Text style={s.sectionTitle}>Tiempo y Presupuesto</Text>
        <View style={s.table}>
          {/* Tiempo */}
          <View style={[s.tiempoRow, s.rowDivider]}>
            <Text style={s.tiempoLabel}>
              Tiempo estimado de tratamiento
            </Text>
            <View style={s.tiempoValue}>
              <Text>{data.monthsDuration}</Text>
              <Text>&nbsp;meses</Text>
            </View>
          </View>

          {/* Presupuesto header */}
          <View style={s.rowDivider}>
            <Text style={s.presupuestoHeader}>PRESUPUESTO</Text>
          </View>

          {/* Table header */}
          <View style={[s.tableRow, s.rowDivider]}>
            <Text style={[s.cellHeader, { width: "30%" }]}>Concepto</Text>
            <Text style={[s.cellHeader, { width: "15%" }]}>Costo</Text>
            <Text style={[s.cellHeader, { width: "15%" }]}>Cantidad</Text>
            <Text style={[s.cellHeader, { width: "15%" }]}>TOTAL</Text>
            <Text style={[s.cellHeader, { width: "25%" }]}>Observación</Text>
          </View>

          {/* Budget rows */}
          {hasBudgetRows ? (
            data.budgetRows!.map((row, i) => (
              <View
                key={i}
                style={[s.tableRow, s.rowDivider]}
              >
                <Text style={[s.cell, { width: "30%" }]}>{row.concepto}</Text>
                <Text style={[s.cell, { width: "15%" }]}>
                  {row.costo.toLocaleString()}
                </Text>
                <Text style={[s.cell, { width: "15%" }]}>
                  {row.cantidad}
                </Text>
                <Text style={[s.cell, { width: "15%" }]}>
                  {row.total.toLocaleString()}
                </Text>
                <Text style={[s.cell, { width: "25%" }]}>
                  {row.observacion || ""}
                </Text>
              </View>
            ))
          ) : (
            <>
              <View style={[s.tableRow, s.rowDivider]}>
                <Text style={[s.cell, { width: "30%" }]}>
                  Cuota Inicial $us.
                </Text>
                <Text style={[s.cell, { width: "15%" }]}>&nbsp;</Text>
                <Text style={[s.cell, { width: "15%" }]}>&nbsp;</Text>
                <Text style={[s.cell, { width: "15%" }]}>&nbsp;</Text>
                <Text style={[s.cell, { width: "25%" }]}>&nbsp;</Text>
              </View>
              <View style={[s.tableRow, s.rowDivider]}>
                <Text style={[s.cell, { width: "30%" }]}>
                  Cuotas Mensuales $us.
                </Text>
                <Text style={[s.cell, { width: "15%" }]}>&nbsp;</Text>
                <Text style={[s.cell, { width: "15%" }]}>&nbsp;</Text>
                <Text style={[s.cell, { width: "15%" }]}>&nbsp;</Text>
                <Text style={[s.cell, { width: "25%" }]}>&nbsp;</Text>
              </View>
              <View style={[s.tableRow, s.rowDivider]}>
                <Text style={[s.cell, { width: "30%" }]}>Otro $us.</Text>
                <Text style={[s.cell, { width: "15%" }]}>&nbsp;</Text>
                <Text style={[s.cell, { width: "15%" }]}>&nbsp;</Text>
                <Text style={[s.cell, { width: "15%" }]}>&nbsp;</Text>
                <Text style={[s.cell, { width: "25%" }]}>&nbsp;</Text>
              </View>
            </>
          )}

          {/* Total row */}
          <View style={s.tableRow}>
            <Text style={[s.totalLabel, { width: "60%" }]}>TOTAL</Text>
            <Text style={[s.totalValue, { width: "40%" }]}>
              Bs. {data.totalCost.toLocaleString()}
            </Text>
          </View>

          {/* Control post-tratamiento */}
          <View style={s.rowDivider}>
            <Text style={s.controlText}>
              Control post-tratamiento sin costo, salvo reposición de
              retenedores
            </Text>
          </View>

          {/* Observaciones */}
          <View style={s.tableRow}>
            <Text style={[s.cell, { width: "100%" }]}>
              <Text style={{ fontFamily: "Helvetica-Bold" }}>
                Observaciones generales:{" "}
              </Text>
              {observaciones || ""}
            </Text>
          </View>
        </View>

        {/* ═══════════ RESPONSABILIDAD DE PAGOS ═══════════ */}
        <Text style={s.sectionTitle}>Responsabilidad de Pagos</Text>
        <View style={s.table}>
          <View style={[s.paymentRow, s.rowDivider]}>
            <Text style={[s.paymentLabel, { width: "15%" }]}>Nombre</Text>
            <Text style={[s.paymentValue, { width: "40%" }]}>
              {data.paymentManager.nombre || ""}
            </Text>
            <Text style={[s.paymentLabel, { width: "15%" }]}>Parentezco</Text>
            <Text style={[s.paymentValue, { width: "30%" }]}>
              {data.paymentManager.parentesco || ""}
            </Text>
          </View>
          <View style={s.paymentRow}>
            <Text style={[s.paymentLabel, { width: "15%" }]}>E-Mail</Text>
            <Text style={[s.paymentValue, { width: "30%" }]}>
              {data.paymentManager.email || ""}
            </Text>
            <Text style={[s.paymentLabel, { width: "10%" }]}>Tel.</Text>
            <Text style={[s.paymentValue, { width: "15%" }]}>
              {data.paymentManager.telefono || ""}
            </Text>
            <Text style={[s.paymentLabel, { width: "10%" }]}>Celular</Text>
            <Text style={[s.paymentValue, { width: "20%" }]}>
              {data.paymentManager.celular || ""}
            </Text>
          </View>
        </View>

        {/* ═══════════ CONDICIONES ═══════════ */}
        <View style={s.conditionsSection}>
          {CONDICIONES.map((cond, i) => {
            const lines = cond.split("\n");
            return (
              <View key={i}>
                <Text style={s.conditionsItem}>
                  {i + 1}. {lines[0]}
                </Text>
                {lines.slice(1).map((line, j) => (
                  <Text key={j} style={s.conditionsSubItem}>
                    {line}
                  </Text>
                ))}
              </View>
            );
          })}
        </View>

        {/* ═══════════ FIRMAS ═══════════ */}
        <View style={s.signatureSection}>
          <View style={s.signatureBlock}>
            <View style={s.signatureLine} />
            <Text style={s.signatureLabel}>Nombre: </Text>
            <Text style={s.signatureLabel}>C.I.</Text>
          </View>
          <View style={s.signatureBlock}>
            <View style={s.signatureLine} />
            <Text style={s.doctorSignature}>
              {data.doctor.doctorName || "Dra. Lipcia Catacora Vargas"}
            </Text>
          </View>
        </View>

        {/* ═══════════ FOOTER ═══════════ */}
        <Text style={s.footer}>
          {data.doctor.clinicAddress ||
            "Calle Ecuador N - 871, Edif. CEMPRO, Piso 2. Consultorio. Tel. 4662622, e-mail: LCVdental@gmail.com, Cbba - Bolivia"}
        </Text>
      </Page>
    </Document>
  );
}
