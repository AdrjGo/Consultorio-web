import { Document, Page, View, Text, Image, StyleSheet } from "@react-pdf/renderer";
import type { ClinicalReportData } from "@types";
import { FormJsonRenderer } from "./clinical/FormJsonRenderer";

const B = 0.75;
const C = "#000000";

const s = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
    fontSize: 8.5,
    lineHeight: 1.3,
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
  subtitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    textAlign: "center",
    textTransform: "uppercase",
    marginBottom: 6,
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
  patientLabel: { padding: 2.5, fontFamily: "Helvetica-Bold", fontSize: 8, backgroundColor: "#f0f0f0", borderRightWidth: B, borderRightColor: C },
  patientValue: { padding: 2.5, fontFamily: "Helvetica", fontSize: 8, borderRightWidth: B, borderRightColor: C },
  patientValueLast: { padding: 2.5, fontFamily: "Helvetica", fontSize: 8, borderRightWidth: 0 },
  examBox: { borderWidth: B, borderColor: C, marginBottom: 4 },
  examRow: { flexDirection: "row", borderBottomWidth: B, borderBottomColor: C },
  examLabel: { padding: 2.5, fontFamily: "Helvetica-Bold", fontSize: 8, backgroundColor: "#f0f0f0", borderRightWidth: B, borderRightColor: C, width: "25%" },
  examValue: { padding: 2.5, fontFamily: "Helvetica", fontSize: 8, flex: 1 },
  noDataText: { fontFamily: "Helvetica-Oblique", fontSize: 8, color: "#666", paddingVertical: 4 },
  footer: {
    borderTopWidth: B,
    borderTopColor: C,
    paddingTop: 4,
    fontFamily: "Helvetica",
    fontSize: 7,
    textAlign: "center",
    color: "#444",
    position: "absolute",
    bottom: 20,
    left: 30,
    right: 30,
  },
});

type Props = {
  data: ClinicalReportData;
  logo?: string;
};

export function ClinicalReportPDF({ data, logo }: Props) {
  const formatDate = (dateStr: string) => {
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
              <Text style={s.doctorNameHeader}>DRA. LIPCIA CATACORA VARGAS</Text>
            </View>
          </View>

          <Text style={s.title}>Informe Clínico</Text>

          <View style={s.fechaRow}>
            <Text style={s.fechaLabel}>Fecha de generación</Text>
            <Text style={s.fechaValue}>{formatDate(data.generatedAt)}</Text>
          </View>

          <Text style={s.sectionTitle}>Datos del Paciente</Text>
          <View style={s.table}>
            <View style={[s.tableRow, s.rowDivider]}>
              <Text style={[s.patientLabel, { width: "15%" }]}>Nombre</Text>
              <Text style={[s.patientValue, { width: "35%" }]}>
                {data.patient.name} {data.patient.lastName}
              </Text>
              <Text style={[s.patientLabel, { width: "10%" }]}>CI</Text>
              <Text style={[s.patientValueLast, { width: "40%" }]}>
                {data.patient.ci}
              </Text>
            </View>
            <View style={[s.tableRow, s.rowDivider]}>
              <Text style={[s.patientLabel, { width: "15%" }]}>Fecha Nac.</Text>
              <Text style={[s.patientValue, { width: "25%" }]}>
                {formatDate(data.patient.birthDate)}
              </Text>
              <Text style={[s.patientLabel, { width: "10%" }]}>Teléfono</Text>
              <Text style={[s.patientValue, { width: "50%" }]}>
                {data.patient.phone}
              </Text>
            </View>
            <View style={s.tableRow}>
              <Text style={[s.patientLabel, { width: "15%" }]}>Email</Text>
              <Text style={[s.patientValueLast, { width: "85%" }]}>
                {data.patient.email}
              </Text>
            </View>
          </View>

          <Text style={s.sectionTitle}>Antecedentes de Salud General</Text>
          {data.generalHistory && Object.keys(data.generalHistory).length > 0 ? (
            <FormJsonRenderer data={data.generalHistory} />
          ) : (
            <Text style={s.noDataText}>Sin registro de antecedentes generales</Text>
          )}

          <Text style={s.sectionTitle}>Exámenes Pretratamiento</Text>
          {data.pretreatmentExams && data.pretreatmentExams.length > 0 ? (
            data.pretreatmentExams.map((exam, index) => (
              <View key={exam.id || index} style={s.examBox}>
                <View style={s.examRow}>
                  <Text style={s.examLabel}>Pieza</Text>
                  <Text style={s.examValue}>{exam.piece || "N/A"}</Text>
                </View>
                <View style={s.examRow}>
                  <Text style={s.examLabel}>Caries</Text>
                  <Text style={s.examValue}>{exam.caries ? "Sí" : "No"}</Text>
                </View>
                {exam.treatment && (
                  <View style={s.examRow}>
                    <Text style={s.examLabel}>Tratamiento</Text>
                    <Text style={s.examValue}>{exam.treatment}</Text>
                  </View>
                )}
                <View style={s.examRow}>
                  <Text style={s.examLabel}>Interconsultación</Text>
                  <Text style={s.examValue}>{exam.interconsultation || "Ninguna"}</Text>
                </View>
                <View style={s.examRow}>
                  <Text style={s.examLabel}>Observaciones</Text>
                  <Text style={s.examValue}>{exam.observations || "Sin observaciones"}</Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={s.noDataText}>Sin registros de exámenes pretratamiento</Text>
          )}

          <Text style={s.sectionTitle}>Resumen de Tratamiento</Text>
          {data.treatmentSummary && Object.keys(data.treatmentSummary).length > 0 ? (
            <FormJsonRenderer data={data.treatmentSummary} />
          ) : (
            <Text style={s.noDataText}>Sin registro de resumen de tratamiento</Text>
          )}

          <Text style={s.sectionTitle}>Historia Clínica de Ortodoncia</Text>
          {data.clinicHistory && Object.keys(data.clinicHistory).length > 0 ? (
            <FormJsonRenderer data={data.clinicHistory} />
          ) : (
            <Text style={s.noDataText}>Sin registro de historia clínica</Text>
          )}

          <Text style={s.sectionTitle}>Seguimientos Registrados</Text>
          {data.monitoring && data.monitoring.length > 0 ? (
            <View style={s.table}>
              <View style={[s.tableRow, s.rowDivider]}>
                <Text style={[s.cellHeader, { width: "15%" }]}>Fecha</Text>
                <Text style={[s.cellHeader, { width: "25%" }]}>Nomenclatura</Text>
                <Text style={[s.cellHeader, { width: "25%" }]}>Tratamiento</Text>
                <Text style={[s.cellHeaderLast, { width: "35%" }]}>Observaciones</Text>
              </View>
              {data.monitoring.map((record, index) => (
                <View key={record.id || index} style={[s.tableRow, s.rowDivider]}>
                  <Text style={[s.cell, { width: "15%" }]}>{formatDate(record.date)}</Text>
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
