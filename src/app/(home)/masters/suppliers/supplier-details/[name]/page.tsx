import { BackButton, SupplierView } from "@/components";


const SupplierDetailsPage = () => {

  //TODO: INCLUIR QUE CUANDO TRAIGA LOS DATOS DE LA BBDD, INMEDIAMENTE RELACIONE EL USUARIO QUE CREÓ EL PROVEEDOR
  return (
    <>
      <div className={`flex justify-end gap-5 mb-5`}>
        <BackButton />
      </div>
      <SupplierView />
    </>
  );
};
export default SupplierDetailsPage