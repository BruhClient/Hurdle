import { FunctionComponent } from "react";
import { MdError } from "react-icons/md";
interface FormErrorProps {
    message : string 
}
 
const FormError: FunctionComponent<FormErrorProps> = ({message}) => {
    return ( <div className="w-full bg-red-400 py-2 px-3 rounded-md flex items-center text-md gap-3">
        <MdError size={25}/>{message}
    </div> );
}
 
export default FormError;