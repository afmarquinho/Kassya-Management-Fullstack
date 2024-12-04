import { BackButton, CustomersTable, GetCustomersButton, NewButton } from "@/components";


const CustomersPage = () => {
  return (
    <>
      <div className={`flex justify-between gap-5`}>
        <div className={`flex gap-2`}>
          <GetCustomersButton />
          <NewButton name="Nuevo Cliente" module="customers" />
        </div>
        <BackButton />
      </div>
      <CustomersTable /> 
    </>
  );
};
export default CustomersPage;
