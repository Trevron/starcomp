import { ErrorMessage, FormikErrors, FormikValues, useFormik } from "formik";
import { ResidentInterface } from "../model/Resident";

/**
 *  Input modal for adding residents to saved planets.   
 */


type ModalProps = {
  handleClose: () => void;
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
      if (window.confirm("Are you sure you want to save?")) {
        const resident: ResidentInterface = {
          id: generateResidentID(),
          planetID: planetID,
          name: formik.values.name,
          gender: formik.values.gender,  
          height: (formik.values.height === NaN) ? 0 : formik.values.height,
          birthyear: formik.values.birthyear
        }
        handleSave(resident);
        formik.resetForm();
        handleClose();
      }
    },
    validate: (values) => {
      let errors: FormikErrors<FormikValues> = {};
      if (!values.name) {
        errors.name = "Required";
      }
      if ((typeof values.height) !== typeof 1) {
        errors.height = "Enter a number or 0 if unknown";
      };

      return errors;
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
            <label htmlFor="name" className="text-xs font-bold text-red-500">
              {formik.errors.name}
            </label>
            <div className="flex items-center">
              <label htmlFor="name" className="text-sm font-bold text-amber-400 basis-1/5">
                Name
              </label>
              <input
                  type="text" 
                  name="name" 
                  onChange={formik.handleChange} 
                  value={formik.values.name} 
                  placeholder="Luke Skywalker"
                  className="bg-slate-800 border border-amber-400 rounded p-1 basis-4/5"
              />
            </div>

            <div className="flex items-center">
              <label htmlFor="gender" className="text-sm font-bold text-amber-400 basis-1/5">
                Gender
              </label>
              <input 
                  type="text" 
                  name="gender" 
                  onChange={formik.handleChange} 
                  value={formik.values.gender} 
                  placeholder="Male"
                  className="bg-slate-800 border border-amber-400 rounded p-1 basis-4/5"
              />
            </div>

            <div className="flex items-center">
              <label htmlFor="birthyear" className="text-sm font-bold text-amber-400 basis-1/5">
                  Birthyear
              </label>
              <input 
                  type="text" 
                  name="birthyear" 
                  onChange={formik.handleChange} 
                  value={formik.values.birthyear} 
                  placeholder="200 BYOB"
                  className="bg-slate-800 border border-amber-400 rounded p-1 basis-4/5"
              />
            </div>

            <label htmlFor="height" className="text-xs font-bold text-red-500">
              {formik.errors.height}
            </label>
            <div className="flex items-center">
              <label htmlFor="height" className="text-sm font-bold text-amber-400 basis-1/5">
                    Height (cm)
              </label>
              <input 
                  type="number"
                  name="height" 
                  onChange={formik.handleChange} 
                  value={formik.values.height} 
                  placeholder="0"
                  className="bg-slate-800 border border-amber-400 rounded p-1 basis-4/5"
              />
            </div>
            
            <button 
              type="button" 
              onClick={() => (window.confirm("Are you sure you want to cancel?")) ? handleClose() : ""} 
              className="bg-slate-800 text-amber-400 font-bold border border-amber-400 rounded p-1 hover:bg-amber-400 hover:text-gray-50">
                Cancel
            </button>
            <button type="submit" className="bg-slate-800 text-amber-400 font-bold border border-amber-400 rounded p-1 hover:bg-amber-400 hover:text-gray-50">
              Save
            </button>
        </form>
      </section>
    </div>
  );
};

export default InputModal;
