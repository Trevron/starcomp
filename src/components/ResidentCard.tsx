import { ResidentInterface } from "../model/Resident";

/**
 *  A simple card for displaying resident information.
 */

type CardProps = {
    resident: ResidentInterface;
  }
  
  function ResidentCard(props: CardProps) {
    const {name, gender, birthyear, height} = props.resident;
    return (
      <div className="
                w-3/4 md:w-[30%] 
                p-3 
                bg-slate-700 shadow-xl 
                rounded-lg 
                text-gray-50 
                flex flex-col justify-center 
                border-amber-400
                hover:translate-x-1 hover:border-l-4 
                tranition-transform ease-in-out duration-150
      ">
          <h1 key={name} className="text-xl font-bold text-amber-400">{name}</h1>
          <div className="ml-1">
            <div className="flex gap-1">
              <label className="text-sm self-center text-amber-600">Gender</label>
              <p key={gender}>{gender || "Unknown"}</p>
            </div>
            <div className="flex gap-1">
              <label className="text-sm self-center text-amber-600">Birthyear</label>
              <p key={birthyear}>{birthyear || "Unknown"}</p>
            </div>
            <div className="flex gap-1">
              <label className="text-sm self-center text-amber-600">Height (cm)</label>
              <p key={height}>{height || "Unknown"}</p>
            </div>
          </div>
      </div>
    );
  }
  
  export default ResidentCard;