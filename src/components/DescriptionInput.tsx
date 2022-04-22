import React from 'react'
import {useFormik} from "formik";

type DescriptionInputProps = {
    handleClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
    show: boolean;
    currentDescription?: string;
    handleSave: (description: string) => void;
}

const DescriptionInput = ({handleClose, show, currentDescription, handleSave}: DescriptionInputProps) => {
    const showHideClassName = show ? "visible" : "hidden";

    const formik = useFormik({
        initialValues: {
            description: currentDescription || "",
        },
        onSubmit: (values) => {
          handleSave(formik.values.description);
        },
      });

  return (
    <div className={`${showHideClassName} `}>
        <form className="flex gap-1" onSubmit={formik.handleSubmit}>
            <input 
                type="text" 
                name="description" 
                onChange={formik.handleChange} 
                value={formik.values.description} 
                className="w-full bg-slate-700 p-1 border border-amber-600 rounded focus:border-amber-400 focus:outline-none"
            />
            <button type="submit" onClick={handleClose} className={`border border-amber-400 rounded p-1`}>
                Save
            </button>
        </form>
    </div>
  )
}

export default DescriptionInput;