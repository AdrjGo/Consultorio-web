import { View, Text, Image, StyleSheet } from "@react-pdf/renderer";

const B = 0.75;
const C = "#000000";

const s = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  headerLeft: { flexDirection: "row", alignItems: "center" },
  logo: { width: 42, height: 42 },
  headerRight: { alignItems: "flex-end" },
  clinicName: { fontFamily: "Helvetica-Bold", fontSize: 9, marginTop: 2 },
  clinicAddress: { fontFamily: "Helvetica", fontSize: 7.5, color: "#555" },
});

type Props = {
  logo?: string;
  clinic: { name: string; address: string; phone: string };
  reportTitle: string;
  reportSubtitle?: string;
};

export function ReportHeader({ logo, clinic, reportTitle, reportSubtitle }: Props) {
  return (
    <View>
      <View style={s.header}>
        <View style={s.headerLeft}>
          {logo && <Image src={logo} style={s.logo} />}
        </View>
        <View style={s.headerRight}>
          <Text style={s.clinicName}>{clinic.name || "LCV Dental"}</Text>
          <Text style={s.clinicAddress}>
            {[clinic.address, clinic.phone].filter(Boolean).join(" — ")}
          </Text>
        </View>
      </View>

      <View style={{ borderTopWidth: B, borderTopColor: C, marginBottom: 4 }} />

      <Text
        style={{
          fontFamily: "Helvetica-Bold",
          fontSize: 12,
          textAlign: "center",
          textTransform: "uppercase",
          marginBottom: 2,
        }}
      >
        {reportTitle}
      </Text>

      {reportSubtitle && (
        <Text
          style={{
            fontFamily: "Helvetica-Bold",
            fontSize: 10,
            textAlign: "center",
            textTransform: "uppercase",
            marginBottom: 6,
          }}
        >
          {reportSubtitle}
        </Text>
      )}
    </View>
  );
}