import Image from "next/image";
import { Inter } from "next/font/google";
import { signIn, signOut, useSession } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data, status } = useSession();
  console.log("session status :", status, "\tsession data : ", data);
  let message = "";
  switch (status) {
    case "loading":
      message = "Please Wait !!";
      break;
    case "authenticated":
      message = "Log Out";
      break;
    case "unauthenticated":
      message = "Log In";
      break;
    default:
      message = "Not Cool 😥";
  }
  let ui = status=="authenticated"? (
    <>
      <img
        src={data?.user?.image || ""}
        alt="Failed to lod image"
        className="rounded rounded-full"
      ></img>
      <div className="text-3xl text-bold mt-5 mb-12">Hello {data?.user?.name}</div>
    </>
  ):"";
  return (
    <main className={`min-h-screen`}>
      <div className="flex flex-col justify-center items-center text-stone-300 h-screen">
        <div className="flex-grow flex justify-center items-center flex-col">
          {ui}
          <button
          className="border border-stone-300 border-4 py-2 px-6 rounded rounded-full"
            onClick={() => {
              if (status == "unauthenticated") signIn("google");
              else signOut();
            }}
          >
            {message}
          </button>
        </div>
        <div></div>
      </div>
    </main>
  );
}
