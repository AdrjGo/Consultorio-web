import { Document, Page, View, Text, Image, StyleSheet } from "@react-pdf/renderer";
import type { OrthodonticsContractData } from "@types";

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

const B = 0.75;
const C = "#000000";

const s = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
    fontSize: 8.5,
    lineHeight: 1.3,
    justifyContent: "space-between",
  },

  /* ── Header ── */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  headerLeft: { flexDirection: "row", alignItems: "center" },
  logo: { width: 42, height: 42 },
  headerRight: { alignItems: "flex-end" },
  formNumber: { fontFamily: "Helvetica", fontSize: 7.5, color: "#555" },
  doctorNameHeader: { fontFamily: "Helvetica-Bold", fontSize: 8.5, marginTop: 2 },

  /* ── Title ── */
  title: {
    fontFamily: "Helvetica-Bold",
    fontSize: 12,
    textAlign: "center",
    textTransform: "uppercase",
    marginTop: 6,
    marginBottom: 2,
  },
  subtitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    textAlign: "center",
    textTransform: "uppercase",
    marginBottom: 6,
  },

  /* ── Fecha ── */
  fechaRow: { flexDirection: "row", justifyContent: "flex-end", marginBottom: 6 },
  fechaLabel: { fontFamily: "Helvetica-Bold", fontSize: 8.5, marginRight: 4 },
  fechaValue: {
    fontFamily: "Helvetica",
    fontSize: 8.5,
    borderBottomWidth: B,
    borderBottomColor: C,
    width: 90,
    textAlign: "center",
  },

  /* ── Section titles ── */
  sectionTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8.5,
    textTransform: "uppercase",
    marginTop: 5,
    marginBottom: 3,
  },

  /* ── Table ── */
  table: { borderWidth: B, borderColor: C },
  tableRow: { flexDirection: "row" },
  rowDivider: { borderBottomWidth: B, borderBottomColor: C },

  /* ── Cells ── */
  cell: { padding: 2.5, fontFamily: "Helvetica", fontSize: 8, borderRightWidth: B, borderRightColor: C },
  cellLast: { padding: 2.5, fontFamily: "Helvetica", fontSize: 8, borderRightWidth: 0 },
  cellHeader: { padding: 2.5, fontFamily: "Helvetica-Bold", fontSize: 8, backgroundColor: "#e8e8e8", borderRightWidth: B, borderRightColor: C },
  cellHeaderLast: { padding: 2.5, fontFamily: "Helvetica-Bold", fontSize: 8, backgroundColor: "#e8e8e8", borderRightWidth: 0 },

  /* ── Patient data ── */
  patientLabel: { padding: 2.5, fontFamily: "Helvetica-Bold", fontSize: 8, backgroundColor: "#f0f0f0", borderRightWidth: B, borderRightColor: C },
  patientValue: { padding: 2.5, fontFamily: "Helvetica", fontSize: 8, borderRightWidth: B, borderRightColor: C },
  patientValueLast: { padding: 2.5, fontFamily: "Helvetica", fontSize: 8, borderRightWidth: 0 },

  /* ── Phases ── */
  phasesGrid: { flexDirection: "row", flexWrap: "wrap" },
  phaseItem: { width: "50%", fontFamily: "Helvetica", fontSize: 8, padding: 2.5, flexDirection: "row", alignItems: "center" },
  checkbox: { width: 10, height: 10, borderWidth: B, borderColor: C, marginRight: 3, justifyContent: "center", alignItems: "center" },
  checkboxMark: { fontSize: 7, fontFamily: "Helvetica-Bold" },

  /* ── Aparatologia ── */
  aparatologiaBox: { borderWidth: B, borderColor: C, height: 55, padding: 4, fontFamily: "Helvetica", fontSize: 8 },
  aparatologiaItem: { fontSize: 8, marginBottom: 1 },

  /* ── Budget ── */
  tiempoLabel: { fontFamily: "Helvetica-Bold", fontSize: 8, padding: 2.5, width: "50%", borderRightWidth: B, borderRightColor: C },
  tiempoValue: { fontFamily: "Helvetica", fontSize: 8, padding: 2.5, width: "50%", flexDirection: "row", alignItems: "center" },
  presupuestoHeader: { fontFamily: "Helvetica-Bold", fontSize: 8, textAlign: "center", padding: 2.5 },
  totalLabel: { fontFamily: "Helvetica-Bold", fontSize: 8, padding: 2.5, width: "60%", textAlign: "right", borderRightWidth: B, borderRightColor: C },
  totalValue: { fontFamily: "Helvetica-Bold", fontSize: 8, padding: 2.5, width: "40%", textAlign: "right" },
  controlText: { fontFamily: "Helvetica", fontSize: 7.5, padding: 2.5 },

  /* ── Payment responsibility ── */
  paymentLabel: { padding: 2.5, fontFamily: "Helvetica-Bold", fontSize: 8, backgroundColor: "#f0f0f0", borderRightWidth: B, borderRightColor: C },
  paymentValue: { padding: 2.5, fontFamily: "Helvetica", fontSize: 8, borderRightWidth: B, borderRightColor: C },
  paymentValueLast: { padding: 2.5, fontFamily: "Helvetica", fontSize: 8, borderRightWidth: 0 },

  /* ── Conditions ── */
  conditionsSection: { marginTop: 6 },
  conditionsItem: { fontFamily: "Helvetica", fontSize: 7.5, lineHeight: 1.4, marginBottom: 4, paddingLeft: 8 },
  conditionsSubItem: { fontFamily: "Helvetica", fontSize: 7.5, lineHeight: 1.4, paddingLeft: 14 },

  /* ── Signatures ── */
  signatureSection: { flexDirection: "row", justifyContent: "space-between", marginTop: 60 },
  signatureBlock: { width: "40%" },
  signatureLine: { borderBottomWidth: B, borderBottomColor: C, marginBottom: 3 },
  signatureLabel: { fontFamily: "Helvetica", fontSize: 8 },
  doctorSignature: { fontFamily: "Helvetica-Bold", fontSize: 8, textAlign: "center" },

  /* ── Footer ── */
  footer: {
    borderTopWidth: B,
    borderTopColor: C,
    paddingTop: 4,
    fontFamily: "Helvetica",
    fontSize: 7,
    textAlign: "center",
    color: "#444",
  },
  checkedInner: {
    width: 6,
    height: 6,
    backgroundColor: '#000000',
  },
});

type Props = {
  data: OrthodonticsContractData;
  contractDate?: string;
  logo?: string;
};

function Checkbox({ checked }: { checked: boolean }) {
  return (
    <View style={s.checkbox}>
      {checked && <View style={s.checkedInner} />}
    </View>
  );
}

export function OrthodonticsContractPDF({ data, contractDate, logo }: Props) {
  const formResponse = data.formResponse as Record<string, unknown>;
  const faseTratamiento = (formResponse?.faseTratamiento ?? {}) as Record<string, boolean>;
  const aparatologia = (formResponse?.aparatologia ?? []) as Array<Record<string, unknown>>;

  // DEBUG: remove after testing
  const observaciones = formResponse?.observaciones as string | undefined;
  const hasBudgetRows = data.budgetRows && data.budgetRows.length > 0;

  return (
    <Document>
      <Page size="LETTER" style={s.page}>
        {/* ═══════════ HEADER ═══════════ */}
        <View>
          <View style={s.header}>
            <View style={s.headerLeft}>
              {logo && <Image src={logo} style={s.logo} />}
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
            <Text style={s.fechaValue}>{contractDate || ""}</Text>
          </View>

          {/* ═══════════ DATOS DEL PACIENTE ═══════════ */}
          <Text style={s.sectionTitle}>Datos del Paciente</Text>
          <View style={s.table}>
            <View style={[s.tableRow, s.rowDivider]}>
              <Text style={[s.patientLabel, { width: "15%" }]}>Nombre</Text>
              <Text style={[s.patientValue, { width: "55%" }]}>
                {data.patient.firstName} {data.patient.lastName}
              </Text>
              <Text style={[s.patientLabel, { width: "10%" }]}>Edad</Text>
              <Text style={[s.patientValueLast, { width: "20%" }]}>
                {data.patient.age}
              </Text>
            </View>
            <View style={s.tableRow}>
              <Text style={[s.patientLabel, { width: "15%" }]}>Dirección</Text>
              <Text style={[s.patientValue, { width: "45%" }]}>
                {data.patient.address}
              </Text>
              <Text style={[s.patientLabel, { width: "10%" }]}>Teléfono</Text>
              <Text style={[s.patientValueLast, { width: "30%" }]}>
                {data.patient.phone}
              </Text>
            </View>
          </View>

          {/* ═══════════ FASE DEL TRATAMIENTO ═══════════ */}
          <Text style={s.sectionTitle}>Fase del Tratamiento</Text>
          <View style={s.table}>
            <View style={s.phasesGrid}>
              {PHASES.map((phase) => {
                const isChecked = !!faseTratamiento[phase.key];
                return (
                  <View key={phase.key} style={s.phaseItem}>
                    <Checkbox checked={isChecked} />
                    <Text>{phase.label}</Text>
                  </View>
                );
              })}
            </View>
          </View>

          {/* ═══════════ APARATOLOGÍA ═══════════ */}
          <Text style={s.sectionTitle}>Aparatología</Text>
          <View style={s.aparatologiaBox}>
            {aparatologia.length > 0 ? (
              aparatologia.map((item, i) => (
                <Text key={i} style={s.aparatologiaItem}>
                  • {String(item.arcada ?? "")} - {String(item.aparato ?? "")}
                  {item.especificacion ? ` (${String(item.especificacion)})` : ""}
                </Text>
              ))
            ) : (
              <Text>&nbsp;</Text>
            )}
          </View>

          {/* ═══════════ TIEMPO Y PRESUPUESTO ═══════════ */}
          <Text style={s.sectionTitle}>Tiempo y Presupuesto</Text>
          <View style={s.table}>
            <View style={[s.tableRow, s.rowDivider]}>
              <Text style={s.tiempoLabel}>Tiempo estimado de tratamiento</Text>
              <View style={s.tiempoValue}>
                <Text>{data.monthsDuration} meses</Text>
              </View>
            </View>

            <View style={s.rowDivider}>
              <Text style={s.presupuestoHeader}>PRESUPUESTO</Text>
            </View>

            <View style={[s.tableRow, s.rowDivider]}>
              <Text style={[s.cellHeader, { width: "30%" }]}>Concepto</Text>
              <Text style={[s.cellHeader, { width: "15%" }]}>Costo</Text>
              <Text style={[s.cellHeader, { width: "15%" }]}>Cantidad</Text>
              <Text style={[s.cellHeader, { width: "15%" }]}>TOTAL</Text>
              <Text style={[s.cellHeaderLast, { width: "25%" }]}>Observación</Text>
            </View>

            {hasBudgetRows ? (
              data.budgetRows!.map((row, i) => (
                <View key={i} style={[s.tableRow, s.rowDivider]}>
                  <Text style={[s.cell, { width: "30%" }]}>{row.concepto}</Text>
                  <Text style={[s.cell, { width: "15%" }]}>{row.costo.toLocaleString()}</Text>
                  <Text style={[s.cell, { width: "15%" }]}>{row.cantidad}</Text>
                  <Text style={[s.cell, { width: "15%" }]}>{row.total.toLocaleString()}</Text>
                  <Text style={[s.cellLast, { width: "25%" }]}>{row.observacion || ""}</Text>
                </View>
              ))
            ) : (
              <>
                <View style={[s.tableRow, s.rowDivider]}>
                  <Text style={[s.cell, { width: "30%" }]}>Cuota Inicial $us.</Text>
                  <Text style={[s.cell, { width: "15%" }]}>&nbsp;</Text>
                  <Text style={[s.cell, { width: "15%" }]}>&nbsp;</Text>
                  <Text style={[s.cell, { width: "15%" }]}>&nbsp;</Text>
                  <Text style={[s.cellLast, { width: "25%" }]}>&nbsp;</Text>
                </View>
                <View style={[s.tableRow, s.rowDivider]}>
                  <Text style={[s.cell, { width: "30%" }]}>Cuotas Mensuales $us.</Text>
                  <Text style={[s.cell, { width: "15%" }]}>&nbsp;</Text>
                  <Text style={[s.cell, { width: "15%" }]}>&nbsp;</Text>
                  <Text style={[s.cell, { width: "15%" }]}>&nbsp;</Text>
                  <Text style={[s.cellLast, { width: "25%" }]}>&nbsp;</Text>
                </View>
              </>
            )}

            <View style={s.tableRow}>
              <Text style={[s.totalLabel, { width: "60%" }]}>TOTAL</Text>
              <Text style={[s.totalValue, { width: "40%" }]}>
                Bs. {data.totalCost.toLocaleString()}
              </Text>
            </View>

            <View style={s.rowDivider}>
              <Text style={s.controlText}>
                Control post-tratamiento sin costo, salvo reposición de retenedores
              </Text>
            </View>

            <View style={s.tableRow}>
              <Text style={[s.cellLast, { width: "100%" }]}>
                <Text style={{ fontFamily: "Helvetica-Bold" }}>Observaciones generales: </Text>
                {observaciones || ""}
              </Text>
            </View>
          </View>

          {/* ═══════════ RESPONSABILIDAD DE PAGOS ═══════════ */}
          <Text style={s.sectionTitle}>Responsabilidad de Pagos</Text>
          <View style={s.table}>
            <View style={[s.tableRow, s.rowDivider]}>
              <Text style={[s.paymentLabel, { width: "15%" }]}>Nombre</Text>
              <Text style={[s.paymentValue, { width: "40%" }]}>{data.paymentManager.nombre || ""}</Text>
              <Text style={[s.paymentLabel, { width: "15%" }]}>Parentezco</Text>
              <Text style={[s.paymentValueLast, { width: "30%" }]}>{data.paymentManager.parentesco || ""}</Text>
            </View>
            <View style={s.tableRow}>
              <Text style={[s.paymentLabel, { width: "15%" }]}>E-Mail</Text>
              <Text style={[s.paymentValue, { width: "30%" }]}>{data.paymentManager.email || ""}</Text>
              <Text style={[s.paymentLabel, { width: "10%" }]}>Tel.</Text>
              <Text style={[s.paymentValue, { width: "15%" }]}>{data.paymentManager.telefono || ""}</Text>
              <Text style={[s.paymentLabel, { width: "10%" }]}>Celular</Text>
              <Text style={[s.paymentValueLast, { width: "20%" }]}>{data.paymentManager.celular || ""}</Text>
            </View>
          </View>

          {/* ═══════════ CONDICIONES ═══════════ */}
          <View style={s.conditionsSection}>
            {CONDICIONES.map((cond, i) => {
              const lines = cond.split("\n");
              return (
                <View key={i}>
                  <Text style={s.conditionsItem}>{i + 1}. {lines[0]}</Text>
                  {lines.slice(1).map((line, j) => (
                    <Text key={j} style={s.conditionsSubItem}>{line}</Text>
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
                {`Dr/a. ${data.doctor.doctorName}` || "Dra. Lipcia Catacora Vargas"}
              </Text>
            </View>
          </View>
        </View>

        {/* ═══════════ FOOTER — siempre abajo ═══════════ */}
        <Text style={s.footer}>
          {[
            data.doctor.clinicAddress,
            data.doctor.clinicPhone && `Tel. ${data.doctor.clinicPhone}`,
            data.doctor.clinicEmail && `e-mail: ${data.doctor.clinicEmail}`,
            "Cbba - Bolivia",
          ]
            .filter(Boolean)
            .join(", ")}
        </Text>
      </Page>
    </Document>
  );
}
