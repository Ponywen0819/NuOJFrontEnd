"use Client";

import Swal from "sweetalert2";

export function success_swal(title) {
  return Swal.fire({
    icon: "success",
    title: title,
    timer: 1500,
    showConfirmButton: false,
  });
}

export function error_swal(title, text) {
  Swal.fire({
    icon: "error",
    title: title,
    text: text,
    timer: 1500,
    showConfirmButton: false,
  });
}

export const show_mail_confirm_swal = (handle) => {
  Swal.fire({
    icon: "warning",
    title: "信箱驗證",
    text: "驗證信應已寄至您的信箱，請確認並驗證郵件！",
    showDenyButton: true,
    confirmButtonText: "OK",
    denyButtonText: "沒有收到信，重寄一封",
  }).then((result) => {
    if (result.isDenied) {
      run_resend_email(handle);
    }
  });
};
