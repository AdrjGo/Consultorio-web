import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import type { QuotaReportDataDto } from "@types";
import { ReportHeader } from "./ReportHeader";

const B = 0.75;
const C = "#000000";

const s = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
    fontSize: 8.5,
    lineHeight: 1.3,
  },

  /* ── Patient info ── */
  patientSection: { marginBottom: 6 },
  patientLabel: {
    padding: 2.5,
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    backgroundColor: "#e8e8e8",
    borderRightWidth: B,
    borderRightColor: C,
  },
  patientValue: {
    padding: 2.5,
    fontFamily: "Helvetica",
    fontSize: 8,
    borderRightWidth: B,
    borderRightColor: C,
  },
  patientValueLast: {
    padding: 2.5,
    fontFamily: "Helvetica",
    fontSize: 8,
    borderRightWidth: 0,
  },

  /* ── Contract summary ── */
  summaryRow: {
    flexDirection: "row",
    marginBottom: 6,
  },
  summaryItem: {
    flex: 1,
    borderWidth: B,
    borderColor: C,
    padding: 6,
    alignItems: "center",
  },
  summaryLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: 7.5,
    color: "#555",
    marginBottom: 2,
    textTransform: "uppercase",
  },
  summaryValue: {
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
  },
  summaryValueDebt: {
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
    color: "#c00",
  },

  /* ── Table ── */
  table: { borderWidth: B, borderColor: C, marginTop: 4 },
  tableRow: { flexDirection: "row" },
  rowDivider: { borderBottomWidth: B, borderBottomColor: C },

  cellHeader: {
    padding: 3,
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    backgroundColor: "#e8e8e8",
    borderRightWidth: B,
    borderRightColor: C,
  },
  cellHeaderLast: {
    padding: 3,
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    backgroundColor: "#e8e8e8",
    borderRightWidth: 0,
  },
  cell: {
    padding: 3,
    fontFamily: "Helvetica",
    fontSize: 8,
    borderRightWidth: B,
    borderRightColor: C,
  },
  cellLast: {
    padding: 3,
    fontFamily: "Helvetica",
    fontSize: 8,
    borderRightWidth: 0,
  },

  statusCell: {
    padding: 3,
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    borderRightWidth: 0,
  },

  /* ── Footer ── */
  footer: {
    position: "absolute",
    bottom: 20,
    left: 30,
    right: 30,
    borderTopWidth: B,
    borderTopColor: C,
    paddingTop: 4,
    fontFamily: "Helvetica",
    fontSize: 7,
    textAlign: "center",
    color: "#444",
  },
  generatedAt: {
    marginTop: 4,
    fontFamily: "Helvetica",
    fontSize: 7,
    color: "#666",
    textAlign: "right",
  },
});

type Props = {
  data: QuotaReportDataDto;
  logo?: string;
};

export function QuotaReportPDF({ data, logo }: Props) {
  const hasQuotas = data.quotas && data.quotas.length > 0;

  return (
    <Document>
      <Page size="LETTER" style={s.page}>
        {/* ═══════════ HEADER ═══════════ */}
        <ReportHeader
          logo={logo}
          clinic={data.clinic}
          reportTitle="Reporte de Cuotas"
        />

        {/* ═══════════ DATOS DEL PACIENTE ═══════════ */}
        <View style={s.patientSection}>
          <Text
            style={{
              fontFamily: "Helvetica-Bold",
              fontSize: 8.5,
              textTransform: "uppercase",
              marginBottom: 3,
            }}
          >
            Datos del Paciente
          </Text>
          <View style={s.table}>
            <View style={[s.tableRow, s.rowDivider]}>
              <Text style={[s.patientLabel, { width: "15%" }]}>Nombre</Text>
              <Text style={[s.patientValue, { width: "45%" }]}>
                {data.patient.name} {data.patient.lastName}
              </Text>
              <Text style={[s.patientLabel, { width: "15%" }]}>C.I.</Text>
              <Text style={[s.patientValueLast, { width: "25%" }]}>
                {data.patient.ci}
              </Text>
            </View>
            <View style={s.tableRow}>
              <Text style={[s.patientLabel, { width: "15%" }]}>Teléfono</Text>
              <Text style={[s.patientValue, { width: "85%" }]}>
                {data.patient.phone}
              </Text>
            </View>
          </View>
        </View>

        {/* ═══════════ RESUMEN DEL CONTRATO ═══════════ */}
        <Text
          style={{
            fontFamily: "Helvetica-Bold",
            fontSize: 8.5,
            textTransform: "uppercase",
            marginBottom: 3,
          }}
        >
          Resumen del Contrato
        </Text>
        <View style={s.summaryRow}>
          <View style={s.summaryItem}>
            <Text style={s.summaryLabel}>Costo Total</Text>
            <Text style={s.summaryValue}>
              Bs {data.contract.totalCost.toLocaleString()}
            </Text>
          </View>
          <View style={s.summaryItem}>
            <Text style={s.summaryLabel}>Total Pagado</Text>
            <Text style={s.summaryValue}>
              Bs {data.contract.totalPaid.toLocaleString()}
            </Text>
          </View>
          <View style={s.summaryItem}>
            <Text style={s.summaryLabel}>Deuda</Text>
            <Text style={s.summaryValueDebt}>
              Bs {data.contract.debt.toLocaleString()}
            </Text>
          </View>
        </View>

        {/* ═══════════ TABLA DE CUOTAS ═══════════ */}
        <Text
          style={{
            fontFamily: "Helvetica-Bold",
            fontSize: 8.5,
            textTransform: "uppercase",
            marginBottom: 3,
          }}
        >
          Detalle de Cuotas
        </Text>
        <View style={s.table}>
          <View style={[s.tableRow, s.rowDivider]}>
            <Text style={[s.cellHeader, { width: "20%" }]}>Mes</Text>
            <Text
              style={[
                s.cellHeader,
                { width: "15%", textAlign: "right" },
              ]}
            >
              Monto
            </Text>
            <Text style={[s.cellHeader, { width: "15%" }]}>Estado</Text>
            <Text style={[s.cellHeader, { width: "25%" }]}>Fecha Pago</Text>
            <Text style={[s.cellHeaderLast, { width: "25%" }]}>Método</Text>
          </View>

          {hasQuotas ? (
            data.quotas.map((quota, i) => (
              <View key={i} style={[s.tableRow, s.rowDivider]}>
                <Text style={[s.cell, { width: "20%" }]}>
                  {quota.quotaMonth}
                </Text>
                <Text
                  style={[s.cell, { width: "15%", textAlign: "right" }]}
                >
                  {quota.amount.toLocaleString()}
                </Text>
                <View style={[s.cell, { width: "15%" }]}>
                  <Text
                    style={{
                      fontFamily: "Helvetica-Bold",
                      fontSize: 8,
                      color: quota.paid ? "#080" : "#c00",
                    }}
                  >
                    {quota.paid ? "PAGADO" : "PENDIENTE"}
                  </Text>
                </View>
                <Text style={[s.cell, { width: "25%" }]}>
                  {quota.paidDate || "—"}
                </Text>
                <Text style={[s.cellLast, { width: "25%" }]}>
                  {quota.method || "—"}
                </Text>
              </View>
            ))
          ) : (
            <View style={s.tableRow}>
              <Text style={[s.cellLast, { width: "100%" }]}>
                Sin cuotas registradas
              </Text>
            </View>
          )}
        </View>

        {/* ═══════════ FOOTER ═══════════ */}
        <Text style={s.footer}>
          {[data.clinic.name, data.clinic.address, "Cbba - Bolivia"]
            .filter(Boolean)
            .join(", ")}
        </Text>
        <Text style={s.generatedAt}>Generado: {data.generatedAt}</Text>
      </Page>
    </Document>
  );
}
