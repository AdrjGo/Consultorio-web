import { Document, Page, View, Text, Image, StyleSheet } from "@react-pdf/renderer";
import type { PatientInfo, ClinicInfo } from "@types";

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
  title: {
    fontFamily: "Helvetica-Bold",
    fontSize: 12,
    textAlign: "center",
    textTransform: "uppercase",
    marginTop: 6,
    marginBottom: 2,
  },
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
  sectionTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8.5,
    textTransform: "uppercase",
    marginTop: 5,
    marginBottom: 3,
  },
  table: { borderWidth: B, borderColor: C },
  tableRow: { flexDirection: "row" },
  rowDivider: { borderBottomWidth: B, borderBottomColor: C },
  cell: { padding: 2.5, fontFamily: "Helvetica", fontSize: 8, borderRightWidth: B, borderRightColor: C },
  cellLast: { padding: 2.5, fontFamily: "Helvetica", fontSize: 8, borderRightWidth: 0 },
  cellHeader: { padding: 2.5, fontFamily: "Helvetica-Bold", fontSize: 8, backgroundColor: "#e8e8e8", borderRightWidth: B, borderRightColor: C },
  cellHeaderLast: { padding: 2.5, fontFamily: "Helvetica-Bold", fontSize: 8, backgroundColor: "#e8e8e8", borderRightWidth: 0 },
  patientLabel: { padding: 2.5, fontFamily: "Helvetica-Bold", fontSize: 8, backgroundColor: "#f0f0f0", borderRightWidth: B, borderBottomColor: C, width: "20%" },
  patientValue: { padding: 2.5, fontFamily: "Helvetica", fontSize: 8, width: "30%" },
  noDataText: { fontFamily: "Helvetica-Oblique", fontSize: 8, color: "#666", paddingVertical: 4 },
  footer: {
    borderTopWidth: B,
    borderTopColor: C,
    paddingTop: 4,
    fontFamily: "Helvetica",
    fontSize: 7,
    textAlign: "center",
    color: "#444",
  },
  // Structured section box
  sectionBox: { borderWidth: B, borderColor: C, marginBottom: 4 },
  sectionBoxTitle: { fontFamily: "Helvetica-Bold", fontSize: 8, backgroundColor: "#f0f0f0", padding: 3, borderBottomWidth: B, borderBottomColor: C },
  sectionBoxContent: { padding: 3 },
  fieldRow: { flexDirection: "row", marginBottom: 2 },
  fieldLabel: { fontFamily: "Helvetica-Bold", fontSize: 8, width: "40%" },
  fieldValue: { fontFamily: "Helvetica", fontSize: 8, flex: 1 },
  subSectionTitle: { fontFamily: "Helvetica-Bold", fontSize: 7.5, marginTop: 3, marginBottom: 2, textDecoration: "underline" },
});

type Props = {
  patient: PatientInfo;
  treatmentSummary: Record<string, unknown> | null;
  generatedAt: string;
  logo?: string;
  clinic?: ClinicInfo;
};

function formatValue(value: unknown): string {
  if (value === null || value === undefined) return "—";
  if (typeof value === "boolean") return value ? "Sí" : "No";
  if (typeof value === "object") return "";
  return String(value);
}

function SectionBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={s.sectionBox}>
      <Text style={s.sectionBoxTitle}>{title}</Text>
      <View style={s.sectionBoxContent}>{children}</View>
    </View>
  );
}

function FieldRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={s.fieldRow}>
      <Text style={s.fieldLabel}>{label}:</Text>
      <Text style={s.fieldValue}>{value}</Text>
    </View>
  );
}

function renderNestedObject(obj: Record<string, unknown>, depth = 0): React.ReactNode {
  return Object.entries(obj).map(([key, value]) => {
    if (value === null || value === undefined) return null;
    const label = formatKey(key);
    if (Array.isArray(value)) {
      if (value.length === 0) return null;
      return (
        <View key={key} style={{ marginLeft: depth * 8 }}>
          <Text style={s.subSectionTitle}>{label}</Text>
          {value.map((item, idx) => (
            <Text key={idx} style={{ fontSize: 8, marginLeft: 8, marginBottom: 1 }}>
              • {typeof item === "object" ? JSON.stringify(item) : String(item)}
            </Text>
          ))}
        </View>
      );
    }
    if (typeof value === "object") {
      return (
        <View key={key} style={{ marginLeft: depth * 8 }}>
          <Text style={s.subSectionTitle}>{label}</Text>
          {renderNestedObject(value as Record<string, unknown>, depth + 1)}
        </View>
      );
    }
    return <FieldRow key={key} label={label} value={formatValue(value)} />;
  });
}

function formatKey(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  try {
    return new Date(dateStr).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export function TreatmentSummaryPDF({ patient, treatmentSummary, generatedAt, logo, clinic }: Props) {
  const data = treatmentSummary as Record<string, unknown> | null;

  const evaluacionInicial = (data?.evaluacionInicial || {}) as Record<string, unknown>;
  const diagnosticos = (data?.diagnosticos || {}) as Record<string, unknown>;
  const planTratamiento = (data?.planTratamiento || {}) as Record<string, unknown>;
  const aspectosTecnicos = (data?.aspectosTecnicos || {}) as Record<string, unknown>;
  const seguimientoEvaluacion = (data?.seguimientoEvaluacion || {}) as Record<string, unknown>;
  const pronostico = (data?.pronostico || {}) as Record<string, unknown>;

  return (
    <Document>
      <Page size="LETTER" style={s.page}>
        <View>
          {/* HEADER */}
          <View style={s.header}>
            <View style={s.headerLeft}>
              {logo && <Image src={logo} style={s.logo} />}
            </View>
            <View style={s.headerRight}>
              <Text style={s.formNumber}>FORM N° FT-CLINIC-03</Text>
              <Text style={s.doctorNameHeader}>
                {clinic?.name ?? ""}
              </Text>
            </View>
          </View>

          <Text style={s.title}>Resumen de Tratamiento</Text>

          <View style={s.fechaRow}>
            <Text style={s.fechaLabel}>Fecha de generación</Text>
            <Text style={s.fechaValue}>{formatDate(generatedAt)}</Text>
          </View>

          {/* PATIENT INFO */}
          <Text style={s.sectionTitle}>Datos del Paciente</Text>
          <View style={s.table}>
            <View style={[s.tableRow, s.rowDivider]}>
              <Text style={[s.patientLabel, { width: "15%" }]}>Nombre</Text>
              <Text style={[s.patientValue, { width: "55%" }]}>
                {patient.name} {patient.lastName}
              </Text>
              <Text style={[s.patientLabel, { width: "10%" }]}>CI</Text>
              <Text style={[s.patientValue, { width: "20%" }]}>
                {patient.ci}
              </Text>
            </View>
            <View style={s.tableRow}>
              <Text style={[s.patientLabel, { width: "15%" }]}>Fecha Nac.</Text>
              <Text style={[s.patientValue, { width: "25%" }]}>
                {formatDate(patient.birthDate)}
              </Text>
              <Text style={[s.patientLabel, { width: "10%" }]}>Teléfono</Text>
              <Text style={[s.patientValue, { width: "50%" }]}>
                {patient.phone}
              </Text>
            </View>
          </View>

          {/* CONTENT */}
          {data && Object.keys(data).length > 0 ? (
            <View>
              {/* EVALUACIÓN INICIAL */}
              <SectionBox title="Evaluación Inicial">
                <FieldRow label="Motivo de Consulta" value={formatValue(evaluacionInicial.motivoConsulta)} />
                <FieldRow label="Complejidad" value={formatValue(evaluacionInicial.complejidad)} />
                <FieldRow label="Prioridad" value={formatValue(evaluacionInicial.prioridadTratamiento)} />
                {renderNestedObject(evaluacionInicial)}
              </SectionBox>

              {/* DIAGNÓSTICOS */}
              <SectionBox title="Diagnósticos">
                <FieldRow label="Diagnóstico Principal" value={formatValue(diagnosticos.diagnosticoPrincipal)} />
                {renderNestedObject(diagnosticos)}
              </SectionBox>

              {/* PLAN DE TRATAMIENTO */}
              <SectionBox title="Plan de Tratamiento">
                <FieldRow label="Objetivos Funcionales" value={formatValue(planTratamiento.objetivosFuncionales)} />
                <FieldRow label="Objetivos Estéticos" value={formatValue(planTratamiento.objetivosEsteticos)} />
                {renderNestedObject(planTratamiento)}
              </SectionBox>

              {/* ASPECTOS TÉCNICOS */}
              <SectionBox title="Aspectos Técnicos">
                <FieldRow label="Técnica Principal" value={formatValue(aspectosTecnicos.tecnicaPrincipal)} />
                <FieldRow label="Requiere Laboratorio" value={formatValue(aspectosTecnicos.requiereLaboratorio)} />
                {renderNestedObject(aspectosTecnicos)}
              </SectionBox>

              {/* SEGUIMIENTO Y EVALUACIÓN */}
              <SectionBox title="Seguimiento y Evaluación">
                <FieldRow label="Frecuencia de Controles" value={formatValue(seguimientoEvaluacion.frecuenciaControles)} />
                {renderNestedObject(seguimientoEvaluacion)}
              </SectionBox>

              {/* PRONÓSTICO */}
              <SectionBox title="Pronóstico">
                <FieldRow label="Pronóstico General" value={formatValue(pronostico.pronosticoGeneral)} />
                <FieldRow label="Probabilidad de Éxito" value={`${pronostico.probabilidadExito || "—"}%`} />
                {renderNestedObject(pronostico)}
              </SectionBox>
            </View>
          ) : (
            <Text style={s.noDataText}>Sin registro de resumen de tratamiento</Text>
          )}
        </View>

        <Text style={s.footer}>
          {[
            clinic?.address,
            clinic?.phone && `Tel. ${clinic.phone}`,
            clinic?.email && `e-mail: ${clinic.email}`,
            "Cbba - Bolivia",
          ]
            .filter(Boolean)
            .join(", ")}
        </Text>
      </Page>
    </Document>
  );
}