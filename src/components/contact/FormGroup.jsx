import React, {useEffect, useRef} from 'react';

const FormGroup = ({
                       pClass = "",
                       label = "",
                       type = "",
                       name = "",
                       rows = "",
                       pattern = "",
                       children = React.ReactNode,
                   }) => {

    const inputElement = useRef();

    const InputFocusUI = () => {
        const selectElm = inputElement.current;
        const parentElm = inputElement.current.parentElement;

        selectElm.addEventListener('focusin', (e) => {
            parentElm.classList.add("focused");
        })
        selectElm.addEventListener('focusout', (e) => {
            if (!selectElm.value) {
                parentElm.classList.remove("focused");
            }
        })
    }
    const renderInput = () => {
        switch (name) {
            case "email":
                return <input className="border-solid border-2 border-neutral-300" type={type} name={name}
                              ref={inputElement}
                    // pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                    // title="email@example.com"
                    // required
                />
                break;
            case "password":
                return <input className="border-solid border-2 border-neutral-300" type={type} name={name}
                              ref={inputElement}
                    // pattern="^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$"
                    // title="min 8 letter password, with at least a symbol, upper and lower case letters and a number"
                    // required
                />
                break;
            case "cpassword":
                return <input className="border-solid border-2 border-neutral-300" type={type} name={name}
                              ref={inputElement}
                    // pattern="^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$"
                    // title="min 8 letter password, with at least a symbol, upper and lower case letters and a number"
                    // required
                />
                break;
            case "phone":
                return <input className="border-solid border-2 border-neutral-300" type={type} name={name}
                              ref={inputElement}
                    // pattern="[0-9]{10}" title="10 digit number" required
                />
                break;
            default:
                return <input className="border-solid border-2 border-neutral-300" type={type} name={name}
                              ref={inputElement} required/>
        }
    }
    useEffect(() => {
        InputFocusUI();
    }, []);

    return (
        <div className={`form-group ${pClass}`}>
            {label ? <label>{label}</label> : ""}
            {type === "textarea" && <textarea type={type} name={name} ref={inputElement} rows={rows ?? 3} required/>}
            {renderInput()}
            {children}
        </div>
    );
}

export default FormGroup;