import { pdf } from "@react-pdf/renderer";
import { Toast, getToken } from "@utils";
import { getClinicLogo } from "@utils/svgToBase64Png";
import { supabase } from "@store";
import { PaymentReportPDF } from "@components/pdf/PaymentReportPDF";
import { QuotaReportPDF } from "@components/pdf/QuotaReportPDF";
import { AccountStatementPDF } from "@components/pdf/AccountStatementPDF";
import type {
  PaymentReportDataDto,
  QuotaReportDataDto,
  AccountStatementDataDto,
} from "@types";

/**
 * Fetches logo from Supabase storage and converts to base64.
 * Silently continues without logo if fetch fails.
 */
async function fetchLogo(): Promise<string | undefined> {
  try {
    const { data: logoData } = supabase.storage
      .from("logo")
      .getPublicUrl("logo_consultorio");
    return await getClinicLogo(logoData?.publicUrl);
  } catch {
    console.warn("Logo fetch failed, continuing without logo");
    return undefined;
  }
}

/**
 * Generic fetch wrapper that handles auth and error statuses.
 */
async function fetchJson<T>(url: string, token: string): Promise<T> {
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.status === 401 || res.status === 403) {
    throw new Error("Sesión expirada o sin permisos");
  }
  if (res.status === 404) {
    throw new Error("Datos no encontrados");
  }
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Error del servidor: ${text.substring(0, 100)}`);
  }

  return res.json() as Promise<T>;
}

// ══════════════════════════════════════════════════════════════
// EXPORT PAYMENT REPORT
// ══════════════════════════════════════════════════════════════

export async function exportPaymentReport(
  patientId: string,
  patientName: string,
  patientCi: string,
  startDate?: string,
  endDate?: string,
): Promise<void> {
  try {
    const token = getToken();

    const params = new URLSearchParams();
    if (startDate) params.set("startDate", startDate);
    if (endDate) params.set("endDate", endDate);
    const query = params.toString() ? `?${params.toString()}` : "";

    const data = await fetchJson<PaymentReportDataDto>(
      `/api/report/payment-data/${patientId}${query}`,
      token,
    );

    const logo = await fetchLogo();
    const blob = await pdf(
      <PaymentReportPDF data={data} logo={logo} />,
    ).toBlob();

    const dateRange =
      startDate && endDate ? `_${startDate}_a_${endDate}` : "";
    const filename = `${patientName}-${patientCi}_reporte-pagos${dateRange}.pdf`;

    downloadBlob(blob, filename);
    Toast.success("Reporte de pagos descargado");
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Error desconocido";
    Toast.error(`Error al exportar: ${msg}`);
  }
}

// ══════════════════════════════════════════════════════════════
// EXPORT QUOTA REPORT
// ══════════════════════════════════════════════════════════════

export async function exportQuotaReport(
  contractId: string,
  patientName: string,
  patientCi: string,
): Promise<void> {
  try {
    const token = getToken();

    const data = await fetchJson<QuotaReportDataDto>(
      `/api/report/quota-data/${contractId}`,
      token,
    );

    const logo = await fetchLogo();
    const blob = await pdf(<QuotaReportPDF data={data} logo={logo} />).toBlob();

    const filename = `${patientName}-${patientCi}_reporte-cuotas.pdf`;

    downloadBlob(blob, filename);
    Toast.success("Reporte de cuotas descargado");
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Error desconocido";
    Toast.error(`Error al exportar: ${msg}`);
  }
}

// ══════════════════════════════════════════════════════════════
// EXPORT ACCOUNT STATEMENT
// ══════════════════════════════════════════════════════════════

export async function exportAccountStatement(
  patientId: string,
  patientName: string,
  patientCi: string,
): Promise<void> {
  try {
    const token = getToken();

    const data = await fetchJson<AccountStatementDataDto>(
      `/api/report/account-statement/${patientId}`,
      token,
    );

    const logo = await fetchLogo();
    const blob = await pdf(
      <AccountStatementPDF data={data} logo={logo} />,
    ).toBlob();

    const filename = `${patientName}-${patientCi}_estado-cuenta.pdf`;

    downloadBlob(blob, filename);
    Toast.success("Estado de cuenta descargado");
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Error desconocido";
    Toast.error(`Error al exportar: ${msg}`);
  }
}

// ══════════════════════════════════════════════════════════════
// HELPERS
// ══════════════════════════════════════════════════════════════

function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}