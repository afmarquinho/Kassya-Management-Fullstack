import {
  BackButton,
  GetSuppliersButton,
  NewButton,
  SuppliersTable,
} from "@/components";

const SuppliersPage = () => {
  //TODO: ORDENER LA TABLA POR APELLI CUANDO SE EDITE PARA QUE NO AGREGE EL PROVEEDOR AL FINAL.
  //TODO: AGREGAR LAS COMPAS QUE SE HAN HECHO AL PROVEEDOR EN LA VISTA
  return (
    <>
      <div className={`flex justify-between gap-5`}>
        <div className={`flex gap-2`}>
          <GetSuppliersButton />
          <NewButton name="Nuevo Proveedor" module="suppliers" />
        </div>
        <BackButton />
      </div>
      <SuppliersTable />
    </>
  );
};
export default SuppliersPage;
