import Swal, { SweetAlertIcon } from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export class Alert {
  public static alert(title: string, text: string, icon?: SweetAlertIcon) {
    MySwal.fire({
      title,
      text,
      icon: icon ?? 'question',
    })
  }

  public static async confirm(
    title: string,
    confirmText?: string,
    cancelText?: string,
    icon?: SweetAlertIcon,
  ) {
    const result = await MySwal.fire({
      title,
      icon: icon ?? 'warning',
      showCancelButton: true,
      confirmButtonText: confirmText ?? 'Xác nhận',
      cancelButtonText: cancelText ?? 'Hủy',
    })
    return result.isConfirmed
  }

  public static async inputText(title: string, inputPlaceholder?: string) {
    const result = await MySwal.fire({
      title,
      input: 'text',
      inputPlaceholder: inputPlaceholder ?? 'Nhập',
    })
    return result.value
  }

  public static async inputFile(title: string) {
    const result = await MySwal.fire({
      title,
      input: 'file',
    })
    return result.value.file
  }
}
