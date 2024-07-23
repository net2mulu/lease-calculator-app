import LeaseCard from "@/components/Home/LeaseCard";
import LoaderCard from "@/components/Home/LoaderCard";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import { GetLeases } from "@/app/_actions";
import { LeaseData } from "@/types/lease";

const page = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["leases"],
    queryFn: GetLeases,
  });

  const data = await queryClient.getQueryData(["leases"]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
        <div className="">
          <div className="flex mb-4 justify-end">
            <Link
              href="/home/create"
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Create New Lease
            </Link>
          </div>

          {(data as LeaseData[]).length === 0 ? (
            <div className="h-[50vh] w-full flex justify-center items-center">
              <p className="text-purple-400 font-normal text-xl">
                No leases yet!
              </p>
            </div>
          ) : (
            <ul
              role="list"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {(data as LeaseData[]).map((data: LeaseData) => (
                <LeaseCard data={data} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default page;
