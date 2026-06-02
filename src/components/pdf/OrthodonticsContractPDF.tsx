import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
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

const s = StyleSheet.create({
  page: {
    padding: 35,
    fontFamily: "Times-Roman",
    fontSize: 10,
    lineHeight: 1.4,
  },

  /* ── Header ── */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  logoCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    border: "1.5pt solid #1a3a5c",
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    fontFamily: "Times-Bold",
    fontSize: 11,
    color: "#1a3a5c",
  },
  logoSubText: {
    fontFamily: "Times-Roman",
    fontSize: 7,
    color: "#1a3a5c",
    marginTop: 1,
  },
  headerRight: {
    alignItems: "flex-end",
  },
  formNumber: {
    fontFamily: "Times-Roman",
    fontSize: 8,
    color: "#555",
  },
  doctorNameHeader: {
    fontFamily: "Times-Bold",
    fontSize: 9,
    marginTop: 2,
  },

  /* ── Title ── */
  title: {
    fontFamily: "Times-Bold",
    fontSize: 13,
    textAlign: "center",
    textTransform: "uppercase",
    marginTop: 8,
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: "Times-Bold",
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
    fontFamily: "Times-Bold",
    fontSize: 10,
    marginRight: 6,
  },
  fechaValue: {
    fontFamily: "Times-Roman",
    fontSize: 10,
    borderBottom: "0.5pt solid #000",
    width: 100,
  },

  /* ── Section titles ── */
  sectionTitle: {
    fontFamily: "Times-Bold",
    fontSize: 10,
    textTransform: "uppercase",
    marginTop: 10,
    marginBottom: 4,
    borderBottom: "0.5pt solid #000",
    paddingBottom: 2,
  },

  /* ── Table base ── */
  table: {
    border: "0.5pt solid #000",
  },
  tableRow: {
    flexDirection: "row",
  },
  cell: {
    border: "0.5pt solid #000",
    padding: 3,
    fontFamily: "Times-Roman",
    fontSize: 9,
  },
  cellBold: {
    border: "0.5pt solid #000",
    padding: 3,
    fontFamily: "Times-Bold",
    fontSize: 9,
  },
  cellHeader: {
    border: "0.5pt solid #000",
    padding: 3,
    fontFamily: "Times-Bold",
    fontSize: 9,
    backgroundColor: "#e8e8e8",
  },

  /* ── Patient data ── */
  patientRow: {
    flexDirection: "row",
  },
  patientLabel: {
    border: "0.5pt solid #000",
    padding: 3,
    fontFamily: "Times-Bold",
    fontSize: 9,
    backgroundColor: "#f0f0f0",
  },
  patientValue: {
    border: "0.5pt solid #000",
    padding: 3,
    fontFamily: "Times-Roman",
    fontSize: 9,
  },

  /* ── Phases ── */
  phasesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  phaseItem: {
    width: "50%",
    fontFamily: "Times-Roman",
    fontSize: 9,
    padding: 2,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  checkbox: {
    fontFamily: "Times-Roman",
    fontSize: 10,
  },

  /* ── Aparatologia ── */
  aparatologiaBox: {
    border: "0.5pt solid #000",
    minHeight: 60,
    padding: 6,
    fontFamily: "Times-Roman",
    fontSize: 9,
  },
  aparatologiaItem: {
    fontSize: 9,
    marginBottom: 2,
  },

  /* ── Budget ── */
  tiempoRow: {
    flexDirection: "row",
    border: "0.5pt solid #000",
  },
  tiempoLabel: {
    fontFamily: "Times-Bold",
    fontSize: 9,
    padding: 3,
    border: "0.5pt solid #000",
    width: "50%",
  },
  tiempoValue: {
    fontFamily: "Times-Roman",
    fontSize: 9,
    padding: 3,
    border: "0.5pt solid #000",
    width: "50%",
    flexDirection: "row",
    alignItems: "center",
  },
  presupuestoHeader: {
    fontFamily: "Times-Bold",
    fontSize: 9,
    textAlign: "center",
    border: "0.5pt solid #000",
    padding: 3,
  },
  totalRow: {
    flexDirection: "row",
    border: "0.5pt solid #000",
  },
  totalLabel: {
    fontFamily: "Times-Bold",
    fontSize: 9,
    padding: 3,
    borderRight: "0.5pt solid #000",
    width: "60%",
  },
  totalValue: {
    fontFamily: "Times-Bold",
    fontSize: 9,
    padding: 3,
    width: "40%",
    textAlign: "right",
  },
  controlText: {
    fontFamily: "Times-Roman",
    fontSize: 8,
    border: "0.5pt solid #000",
    padding: 3,
  },

  /* ── Payment responsibility ── */
  paymentRow: {
    flexDirection: "row",
  },
  paymentLabel: {
    border: "0.5pt solid #000",
    padding: 3,
    fontFamily: "Times-Bold",
    fontSize: 9,
    backgroundColor: "#f0f0f0",
  },
  paymentValue: {
    border: "0.5pt solid #000",
    padding: 3,
    fontFamily: "Times-Roman",
    fontSize: 9,
  },

  /* ── Conditions ── */
  conditionsSection: {
    marginTop: 10,
  },
  conditionsTitle: {
    fontFamily: "Times-Bold",
    fontSize: 9,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  conditionsItem: {
    fontFamily: "Times-Roman",
    fontSize: 8.5,
    lineHeight: 1.5,
    marginBottom: 6,
    paddingLeft: 8,
  },
  conditionsSubItem: {
    fontFamily: "Times-Roman",
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
    borderBottom: "0.5pt solid #000",
    marginBottom: 4,
  },
  signatureLabel: {
    fontFamily: "Times-Roman",
    fontSize: 9,
  },
  signatureName: {
    fontFamily: "Times-Bold",
    fontSize: 9,
    marginTop: 2,
  },
  doctorSignature: {
    fontFamily: "Times-Bold",
    fontSize: 9,
    textAlign: "center",
  },

  /* ── Footer ── */
  footer: {
    marginTop: 20,
    borderTop: "0.5pt solid #000",
    paddingTop: 6,
    fontFamily: "Times-Roman",
    fontSize: 8,
    textAlign: "center",
    color: "#444",
  },
});

type Props = {
  data: OrthodonticsContractData;
};

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

  const hasBudgetRows =
    data.budgetRows && data.budgetRows.length > 0;

  return (
    <Document>
      <Page size="A4" style={s.page}>
        {/* ═══════════ HEADER ═══════════ */}
        <View style={s.header}>
          <View style={s.headerLeft}>
            <View style={s.logoCircle}>
              <Text style={s.logoText}>LCV</Text>
              <Text style={s.logoSubText}>dental</Text>
            </View>
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
          <View style={s.fechaValue} />
        </View>

        {/* ═══════════ DATOS DEL PACIENTE ═══════════ */}
        <Text style={s.sectionTitle}>Datos del Paciente</Text>
        <View style={s.table}>
          <View style={s.patientRow}>
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
                <Text style={s.checkbox}>
                  {faseTratamiento[phase.key] ? "☑" : "☐"}
                </Text>
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
          <View style={s.tiempoRow}>
            <Text style={s.tiempoLabel}>
              Tiempo estimado de tratamiento
            </Text>
            <View style={s.tiempoValue}>
              <Text>{data.monthsDuration}</Text>
              <Text>&nbsp;meses</Text>
            </View>
          </View>

          {/* Presupuesto header */}
          <Text style={s.presupuestoHeader}>PRESUPUESTO</Text>

          {/* Table header */}
          <View style={s.tableRow}>
            <Text style={[s.cellHeader, { width: "30%" }]}>Concepto</Text>
            <Text style={[s.cellHeader, { width: "15%" }]}>Costo</Text>
            <Text style={[s.cellHeader, { width: "15%" }]}>Cantidad</Text>
            <Text style={[s.cellHeader, { width: "15%" }]}>TOTAL</Text>
            <Text style={[s.cellHeader, { width: "25%" }]}>Observación</Text>
          </View>

          {/* Budget rows */}
          {hasBudgetRows ? (
            data.budgetRows!.map((row, i) => (
              <View key={i} style={s.tableRow}>
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
              {/* Fallback rows when no budget detail */}
              <View style={s.tableRow}>
                <Text style={[s.cell, { width: "30%" }]}>Cuota Inicial $us.</Text>
                <Text style={[s.cell, { width: "15%" }]}>&nbsp;</Text>
                <Text style={[s.cell, { width: "15%" }]}>&nbsp;</Text>
                <Text style={[s.cell, { width: "15%" }]}>&nbsp;</Text>
                <Text style={[s.cell, { width: "25%" }]}>&nbsp;</Text>
              </View>
              <View style={s.tableRow}>
                <Text style={[s.cell, { width: "30%" }]}>
                  Cuotas Mensuales $us.
                </Text>
                <Text style={[s.cell, { width: "15%" }]}>&nbsp;</Text>
                <Text style={[s.cell, { width: "15%" }]}>&nbsp;</Text>
                <Text style={[s.cell, { width: "15%" }]}>&nbsp;</Text>
                <Text style={[s.cell, { width: "25%" }]}>&nbsp;</Text>
              </View>
              <View style={s.tableRow}>
                <Text style={[s.cell, { width: "30%" }]}>Otro $us.</Text>
                <Text style={[s.cell, { width: "15%" }]}>&nbsp;</Text>
                <Text style={[s.cell, { width: "15%" }]}>&nbsp;</Text>
                <Text style={[s.cell, { width: "15%" }]}>&nbsp;</Text>
                <Text style={[s.cell, { width: "25%" }]}>&nbsp;</Text>
              </View>
            </>
          )}

          {/* Total row */}
          <View style={s.totalRow}>
            <Text style={[s.totalLabel, { width: "60%", textAlign: "right" }]}>
              TOTAL
            </Text>
            <Text style={[s.totalValue, { width: "40%" }]}>
              Bs. {data.totalCost.toLocaleString()}
            </Text>
          </View>

          {/* Control post-tratamiento */}
          <Text style={s.controlText}>
            Control post-tratamiento sin costo, salvo reposición de
            retenedores
          </Text>

          {/* Observaciones */}
          <View style={s.tableRow}>
            <Text style={[s.cell, { width: "100%" }]}>
              <Text style={{ fontFamily: "Times-Bold" }}>
                Observaciones generales:{" "}
              </Text>
              {observaciones || ""}
            </Text>
          </View>
        </View>

        {/* ═══════════ RESPONSABILIDAD DE PAGOS ═══════════ */}
        <Text style={s.sectionTitle}>Responsabilidad de Pagos</Text>
        <View style={s.table}>
          <View style={s.paymentRow}>
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
