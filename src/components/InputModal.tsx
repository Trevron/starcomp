import React, {useState} from "react";
import { useFormik } from "formik";
import { ResidentInterface } from "../model/Resident";


/**
 *  Input modal for adding residents to saved planets.
 *  TODO:
 *    Form validation and confirmation.
 *    
 */


type ModalProps = {
  handleClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
  show: boolean;
  planetID: string;
  handleSave: (resident: ResidentInterface) => void;
};

const InputModal = ({ handleClose, show, planetID, handleSave }: ModalProps) => {

  const formik = useFormik({
    initialValues: {
        name: "",
        gender: "",
        height: 0,
        birthyear: "",
    },
    onSubmit: (values) => {
      const resident: ResidentInterface = {
        id: generateResidentID(),
        planetID: planetID,
        name: formik.values.name,
        gender: formik.values.gender,
        height: formik.values.height,
        birthyear: formik.values.birthyear
      }
      handleSave(resident);
      formik.resetForm();
    },
  });

  const generateResidentID = () => {
    const residentID = planetID + new Date().toLocaleTimeString() + formik.values.name;
    return residentID.replace(/\s/g,'');
  }

  return (
    <div 
      className={`
        ${show ? "visible" : "hidden"} 
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
                name="birthyear" 
                onChange={formik.handleChange} 
                value={formik.values.birthyear} 
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
