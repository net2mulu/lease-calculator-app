import SharedLeaseCard from "@/components/Home/SharedLeaseCard";
import LoaderCard from "@/components/Home/LoaderCard";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import { GetSharedLeases } from "@/app/_actions";
import { LeaseData, SharedLeaseData } from "@/types/lease";

const page = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["shared_leases"],
    queryFn: GetSharedLeases,
  });

  const data = await queryClient.getQueryData(["shared_leases"]);
  console.log(data);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
        <div className="">
          {(data as LeaseData[])?.length === 0 ? (
            <div className="h-[50vh] w-full flex justify-center items-center">
              <p className="text-purple-400 font-normal text-xl">
                No Shared leases yet!
              </p>
            </div>
          ) : (
            <ul
              role="list"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {(data as SharedLeaseData[])?.map(
                (data: SharedLeaseData, index) => (
                  <SharedLeaseCard key={index} data={data} />
                )
              )}
            </ul>
          )}
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default page;
