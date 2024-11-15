import { BackButton, CustomerView } from "@/components";


const CustomerPage = () => {
  //TODO: INCLUIR QUE CUANDO TRAIGA LOS DATOS DE LA BBDD, INMEDIAMENTE RELACIONE EL USUARIO QUE CREÓ EL PROVEEDOR
  //TODO: INCLUIR LOS PEDIDOS DEL CLIENTE EN LA VISTA
  return (
    <>
      <div className={`flex justify-end gap-5 mb-5`}>
        <BackButton />
      </div>
      <CustomerView />
    </>
  );
};
export default CustomerPage;

 