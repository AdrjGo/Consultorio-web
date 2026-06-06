import { pdf } from "@react-pdf/renderer";
import { Toast, getToken } from "@utils";
import { getClinicLogo } from "@utils/svgToBase64Png";
import { supabase } from "@store";
import { ClinicalReportPDF } from "@components/pdf/ClinicalReportPDF";
import type { ClinicalReportData } from "@types";

export async function exportClinicalPDF(
  patientId: string,
  patientName: string,
  patientCi: string,
): Promise<void> {
  try {
    const token = getToken();
    const res = await fetch(`/api/report/clinical-data/${patientId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 404) {
      Toast.error("Datos del paciente no encontrados");
      return;
    }
    if (res.status === 401 || res.status === 403) {
      Toast.error("Sesión expirada o sin permisos");
      return;
    }
    if (res.status === 500) {
      Toast.error("Error del servidor al generar el informe");
      return;
    }
    if (!res.ok) {
      Toast.error("Error al generar el PDF");
      return;
    }

    // Read response as text first to handle error cases
    const responseText = await res.text();

    // Try to parse as JSON
    let data: ClinicalReportData;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error("Failed to parse response. Status:", res.status, "Response:", responseText.substring(0, 300));
      Toast.error("Error: respuesta inválida del servidor");
      return;
    }

    // Validate that we got valid clinical data
    if (!data || !("patient" in data)) {
      console.error("Invalid API response structure:", data);
      Toast.error("Error: estructura de datos inválida");
      return;
    }

    // Try to get logo, but continue without it if it fails
    let logoBase64: string | undefined;
    try {
      const { data: logoData } = supabase.storage
        .from("logo")
        .getPublicUrl("logo_consultorio");
      logoBase64 = await getClinicLogo(logoData?.publicUrl);
    } catch (logoError) {
      console.warn("Logo fetch failed, continuing without logo:", logoError);
    }

    const blob = await pdf(
      <ClinicalReportPDF data={data} logo={logoBase64} />,
    ).toBlob();

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${patientName}-${patientCi}-informe-clinico.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    Toast.success("PDF descargado correctamente");
  } catch (error) {
    console.error("PDF export error:", error);
    Toast.error(`Error al generar el PDF: ${error instanceof Error ? error.message : "Error desconocido"}`);
  }
}