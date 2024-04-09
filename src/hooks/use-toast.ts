import Swal from 'sweetalert2';

export const useToast = () => {
  const toast: typeof Swal = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000,
    customClass: { container: 'toast' },
});
  return toast;
};
