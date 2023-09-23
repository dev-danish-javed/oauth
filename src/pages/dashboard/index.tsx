import { signIn, signOut, useSession } from "next-auth/react";

const Dashboard: React.FC = () => {
  const { data, status } = useSession();
  console.log("session status :", status, "\tsession data : ", data);
  let message = "";
  switch (status) {
    case "loading":
      message = "Please Wait !!";
      break;
    case "authenticated":
      message = "Logged Out";
      break;
    case "unauthenticated":
      message = "Logged In";
      break;
    default:
      message = "Not Cool 😥";
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center text-stone-300 h-screen">
        <div className="pt-10 text-center">
          Session status : {status}
        </div>
        <div className="flex-grow flex justify-center items-center flex-col">
		<button onClick={() => {if(status=='unauthenticated')signIn('google'); else signOut();}}>{message}</button>
		</div>
		<div>
      
    </div>
      </div>
    </>
  );
};
export default Dashboard;
