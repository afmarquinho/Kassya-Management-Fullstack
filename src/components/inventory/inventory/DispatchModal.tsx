import { Ban } from "lucide-react"

export const DispatchModal = () => {
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-60 z-20 flex justify-center items-center backdrop-blur-[1px]`}
    >
      <div className={`bg-white dark:bg-slate-800 p-10 w-11/12 max-w-[800px]`}>
        {/* <CustomerForm /> */}
        <button
          className={`flex justify-center items-center p-2 text-white gap-1 my-1 bg-gradient-to-b from-red-600 to-red-700 rounded-md`}
        //   onClick={handleCancel}
        >
          <Ban className={`w-5`} />
          Cancelar
        </button>
      </div>
    </div>
  )
}