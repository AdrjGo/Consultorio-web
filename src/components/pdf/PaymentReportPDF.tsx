import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import type { PaymentReportDataDto } from "@types";
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

  /* ── Date range ── */
  dateRangeRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 6,
  },
  dateRangeLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8.5,
    marginRight: 4,
  },
  dateRangeValue: {
    fontFamily: "Helvetica",
    fontSize: 8.5,
    borderBottomWidth: B,
    borderBottomColor: C,
    width: 90,
    textAlign: "center",
  },

  /* ── Table ── */
  table: { borderWidth: B, borderColor: C },
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

  /* ── Totals ── */
  totalRow: {
    flexDirection: "row",
    marginTop: 4,
    justifyContent: "flex-end",
  },
  totalLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    marginRight: 8,
  },
  totalValue: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
  },

  /* ── Empty state ── */
  emptyMessage: {
    fontFamily: "Helvetica",
    fontSize: 9,
    textAlign: "center",
    padding: 20,
    color: "#666",
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
  data: PaymentReportDataDto;
  logo?: string;
};

export function PaymentReportPDF({ data, logo }: Props) {
  const hasPayments = data.payments && data.payments.length > 0;

  return (
    <Document>
      <Page size="LETTER" style={s.page}>
        {/* ═══════════ HEADER ═══════════ */}
        <ReportHeader
          logo={logo}
          clinic={data.clinic}
          reportTitle="Reporte de Pagos"
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

        {/* ═══════════ RANGO DE FECHAS ═══════════ */}
        {(data.startDate || data.endDate) && (
          <View style={s.dateRangeRow}>
            <Text style={s.dateRangeLabel}>
              {data.startDate && data.endDate
                ? `Del ${data.startDate} al ${data.endDate}`
                : data.startDate
                  ? `Desde ${data.startDate}`
                  : `Hasta ${data.endDate}`}
            </Text>
          </View>
        )}

        {/* ═══════════ TABLA DE PAGOS ═══════════ */}
        <Text
          style={{
            fontFamily: "Helvetica-Bold",
            fontSize: 8.5,
            textTransform: "uppercase",
            marginBottom: 3,
          }}
        >
          Detalle de Pagos
        </Text>
        <View style={s.table}>
          <View style={[s.tableRow, s.rowDivider]}>
            <Text style={[s.cellHeader, { width: "15%" }]}>Fecha</Text>
            <Text style={[s.cellHeader, { width: "30%" }]}>Descripción</Text>
            <Text style={[s.cellHeader, { width: "15%", textAlign: "right" }]}>
              Monto (Bs)
            </Text>
            <Text style={[s.cellHeader, { width: "15%" }]}>Método</Text>
            <Text style={[s.cellHeaderLast, { width: "25%" }]}>
              Recibido por
            </Text>
          </View>

          {hasPayments ? (
            data.payments.map((payment, i) => (
              <View key={i} style={[s.tableRow, s.rowDivider]}>
                <Text style={[s.cell, { width: "15%" }]}>{payment.date}</Text>
                <Text style={[s.cell, { width: "30%" }]}>
                  {payment.description}
                </Text>
                <Text
                  style={[s.cell, { width: "15%", textAlign: "right" }]}
                >
                  {payment.amount.toLocaleString()}
                </Text>
                <Text style={[s.cell, { width: "15%" }]}>{payment.method}</Text>
                <Text style={[s.cellLast, { width: "25%" }]}>
                  {payment.receivedBy}
                </Text>
              </View>
            ))
          ) : (
            <View style={s.tableRow}>
              <Text style={[s.cellLast, { width: "100%" }]}>
                Sin pagos registrados
              </Text>
            </View>
          )}
        </View>

        {/* ═══════════ TOTAL ═══════════ */}
        {hasPayments && (
          <View style={s.totalRow}>
            <Text style={s.totalLabel}>Total pagado:</Text>
            <Text style={s.totalValue}>
              Bs{" "}
              {data.payments
                .reduce((sum, p) => sum + p.amount, 0)
                .toLocaleString()}
            </Text>
          </View>
        )}

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
