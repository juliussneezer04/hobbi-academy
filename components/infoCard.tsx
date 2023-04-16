import React from "react";

export default function InfoCard(props: { info: string; subtitle?: string; route: string }) {
  const { info, route, subtitle } = props;

  return (
    <a href={route}>
      <div className="bg-white px-4 py-5 sm:px- shadow-md hover:shadow-xl rounded-md opacity-100">
        <div className="text-sm flex flex-col space-y-4">
          <div className="flex space-x-3">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-gray-900">
                {info}
              </p>
              <p className="text-sm text-gray-500">
                {subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
