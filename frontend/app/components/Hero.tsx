"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-white pt-32 pb-16 px-4">
      <div className="max-w-screen-xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl"
        >
          Turn govt jobs into a <span className="text-blue-600">clear, trackable plan</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48"
        >
          CareerNebula replaces chaos with clarity. Browse curated government jobs, track your applications, and never miss a deadline.
        </motion.p>
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.4 }}
           className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4"
        >
            <Link href="/jobs" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300">
                Browse Jobs
                <ArrowRight className="ml-2 -mr-1 w-5 h-5" />
            </Link>
            <Link href="/my-track" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100">
                <CheckCircle className="mr-2 -ml-1 w-5 h-5 text-gray-500" />
                Start Tracking
            </Link>
        </motion.div>
      </div>
    </section>
  );
}
