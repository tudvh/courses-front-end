import Swal, { SweetAlertIcon } from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export class Toast {
  public static success(title: string) {
    this.toast('success', title)
  }

  public static error(title: string) {
    this.toast('error', title)
  }

  public static info(title: string) {
    this.toast('info', title)
  }

  public static warning(title: string) {
    this.toast('warning', title)
  }

  private static toast(icon: SweetAlertIcon, title: string) {
    MySwal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: toast => {
        toast.onmouseenter = MySwal.stopTimer
        toast.onmouseleave = MySwal.resumeTimer
      },
    }).fire({ icon, title })
  }
}
