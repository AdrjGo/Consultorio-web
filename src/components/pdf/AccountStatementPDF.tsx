import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import type { AccountStatementDataDto } from "@types";
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

  /* ── Total debt banner ── */
  totalDebtBanner: {
    backgroundColor: "#f5f5f5",
    borderWidth: B,
    borderColor: C,
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  totalDebtLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    textTransform: "uppercase",
  },
  totalDebtValue: {
    fontFamily: "Helvetica-Bold",
    fontSize: 14,
    color: "#c00",
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
    textAlign: "right",
  },
  cellHeaderLast: {
    padding: 3,
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    backgroundColor: "#e8e8e8",
    borderRightWidth: 0,
    textAlign: "right",
  },
  cell: {
    padding: 3,
    fontFamily: "Helvetica",
    fontSize: 8,
    borderRightWidth: B,
    borderRightColor: C,
    textAlign: "right",
  },
  cellLast: {
    padding: 3,
    fontFamily: "Helvetica",
    fontSize: 8,
    borderRightWidth: 0,
    textAlign: "right",
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
  data: AccountStatementDataDto;
  logo?: string;
};

export function AccountStatementPDF({ data, logo }: Props) {
  const hasContracts =
    data.contracts && data.contracts.length > 0;

  return (
    <Document>
      <Page size="LETTER" style={s.page}>
        {/* ═══════════ HEADER ═══════════ */}
        <ReportHeader
          logo={logo}
          clinic={data.clinic}
          reportTitle="Estado de Cuenta"
          reportSubtitle="Resumen de Deuda por Contrato"
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

        {/* ═══════════ TOTAL DEUDA ═══════════ */}
        <View style={s.totalDebtBanner}>
          <Text style={s.totalDebtLabel}>Deuda Total</Text>
          <Text style={s.totalDebtValue}>
            $us {data.totalDebt.toLocaleString()}
          </Text>
        </View>

        {/* ═══════════ TABLA DE CONTRATOS ═══════════ */}
        <Text
          style={{
            fontFamily: "Helvetica-Bold",
            fontSize: 8.5,
            textTransform: "uppercase",
            marginBottom: 3,
          }}
        >
          Detalle por Contrato
        </Text>
        <View style={s.table}>
          <View style={[s.tableRow, s.rowDivider]}>
            <Text style={[s.cellHeader, { width: "20%", textAlign: "left" }]}>
              #
            </Text>
            <Text style={[s.cellHeader, { width: "20%" }]}>
              Costo Total
            </Text>
            <Text style={[s.cellHeader, { width: "20%" }]}>
              Total Pagado
            </Text>
            <Text style={[s.cellHeader, { width: "20%" }]}>Deuda</Text>
            <Text style={[s.cellHeaderLast, { width: "20%" }]}>
              Saldo Acum.
            </Text>
          </View>

          {hasContracts ? (
            data.contracts.map((contract, i) => (
              <View key={i} style={[s.tableRow, s.rowDivider]}>
                <Text
                  style={[s.cell, { width: "20%", textAlign: "left" }]}
                >
                  {i + 1}
                </Text>
                <Text style={[s.cell, { width: "20%" }]}>
                  {contract.totalCost.toLocaleString()}
                </Text>
                <Text style={[s.cell, { width: "20%" }]}>
                  {contract.totalPaid.toLocaleString()}
                </Text>
                <Text style={[s.cell, { width: "20%" }]}>
                  {contract.debt.toLocaleString()}
                </Text>
                <Text style={[s.cellLast, { width: "20%" }]}>
                  {contract.runningBalance.toLocaleString()}
                </Text>
              </View>
            ))
          ) : (
            <View style={s.tableRow}>
              <Text style={[s.cellLast, { width: "100%" }]}>
                Sin contratos registrados
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