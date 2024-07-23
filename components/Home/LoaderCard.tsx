import React from "react";

const LoaderCard = () => {
  return (
    <li className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200 animate-pulse">
      <div className="w-full flex items-center justify-between p-6 space-x-6">
        <div className="flex-1 truncate">
          <div className="flex items-center space-x-3">
            <h3 className="bg-gray-300 text-transparent rounded w-32 h-5 font-medium"></h3>
          </div>
          <p className="mt-1 bg-gray-300 text-transparent rounded w-48 h-4 truncate"></p>
          <div className="flex gap-2 text-sm text-gray-500">
            <p className="bg-gray-300 text-transparent rounded w-20 h-4 mt-2"></p>
            <p className="bg-gray-300 text-transparent rounded w-20 h-4 mt-2"></p>
          </div>
        </div>
        <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0 inline-flex justify-center items-center"></div>
      </div>
      <div className="grid grid-cols-2 gap-1 px-6 p-2">
        <p className="bg-gray-300 text-transparent rounded w-32 h-2 text-xs"></p>
        <p className="bg-gray-300 text-transparent rounded w-32 h-2 text-xs"></p>
        <p className="bg-gray-300 text-transparent rounded w-32 h-2 text-xs"></p>
        <p className="bg-gray-300 text-transparent rounded w-32 h-2 text-xs"></p>
        <p className="bg-gray-300 text-transparent rounded w-32 h-2 text-xs"></p>
        <p className="bg-gray-300 text-transparent rounded w-32 h-2 text-xs"></p>
      </div>
      <div>
        <div className="flex divide-x divide-gray-200">
          <div className="w-0 flex-1 flex">
            <a
              href="#"
              className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-2 text-sm text-transparent font-medium border border-transparent rounded-bl-lg bg-gray-300 hover:text-transparent"
            >
              <span className="ml-3">Update</span>
            </a>
          </div>
          <div className="-ml-px w-0 flex-1 flex">
            <a
              href="#"
              className="relative w-0 flex-1 inline-flex items-center justify-center py-2 text-sm text-transparent font-medium border border-transparent rounded-br-lg bg-gray-300 hover:text-transparent"
            >
              <span className="ml-3">Delete</span>
            </a>
          </div>
        </div>
      </div>
    </li>
  );
};

export default LoaderCard;
