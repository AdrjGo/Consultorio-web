import { Document, Page, View, Text, Image, StyleSheet } from "@react-pdf/renderer";
import type { PatientInfo, MonitoringRecordData, ClinicInfo } from "@types";

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
  sectionTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8.5,
    textTransform: "uppercase",
    marginTop: 5,
    marginBottom: 3,
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
  table: { borderWidth: B, borderColor: C },
  tableRow: { flexDirection: "row" },
  rowDivider: { borderBottomWidth: B, borderBottomColor: C },
  cell: { padding: 2.5, fontFamily: "Helvetica", fontSize: 8, borderRightWidth: B, borderRightColor: C },
  cellLast: { padding: 2.5, fontFamily: "Helvetica", fontSize: 8, borderRightWidth: 0 },
  cellHeader: { padding: 2.5, fontFamily: "Helvetica-Bold", fontSize: 8, backgroundColor: "#e8e8e8", borderRightWidth: B, borderRightColor: C },
  cellHeaderLast: { padding: 2.5, fontFamily: "Helvetica-Bold", fontSize: 8, backgroundColor: "#e8e8e8", borderRightWidth: 0 },
  patientLabel: { padding: 2.5, fontFamily: "Helvetica-Bold", fontSize: 8, backgroundColor: "#f0f0f0", borderRightWidth: B, borderRightColor: C, width: "15%" },
  patientValue: { padding: 2.5, fontFamily: "Helvetica", fontSize: 8, borderRightWidth: B, borderRightColor: C, width: "35%" },
  patientValueLast: { padding: 2.5, fontFamily: "Helvetica", fontSize: 8, borderRightWidth: 0, width: "50%" },
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
});

type Props = {
  patient: PatientInfo;
  monitoring: MonitoringRecordData[];
  generatedAt: string;
  logo?: string;
  clinic?: ClinicInfo;
};

export function MonitoringPDF({ patient, monitoring, generatedAt, logo, clinic }: Props) {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    // If already in dd-MM-yyyy format, return as-is
    if (/^\d{2}-\d{2}-\d{4}$/.test(dateStr)) return dateStr;
    // Otherwise try to parse and format
    try {
      return new Date(dateStr).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <Document>
      <Page size="LETTER" style={s.page}>
        <View>
          <View style={s.header}>
            <View style={s.headerLeft}>
              {logo && <Image src={logo} style={s.logo} />}
            </View>
            <View style={s.headerRight}>
              <Text style={s.formNumber}>FORM N° FT-CLINIC-01</Text>
              <Text style={s.doctorNameHeader}>
                {clinic?.name || "DRA. LIPCIA CATACORA VARGAS"}
              </Text>
            </View>
          </View>

          <Text style={s.title}>Seguimientos Registrados</Text>

          <View style={s.fechaRow}>
            <Text style={s.fechaLabel}>Fecha de generación</Text>
            <Text style={s.fechaValue}>{formatDate(generatedAt)}</Text>
          </View>

          <Text style={s.sectionTitle}>Datos del Paciente</Text>
          <View style={s.table}>
            <View style={[s.tableRow, s.rowDivider]}>
              <Text style={[s.patientLabel, { width: "15%" }]}>Nombre</Text>
              <Text style={[s.patientValue, { width: "35%" }]}>
                {patient.name} {patient.lastName}
              </Text>
              <Text style={[s.patientLabel, { width: "10%" }]}>CI</Text>
              <Text style={[s.patientValueLast, { width: "40%" }]}>
                {patient.ci}
              </Text>
            </View>
            <View style={[s.tableRow, s.rowDivider]}>
              <Text style={[s.patientLabel, { width: "15%" }]}>Fecha Nac.</Text>
              <Text style={[s.patientValue, { width: "25%" }]}>
                {formatDate(patient.birthDate)}
              </Text>
              <Text style={[s.patientLabel, { width: "10%" }]}>Teléfono</Text>
              <Text style={[s.patientValue, { width: "50%" }]}>
                {patient.phone}
              </Text>
            </View>
            <View style={s.tableRow}>
              <Text style={[s.patientLabel, { width: "15%" }]}>Email</Text>
              <Text style={[s.patientValueLast, { width: "85%" }]}>
                {patient.email}
              </Text>
            </View>
          </View>

          <Text style={s.sectionTitle}>Seguimientos Registrados</Text>
          {monitoring && monitoring.length > 0 ? (
            <View style={s.table}>
              <View style={[s.tableRow, s.rowDivider]}>
                <Text style={[s.cellHeader, { width: "15%" }]}>Fecha</Text>
                <Text style={[s.cellHeader, { width: "25%" }]}>Nomenclatura</Text>
                <Text style={[s.cellHeader, { width: "25%" }]}>Tratamiento</Text>
                <Text style={[s.cellHeaderLast, { width: "35%" }]}>Observaciones</Text>
              </View>
              {monitoring.map((record, index) => (
                <View key={record.id || index} style={[s.tableRow, s.rowDivider]}>
                  <Text style={[s.cell, { width: "15%" }]}>{formatDate(record?.date)}</Text>
                  <Text style={[s.cell, { width: "25%" }]}>{record.nomenclature}</Text>
                  <Text style={[s.cell, { width: "25%" }]}>{record.treatment}</Text>
                  <Text style={[s.cellLast, { width: "35%" }]}>{record.observations}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={s.noDataText}>Sin seguimientos registrados</Text>
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
