"use client";

import { useState } from "react";
import Image from "next/image";
import { Special_Elite } from "next/font/google";

const special = Special_Elite({
    weight: "400",
    subsets: ["latin"],
});

export default function NotFound() {
    const [showJumpscare, setShowJumpscare] = useState(false);
    const [showNote, setShowNote] = useState(false);

    const secretNote = process.env.NEXT_PUBLIC_SECRET_NOTE || ""

    if (showNote) {
        return (
            <div className="min-h-dvh w-full flex flex-col items-center justify-center bg-black text-white px-6 py-6">
                <p className="text-base sm:text-lg md:text-xl leading-relaxed whitespace-pre-line">
                    {secretNote}
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-dvh w-full flex flex-col items-center justify-center bg-black text-red-500 text-center px-4 relative">

            {!showJumpscare && (
                <>
                    <h1 className={`${special.className} text-3xl sm:text-5xl md:text-6xl mb-4 tracking-widest text-red-600`}>
                        TRESPASSING
                    </h1>
                    <p className="text-red-400 mb-6 tracking-wider text-sm sm:text-base">
                        UNAUTHORIZED ACCESS DETECTED
                    </p>
                    <button
                        onClick={() => setShowJumpscare(true)}
                        className="bg-red-700 hover:bg-red-900 px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg border border-red-500"
                    >
                        DO NOT PRESS
                    </button>

                    <button
                        onClick={() => setShowNote(true)}
                        className="absolute top-2 left-2 w-4 h-4 opacity-0"
                        aria-label="Secret note"
                    />
                </>
            )}

            {showJumpscare && (
                <div className="fixed inset-0 z-[9999] bg-black">
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
    );
}