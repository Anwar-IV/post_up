import Link from "next/link";
import Login from "./Login";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import SignOut from "./SignOut";
import Image from "next/image";

export default async function Nav() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <nav className="flex justify-between py-8">
      <div className="flex flex-col gap-2">
        <Link href={"/"} className="self-center m-0 p-0">
          <div className="flex flex-col self-center cursor-pointer hover:shadow-[0_0_3px_1px_rgba(100,200,255,.8)] transition-shadow ease-in-out duration-500 w-max h-max p-3 shadow-[0_0_3px_1px_rgba(0,0,0,.5)] rounded-md ml-2">
            <Image
              width={30}
              height={30}
              src={"/redarrow.svg"}
              alt="The users profile picture."
              className="self-center"
            />
            <p
              id="logo"
              className="font-bold text-white text-shadow-lg text-lg -translate-y-1"
            >
              POST-UP
            </p>
          </div>
        </Link>
        <h1
          className={`font-bold text-[22px] text-cyan-300 text-shadow-lg font-pacifico`}
        >
          Where Your Thoughts Take Flight!
        </h1>
      </div>
      <ul className="flex items-center gap-6">
        {!session?.user && <Login />}
        {session?.user && <SignOut image={session?.user?.image} />}
      </ul>
    </nav>
  );
}
