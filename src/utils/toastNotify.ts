import { toast } from "react-toastify";

export const Toast = {
  success: (message: string | undefined) => toast.success(message),
  error: (message: string) => toast.error(message),
  warning: (message: string) => toast.warning(message),
  info: (message: string) => toast.info(message),
};
