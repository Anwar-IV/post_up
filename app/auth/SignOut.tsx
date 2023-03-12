"use client";

import Image from "next/image";
import { signOut } from "next-auth/react";
import Link from "next/link";

type SignOutProps = {
  image: string | null | undefined;
};

export default function SignOut({ image }: SignOutProps) {
  return (
    <li className="flex gap-8 items-center">
      <button
        className="text-gray-800 text-sm px-6 py-2 rounded-md shadow-[0px_0px_3px_1px_rgba(0,0,0,.5)] hover:shadow-[0_0_4px_1px_rgba(255,100,100,.75)] transition-shadow duration-500 ease-in-out flex gap-2"
        onClick={() => signOut()}
      >
        Sign Out
        <Image width={20} height={20} src={"/logout.svg"} alt="Sign Out logo" />
      </button>
      <Link href={"/dashboard"}>
        {image ? (
          <Image
            width={64}
            height={64}
            src={image}
            alt="The users profile picture."
          />
        ) : (
          <p>Failed to load image.</p>
        )}
      </Link>
    </li>
  );
}
