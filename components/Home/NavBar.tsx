"use client";
import React, { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { FiAlignJustify, FiXSquare } from "react-icons/fi";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navigation = [
  { name: "All Leases", href: "/home" },
  { name: "My Leases", href: "/home/my" },
  { name: "Shared Leases", href: "/home/shared" },
];
const userNavigation = [{ name: "Sign out", href: "#", callBack: signOut }];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

const NavBar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <Disclosure
      as="nav"
      className="bg-purple-700 border-b border-purple-300 border-opacity-25 lg:border-none"
    >
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
            <div className="relative h-16 flex items-center justify-between lg:border-b lg:border-purple-400 lg:border-opacity-25">
              <div className="px-2 flex items-center lg:px-0">
                <div className="flex-shrink-0">
                  <Image
                    className="h-12 w-auto border border-white rounded-full"
                    src="/logo.png"
                    alt="logo"
                    width={48}
                    height={48}
                  />
                </div>
                <div className="hidden lg:block lg:ml-10">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          pathname === item.href
                            ? "bg-purple-400 text-white"
                            : "text-white hover:bg-purple-500 hover:bg-opacity-75",
                          "rounded-md py-2 px-3 text-sm font-medium"
                        )}
                        aria-current="page"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="bg-purple-600 p-2 rounded-md inline-flex items-center justify-center text-purple-200 hover:text-white hover:bg-purple-500 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-600 focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <FiXSquare className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <FiAlignJustify
                      className="block h-6 w-6"
                      aria-hidden="true"
                    />
                  )}
                </Disclosure.Button>
              </div>
              <div className="hidden lg:block lg:ml-4">
                <div className="flex items-center">
                  <Menu as="div" className="ml-3 relative flex-shrink-0">
                    <div>
                      <Menu.Button className="bg-purple-600 rounded-full flex items-center pl-2 gap-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-600 focus:ring-white">
                        <span className="">{session?.user?.email}</span>
                        <div className="inline-flex justify-center items-center bg-gray-400 border-2 border-white rounded-full h-10 w-10">
                          {session?.user?.username?.charAt(0).toUpperCase()}
                        </div>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <div
                                onClick={() => item.callBack()}
                                className={classNames(
                                  pathname === item.href ? "bg-gray-100" : "",
                                  "block py-2 px-4 text-sm text-gray-700"
                                )}
                              >
                                {item.name}
                              </div>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className="text-white hover:bg-purple-500 hover:bg-opacity-75block rounded-md py-2 px-3 text-base font-medium"
                  aria-current="page"
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-purple-700">
              <div className="px-5 flex items-center">
                <div className="flex-shrink-0">
                  <div className="inline-flex justify-center items-center bg-gray-400 border-2 border-white rounded-full h-10 w-10">
                    {session?.user?.username?.charAt(0).toUpperCase()}
                  </div>{" "}
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-white">
                    {session?.user?.username}
                  </div>
                  <div className="text-sm font-medium text-purple-300">
                    {session?.user?.email}
                  </div>
                </div>
              </div>
              <div className="mt-3 px-2 space-y-1">
                {userNavigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="block rounded-md py-2 px-3 text-base font-medium text-white hover:bg-purple-500 hover:bg-opacity-75"
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default NavBar;
