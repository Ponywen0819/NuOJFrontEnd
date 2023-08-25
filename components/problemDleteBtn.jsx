import { DeleteIcon, IconButton } from "@/components/chakra";
import Swal from "sweetalert2";
import { HOST } from "@/setting";
import { success_swal, error_swal } from "@/components/notification";

const ConfirmDlete = async (id) => {
  return await Swal.fire({
    title: "是否刪除",
    text: `即將刪除題目 ${id}`,
    showCancelButton: true,
    confirmButtonText: "確認",
    cancelButtonText: "取消",
    confirmButtonColor: "rgb(249 115 22)",
    cancelButtonColor: "rgb(156 163 175)",
  });
};

const IndicateWaiting = () => {
  Swal.fire({
    title: "處理中",
    didOpen: () => Swal.showLoading(),
    showConfirmButton: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
  });
};

const deleteProblem = async (id, OnDelete) => {
  IndicateWaiting();
  const res = await fetch(`${HOST}/api/problem/${id}`, { method: "DELETE" });

  if (!res.ok) {
    error_swal("出現預期外的錯誤");
    return;
  }
  success_swal("刪除成功");
  OnDelete();
};

export const DeleteButton = ({ id, OnDelete }) => {
  const showDialog = () => {
    ConfirmDlete(id).then(({ isConfirmed }) => {
      if (isConfirmed) {
        deleteProblem(id, OnDelete);
      }
    });
  };

  return (
    <IconButton
      color={"blackAlpha.900"}
      backgroundColor={"whiteAlpha.900"}
      icon={<DeleteIcon />}
      onClick={showDialog}
    />
  );
};
