
import { GetUsersButton, NewButton, UsersTable } from "@/components";

//TODO: LO SIGUIENTE ES COLOCAR EL MODAL CON EL FORMULARIO PARA CREAR O EDITAR UN NUEVO USUARIO, 1. CREAR EL COMPONENTE Y UBICARLO EN EL FONDO DE ESTA PAGINA. 2.COLOCAR EL FONDO OPACO, NEGRO PERO CON EFECTO BLUR


const UserPage = () => {
  return (
    <>
      <div className={`flex gap-5`}>
        <GetUsersButton />
        <NewButton name="Nuevo Usuario" module="users"/>
      </div>
      <UsersTable />
    </>
  );
};
export default UserPage;
