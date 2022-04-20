import React, {useState} from "react";
import { useFormik } from "formik";

/**
 *  Input modal for adding residents to saved planets.
 *  TODO:
 *    Form validation and confirmation.
 *    Hook up to Stores.
 *    Clear form on save/cancel.
 */


type ModalProps = {
  handleClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
  show: boolean;
  planetID: string;
  //children: React.ReactNode;
};

const InputModal = ({ handleClose, show, planetID }: ModalProps) => {
  const showHideClassName = show ? "visible" : "hidden";

  const formik = useFormik({
    initialValues: {
        name: "",
        gender: "",
        height: undefined,
        born: "",
    },
    onSubmit: (values) => {
      console.log(formik.values.name, formik.values.gender, formik.values.height, formik.values.born, planetID, generateResidentID())
    },
  });

  const generateResidentID = () => {
    const residentID = planetID + new Date().toLocaleTimeString() + formik.values.name;
    return residentID.replace(/\s/g,'');
  }

  const [heightType, setHeightType] = useState("text");
  const switchToNumber = () => {
    setHeightType("number");
    console.log(heightType)
  }

  return (
    <div 
      className={`${showHideClassName} 
      text-gray-50 bg-slate-700 
      rounded-xl border border-amber-400
      absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
      p-2`}
    >
      <section className="flex flex-col justify-items-center mx-10 mb-5">
        <h1 className="text-xl font-bold text-amber-400 self-center">Resident Details</h1>
        <form onSubmit={formik.handleSubmit} className="flex flex-col w-80">
            <input
                type="text" 
                name="name" 
                onChange={formik.handleChange} 
                value={formik.values.name} 
                placeholder="Name"
                className="bg-slate-800 border border-amber-400 rounded p-1"
            />
  
            <input 
                type="text" 
                name="gender" 
                onChange={formik.handleChange} 
                value={formik.values.gender} 
                placeholder="Gender"
                className="bg-slate-800 border border-amber-400 rounded p-1"
            />

            <input 
                type="text" 
                name="born" 
                onChange={formik.handleChange} 
                value={formik.values.born} 
                placeholder="Birthyear"
                className="bg-slate-800 border border-amber-400 rounded p-1"
            />

            <input 
                type="number"
                name="height" 
                onChange={formik.handleChange} 
                value={formik.values.height} 
                placeholder="Height (cm)"
                className="bg-slate-800 border border-amber-400 rounded p-1"
            />
            <button type="button" onClick={handleClose} className="bg-slate-800 text-amber-400 font-bold border border-amber-400 rounded p-1 hover:bg-amber-400 hover:text-gray-50">
              Cancel
            </button>
            <button type="submit" onClick={handleClose} className="bg-slate-800 text-amber-400 font-bold border border-amber-400 rounded p-1 hover:bg-amber-400 hover:text-gray-50">
              Save
            </button>
        </form>
      </section>
    </div>
  );
};

export default InputModal;
