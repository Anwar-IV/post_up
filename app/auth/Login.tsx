"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <li className="list-none gap-8 flex items-center">
      <button
        className="text-sm text-gray-800 py-2 px-6 rounded-md disabled:opacity-25 shadow-[0_0_3px_1px_rgba(0,0,0,.5)] hover:shadow-[0_0_3px_1px_rgba(100,255,100,.5)] transition-shadow duration-500 ease-in-out flex gap-2 mr-2"
        onClick={() => signIn()}
      >
        Sign In
        <Image width={20} height={20} src={"/signin.svg"} alt="Sign In logo" />
      </button>
    </li>
  );
}
