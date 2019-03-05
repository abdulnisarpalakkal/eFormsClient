export interface ModalInterface {
    openModal(content,item,mode);
    closeModal();
    getDismissReason(reason:any):String;


}
