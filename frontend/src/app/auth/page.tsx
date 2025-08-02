import AuthSwitcher from "@/app/auth/components/login";

export default function Auth() {
  
  return (
    <div className="font-sans items-center justify-items-center gap-16 sm:p-20">
      {/*
      TODO: add signin and signup form
      both form should be in the same container
      add a toggle buttons to allow the user
      to change the form

      By default it should display signin form

      any error from backend must be catched and showed to user

      */}

      <AuthSwitcher />
    </div>
  );
}
