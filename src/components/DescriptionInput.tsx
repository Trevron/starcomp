import React, {useState} from 'react'
import {useFormik} from "formik";

/**
 *  Input form for planet description.
 */

type DescriptionInputProps = {
    handleClose: () => void;
    show: boolean;
    currentDescription?: string;
    handleSave: (description: string) => void;
}

const DescriptionInput = ({handleClose, show, currentDescription, handleSave}: DescriptionInputProps) => {

    const [descriptionState, setDescriptionState] = useState(currentDescription || "");
    const [confirmed, setConfirmed] = useState(false);

    const formik = useFormik({
        initialValues: {
            description: descriptionState || "",
        },
        onSubmit: (values) => {
            if (confirmed) {
                setDescriptionState(formik.values.description);
                handleSave(formik.values.description);
                handleClose();
            }
        },
      });

  return (
    <div className={show ? "visible" : "hidden"}>
        <form className="mt-1 flex gap-1" onSubmit={formik.handleSubmit}>
            <input 
                type="text" 
                name="description" 
                onChange={formik.handleChange} 
                value={formik.values.description} 
                className="w-full bg-slate-700 p-1 border border-amber-600 rounded focus:border-amber-400 focus:outline-none"
                placeholder="Enter a description..."
            />
            <button type="submit" onClick={() => (window.confirm("Are you sure you want to save?") ? setConfirmed(true) : setConfirmed(false))} 
                className={`text-amber-400 font-bold border border-amber-400 rounded p-1 hover:text-gray-50 hover:bg-amber-400`}>
                Save
            </button>
        </form>
    </div>
  )
}

export default DescriptionInput;