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
  sectionBox: { borderWidth: B, borderColor: C, marginBottom: 4 },
  sectionBoxTitle: { fontFamily: "Helvetica-Bold", fontSize: 8, backgroundColor: "#f0f0f0", padding: 3, borderBottomWidth: B, borderBottomColor: C },
  sectionBoxContent: { padding: 3 },
  fieldRow: { flexDirection: "row", marginBottom: 2 },
  fieldLabel: { fontFamily: "Helvetica-Bold", fontSize: 8, width: "45%" },
  fieldValue: { fontFamily: "Helvetica", fontSize: 8, flex: 1 },
  subSectionTitle: { fontFamily: "Helvetica-Bold", fontSize: 7.5, marginTop: 3, marginBottom: 2, textDecoration: "underline" },
  twoColRow: { flexDirection: "row" },
  twoColItem: { flex: 1, paddingRight: 4 },
});

type Props = {
  patient: PatientInfo;
  clinicHistory: Record<string, unknown> | null;
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
            <View key={idx} style={{ marginLeft: 4, marginBottom: 2 }}>
              <Text style={{ fontSize: 8 }}>
                • {typeof item === "object" ? JSON.stringify(item) : String(item)}
              </Text>
            </View>
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

export function OrthodonticsHistoryPDF({ patient, clinicHistory, generatedAt, logo, clinic }: Props) {
  const data = clinicHistory as Record<string, unknown> | null;

  const analisisFacial = (data?.analisisFacial || {}) as Record<string, unknown>;
  const datosGenerales = (data?.datosGenerales || {}) as Record<string, unknown>;
  const examenPretratamiento = (data?.examenPretratamiento || {}) as Record<string, unknown>;

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
              <Text style={s.formNumber}>FORM N° FT-CLINIC-02</Text>
              <Text style={s.doctorNameHeader}>
                {clinic?.name || "DRA. LIPCIA CATACORA VARGAS"}
              </Text>
            </View>
          </View>

          <Text style={s.title}>Historia Clínica de Ortodoncia</Text>

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
              {/* ANÁLISIS FACIAL */}
              <SectionBox title="Análisis Facial">
                <View style={s.twoColRow}>
                  <View style={s.twoColItem}>
                    <FieldRow label="Proporciones Cefálicas" value={formatValue(analisisFacial.proporcionesCefalicas)} />
                    <FieldRow label="Simetría Facial" value={formatValue(analisisFacial.simetriaFacial)} />
                    <FieldRow label="Convexidad Facial" value={formatValue(analisisFacial.convexidadFacial)} />
                    <FieldRow label="Divergencia Facial" value={formatValue(analisisFacial.divergenciaFacial)} />
                  </View>
                  <View style={s.twoColItem}>
                    <FieldRow label="Postura Labial" value={formatValue(analisisFacial.posturaLabial)} />
                    <FieldRow label="Tamaño Nariz" value={formatValue(analisisFacial.tamanoNariz)} />
                    <FieldRow label="Apertura Bucal Máx." value={formatValue(analisisFacial.aperturaBucalMax)} />
                    <FieldRow label="Overbite" value={formatValue(analisisFacial.overbite)} />
                  </View>
                </View>
                {renderNestedObject(analisisFacial)}
              </SectionBox>

              {/* DATOS GENERALES */}
              <SectionBox title="Datos Generales">
                {renderNestedObject(datosGenerales)}
              </SectionBox>

              {/* EXAMEN PRETRATAMIENTO */}
              <SectionBox title="Examen Pretratamiento">
                <FieldRow label="Interconsulta" value={formatValue(examenPretratamiento.interconsulta)} />
                <FieldRow label="Observaciones" value={formatValue(examenPretratamiento.observaciones)} />
                {renderNestedObject(examenPretratamiento)}
              </SectionBox>
            </View>
          ) : (
            <Text style={s.noDataText}>Sin registro de historia clínica</Text>
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