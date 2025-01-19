import { FunctionComponent } from "react";
import { FaCheckCircle } from "react-icons/fa";
interface FormSuccessProps {
    message : string 
}
 
const FormSuccess: FunctionComponent<FormSuccessProps> = ({message}) => {
    return ( <div className="w-full bg-green-400 py-2 px-3 rounded-md flex items-center text-md gap-3">
            <FaCheckCircle size={25}/>{message}
        </div> );
}
 
export default FormSuccess;