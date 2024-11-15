import { BackButton, UserView } from "@/components";

export default function UserDetailsPage() {
  return (
    <>
      <div className={`flex justify-end gap-5 mb-5`}>
        <BackButton />
      </div>
      <UserView />
    </>
  );
}
