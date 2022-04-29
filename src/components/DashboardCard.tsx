import React from "react";

/**
 * This is a card for home/landing page dashboard.
 */

type DashProps = {
  icon: JSX.Element;
  name: string;
};

const DashboardCard = ({ icon, name }: DashProps) => {
  return (
    <div
      className="
            text-gray-50
            font-bold
            text-xl
            bg-slate-700 
            p-3
            w-fit
            h-fit
            border 
            border-4
            border-gray-50 
            rounded-xl
            flex 
            items-center 
            justify-center 
            flex-col
            hover:bg-amber-400
            hover:p-10
            hover:border-amber-600
            transition-all ease-in-out duration-150
            "
    >
      {icon}
      {name}
    </div>
  );
};

export default DashboardCard;
