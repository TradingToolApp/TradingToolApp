import {isPossiblePhoneNumber} from 'react-phone-number-input'

const PATTERN_NAME: RegExp = /[a-z ,.'-]+/;
const PATTERN_DOB: RegExp = /\d{1,2}\/\d{1,2}\/\d{4}/;
const PATTERN_EMAIL: RegExp = /[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/;
const PATTERN_FULLNAME: RegExp = /^$|^[a-zA-ZčČćĆđĐšŠžŽ-]+ [a-zA-ZčČćĆđĐšŠžŽ-]+$/;
const PATTERN_PASSWORD: RegExp = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
type InputValidator = {
    isTrue: Boolean,
    error: string
}

export default function useValidator() {
    const stringValidator = (value: string): boolean => {
        return !!value && value.length > 0;
    };

    const regExpValidator = (
        regexp: RegExp,
        value: string | undefined
    ): boolean => {
        return regexp.test(value ?? "");
    };

    const notNullValidator = (value: string | undefined): InputValidator => {
        return !!value ? {isTrue: true, error: ""} : {isTrue: false, error: "Field is required"};
    }

    const nameValidator = (value: string | undefined): InputValidator => {
        return regExpValidator(PATTERN_NAME, value) ?
            {isTrue: true, error: ""} :
            {isTrue: false, error: "Name is invalid"};
    };

    const emailValidator = (value: string): InputValidator => {
        return regExpValidator(PATTERN_EMAIL, value) ?
            {isTrue: true, error: ""} :
            {isTrue: false, error: "Email is invalid"};
    };

    const dobValidator = (value: string): InputValidator => {
        return regExpValidator(PATTERN_DOB, value) ? {isTrue: true, error: ""} : {
            isTrue: false,
            error: "Date of birth is invalid"
        };
    };


    const cardholderNameValidator = (value: string): InputValidator => {
        return regExpValidator(PATTERN_FULLNAME, value) ? {isTrue: true, error: ""} : {
            isTrue: false,
            error: "Cardholder name is invalid"
        };
    };


    const phoneNumberValidator = (value: string): InputValidator => {
        return stringValidator(value) && isPossiblePhoneNumber(value) ?
            {isTrue: true, error: ""} :
            {isTrue: false, error: "Phone number is invalid"};
    };

    const passwordValidator = (value: string): InputValidator => {
        if (
            value.length >= 8 &&
            regExpValidator(PATTERN_PASSWORD, value)
        ) {
            return {isTrue: true, error: ""};
        } else {
            return {
                isTrue: false,
                error: "Password must contain at least 8 characters, 1 lowercase letter, 1 uppercase letter, 1 number and 1 symbol"
            };
        }
    };

    const confirmPasswordValidator = (value: string, password: string): InputValidator => {
        if (value === password) {
            return {isTrue: true, error: ""};
        } else {
            return {isTrue: false, error: "Password does not match"};
        }
    }


    return {
        nameValidator,
        dobValidator,
        emailValidator,
        passwordValidator,
        cardholderNameValidator,
        stringValidator,
        phoneNumberValidator,
        confirmPasswordValidator
    };
};
