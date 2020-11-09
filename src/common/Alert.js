import Swal from 'sweetalert2';
import i18n from "../translations/i18n";

export  function Alert(title) {
    const t = i18n.t.bind(i18n);
    return (
        Swal.fire({
            position: 'top-end',
            icon: title,
            title: t(`common:${title}`),
            showConfirmButton: false,
            timer: 500,
            width : "25rem",
        })
    )
}

export function Comfirm(title){
    const t = i18n.t.bind(i18n);
    return Swal.fire({
        title: title,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: t('common:confirm'),
        cancelButtonText: t('common:cancelConf'),
      });
}