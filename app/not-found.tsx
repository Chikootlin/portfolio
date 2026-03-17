"use client";

import { useState } from "react";
import Image from "next/image";
import { Special_Elite } from "next/font/google";

const special = Special_Elite({
    weight: "400",
    subsets: ["latin"],
});

export default function NotFound() {
    const [show, setShow] = useState(false);

    return (
        <>
            <div className="min-h-dvh w-full flex flex-col items-center justify-center bg-black text-red-500 text-center px-4">
                {!show && (
                    <>
                        <h1 className={`${special.className} text-3xl sm:text-5xl md:text-6xl mb-4 tracking-widest text-red-600`}>
                            TRESPASSING
                        </h1>
                        <p className="text-red-400 mb-6 tracking-wider text-sm sm:text-base">
                            UNAUTHORIZED ACCESS DETECTED
                        </p>
                        <button onClick={() => setShow(true)} className="bg-red-700 hover:bg-red-900 px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg border border-red-500">
                            DO NOT PRESS
                        </button>
                    </>
                )}

                {show && (
                    <div className="fixed inset-0 z-9999 bg-black">
                        <Image
                            src="/images/ambacong.jpeg"
                            alt="jumpscare"
                            fill
                            priority
                            className="lg:object-contain sm:object-cover"
                        />
                    </div>
                )}
            </div>
        </>
    );
}