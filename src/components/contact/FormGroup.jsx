import React, {useEffect, useRef} from 'react';

const FormGroup = ({pClass, label, type, name, rows, pattern}) => {

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

    useEffect(() => {
        InputFocusUI();
    }, []);

    return (
        <div className={`form-group ${pClass}`}>
            {label ? <label>{label}</label> : ""}
            {type === "textarea" ?
                <textarea type={type} name={name} ref={inputElement} rows={rows ?? 3} required/> :
                name === "email" ?
                    <input className="border-solid border-2 border-neutral-300" type={type} name={name}
                           ref={inputElement} pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                           title="email@example.com" required/>
                    :
                    name === "password" ?
                        <input className="border-solid border-2 border-neutral-300" type={type} name={name}
                               ref={inputElement} pattern="^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$"
                               title="min 8 letter password, with at least a symbol, upper and lower case letters and a number"
                               required/> :
                        name === "phone" ?
                            <input className="border-solid border-2 border-neutral-300" type={type} name={name}
                                   ref={inputElement} pattern="[0-9]{10}" title="10 digit number" required/> :
                            <input className="border-solid border-2 border-neutral-300" type={type} name={name}
                                   ref={inputElement} required/>
            }
        </div>
    );
}

export default FormGroup;