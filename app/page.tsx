import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-white min-h-screen">
      {/* Hero section */}
      <div className="pt-8 overflow-hidden sm:pt-12 lg:relative lg:py-48">
        <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl lg:grid lg:grid-cols-2 lg:gap-24">
          <div>
            <div>
              <Image
                className="h-12 w-auto"
                src="/logo.png"
                alt="logo"
                width={48}
                height={48}
              />
            </div>
            <div className="mt-10">
              <div>
                <a href="#" className="inline-flex space-x-4">
                  <span className="rounded bg-purple-50 px-2.5 py-1 text-xs font-semibold text-purple-500 tracking-wide uppercase">
                    L - LEASE
                  </span>
                  <span className="inline-flex items-center text-sm font-medium text-purple-500 space-x-1">
                    <span>version 1.0</span>
                  </span>
                </a>
              </div>
              <div className="mt-6 sm:max-w-xl">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                  Create and share your leases{" "}
                </h1>
                <p className="mt-6 text-xl text-gray-500">
                  Your #1 choice for calculating creating and sharing leases.
                  manage all your leases in one place.
                </p>
              </div>
              <form action="#" className="mt-12 sm:max-w-lg sm:w-full sm:flex">
                <Link
                  href="/auth"
                  className="inline-flex justify-center items-center w-full rounded-md border border-transparent px-5 py-3 border-1 border-purple-500 text-base font-medium hover:text-white text-purple-600 shadow hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:px-10"
                >
                  Sign up for early access
                </Link>
              </form>
              <div className="mt-6">
                <div className="inline-flex items-center divide-x divide-gray-300">
                  <div className="min-w-0 flex-1 pl-5 py-1 text-sm text-gray-500 sm:py-3">
                    <span className="font-medium text-gray-900">
                      5 stars Rated
                    </span>{" "}
                    by over{" "}
                    <span className="font-medium text-purple-500">
                      2 beta users
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sm:mx-auto sm:max-w-3xl sm:px-6">
          <div className="py-12 sm:relative sm:mt-12 sm:py-16 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <div className="hidden sm:block">
              <div className="absolute inset-y-0 left-1/2 w-screen bg-gray-50 rounded-l-3xl lg:left-80 lg:right-0 lg:w-full" />
              <svg
                className="absolute top-8 right-1/2 -mr-3 lg:m-0 lg:left-0"
                width={404}
                height={392}
                fill="none"
                viewBox="0 0 404 392"
              >
                <defs>
                  <pattern
                    id="837c3e70-6c3a-44e6-8854-cc48c737b659"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x={0}
                      y={0}
                      width={4}
                      height={4}
                      className="text-gray-200"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect
                  width={404}
                  height={392}
                  fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
                />
              </svg>
            </div>
            <div className="relative pl-4 -mr-40 sm:mx-auto sm:max-w-3xl sm:px-0 lg:max-w-none lg:h-full lg:pl-12">
              <Image
                className="w-full rounded-md shadow-xl ring-1 ring-black ring-opacity-5 lg:h-full lg:w-auto lg:max-w-none"
                src="/lease-demo.png"
                alt=""
                width={500}
                height={462}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
