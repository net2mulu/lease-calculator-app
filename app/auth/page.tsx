"use client";
import SignIn from "@/components/Auth/SignIn";
import SignUp from "@/components/Auth/SignUp";
import Image from "next/image";
import { AnimatePresence, motion, VariantLabels } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

export default function Auth() {
  const [showSignIn, setShowSignIn] = useState(true);

  const toggleAuth = () => {
    setShowSignIn((prevState) => !prevState);
  };

  const animationVariants = {
    initial: (direction: VariantLabels) => ({
      x: direction === "left" ? -100 : 100,
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    exit: (direction: VariantLabels) => ({
      x: direction === "left" ? 100 : -100,
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    }),
  };

  return (
    <>
      <div className="min-h-screen flex">
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div className="flex flex-col gap-6">
              <Link
                href="/"
                className="mb-8 text-purple-400 font-bold hover:underline"
              >
                {`${"<- Back to Home"}`}
              </Link>{" "}
              <div>
                <Image
                  className="h-12 w-auto"
                  src="/images/logo.png"
                  alt="logo"
                  width={48}
                  height={48}
                />
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                  {showSignIn ? "Sign in to your account" : "Sign up here"}
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  {showSignIn ? (
                    <>
                      Or{" "}
                      <a
                        href="#"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                        onClick={toggleAuth}
                      >
                        Sign up here
                      </a>
                    </>
                  ) : (
                    <>
                      Or{" "}
                      <a
                        href="#"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                        onClick={toggleAuth}
                      >
                        Sign in to your account
                      </a>
                    </>
                  )}
                </p>
              </div>
            </div>

            <AnimatePresence mode="wait" custom={showSignIn ? "left" : "right"}>
              {showSignIn ? (
                <motion.div
                  key="signin"
                  variants={animationVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  custom={showSignIn ? "left" : "right"}
                >
                  <SignIn setShowSignIn={setShowSignIn} />
                </motion.div>
              ) : (
                <motion.div
                  key="signup"
                  variants={animationVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  custom={showSignIn ? "left" : "right"}
                >
                  <SignUp setShowSignIn={setShowSignIn} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="hidden lg:block relative w-0 flex-1">
          <Image
            className="absolute inset-0 h-full w-full object-cover"
            src="/images/bcd.jpg"
            alt=""
            layout="fill"
          />
        </div>
      </div>
    </>
  );
}
