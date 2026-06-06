import { pdf } from "@react-pdf/renderer";
import { Toast, getToken } from "@utils";
import { getClinicLogo } from "@utils/svgToBase64Png";
import { supabase } from "@store";
import { MonitoringPDF } from "./MonitoringPDF";
import type { ClinicalReportData, ClinicInfo } from "@types";

export async function exportMonitoringPDF(
  patientId: string,
  patientName: string,
  patientCi: string,
): Promise<void> {
  try {
    const token = getToken();
    
    const res = await fetch(`/api/report/clinical-data/${patientId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      const errorMsg = res.status === 404 ? "Datos del paciente no encontrados"
        : res.status === 401 || res.status === 403 ? "Sesión expirada o sin permisos"
        : "Error al generar el informe";
      Toast.error(errorMsg);
      return;
    }

    const responseText = await res.text();
    let data: ClinicalReportData;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error("Failed to parse response. Status:", res.status, "Response:", responseText.substring(0, 300));
      Toast.error("Error: respuesta inválida del servidor");
      return;
    }

    if (!data || !("patient" in data)) {
      console.error("Invalid API response structure:", data);
      Toast.error("Error: estructura de datos inválida");
      return;
    }

    // Fetch clinic data from /api/Clinic
    let clinicInfo: ClinicInfo | undefined;
    try {
      const clinicRes = await fetch("/api/Clinic", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (clinicRes.ok) {
        clinicInfo = await clinicRes.json();
      }
    } catch (clinicError) {
      console.warn("Clinic fetch failed:", clinicError);
    }

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
      <MonitoringPDF
        patient={data.patient}
        monitoring={data.monitoring}
        generatedAt={data.generatedAt}
        logo={logoBase64}
        clinic={clinicInfo}
      />,
    ).toBlob();

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${patientName}-${patientCi}-seguimientos.pdf`;
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