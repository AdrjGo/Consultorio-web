import { View, Text, StyleSheet } from "@react-pdf/renderer";

const s = StyleSheet.create({
  container: {
    paddingLeft: 4,
  },
  row: {
    flexDirection: "row",
    marginBottom: 1,
  },
  label: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    minWidth: 120,
  },
  value: {
    fontFamily: "Helvetica",
    fontSize: 8,
    flex: 1,
  },
  bulletRow: {
    flexDirection: "row",
    marginBottom: 1,
  },
  bullet: {
    fontFamily: "Helvetica",
    fontSize: 8,
    width: 12,
  },
  bulletText: {
    fontFamily: "Helvetica",
    fontSize: 8,
    flex: 1,
  },
  nestedContainer: {
    marginLeft: 8,
    marginTop: 2,
    marginBottom: 2,
    borderLeftWidth: 1,
    borderLeftColor: "#cccccc",
    paddingLeft: 4,
  },
});

function formatKey(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

function isPrimitive(value: unknown): boolean {
  return (
    value === null ||
    value === undefined ||
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  );
}

function formatValue(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "boolean") return value ? "Sí" : "No";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

function isArrayOfPrimitives(arr: unknown[]): boolean {
  return arr.every((item) => isPrimitive(item));
}

interface FormJsonRendererProps {
  data: Record<string, unknown>;
  depth?: number;
}

export function FormJsonRenderer({ data, depth = 0 }: FormJsonRendererProps) {
  if (!data || Object.keys(data).length === 0) {
    return (
      <View style={s.container}>
        <Text style={s.value}>Sin datos registrados</Text>
      </View>
    );
  }

  return (
    <View style={depth > 0 ? s.nestedContainer : s.container}>
      {Object.entries(data).map(([key, value]) => {
        if (value === null || value === undefined) {
          return null;
        }

        if (isPrimitive(value)) {
          return (
            <View key={key} style={s.row}>
              <Text style={s.label}>{formatKey(key)}:</Text>
              <Text style={s.value}>{formatValue(value)}</Text>
            </View>
          );
        }

        if (Array.isArray(value)) {
          if (value.length === 0) {
            return null;
          }

          if (isArrayOfPrimitives(value)) {
            return (
              <View key={key} style={s.bulletRow}>
                <Text style={s.bullet}>•</Text>
                <View style={{ flex: 1 }}>
                  <Text style={s.label}>{formatKey(key)}:</Text>
                  {value.map((item, idx) => (
                    <View key={idx} style={s.bulletRow}>
                      <Text style={s.bullet}>  -</Text>
                      <Text style={s.bulletText}>{formatValue(item)}</Text>
                    </View>
                  ))}
                </View>
              </View>
            );
          }

          return (
            <View key={key}>
              <View style={s.row}>
                <Text style={s.label}>{formatKey(key)}:</Text>
              </View>
              <View style={s.nestedContainer}>
                {value.map((item, idx) => {
                  if (isPrimitive(item)) {
                    return (
                      <View key={idx} style={s.bulletRow}>
                        <Text style={s.bullet}>•</Text>
                        <Text style={s.bulletText}>{formatValue(item)}</Text>
                      </View>
                    );
                  }
                  if (typeof item === "object") {
                    return (
                      <View key={idx} style={{ marginBottom: 4 }}>
                        <FormJsonRenderer
                          data={item as Record<string, unknown>}
                          depth={depth + 1}
                        />
                      </View>
                    );
                  }
                  return null;
                })}
              </View>
            </View>
          );
        }

        if (typeof value === "object") {
          return (
            <View key={key}>
              <View style={s.row}>
                <Text style={s.label}>{formatKey(key)}:</Text>
              </View>
              <View style={s.nestedContainer}>
                <FormJsonRenderer
                  data={value as Record<string, unknown>}
                  depth={depth + 1}
                />
              </View>
            </View>
          );
        }

        return null;
      })}
    </View>
  );
}