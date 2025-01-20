import {useContext} from "react";
import {AppContext} from "@/providers/app.provider";
import en from '../locales/en/translation.json'
import vi from '../locales/vi/translation.json'

const useTranslation = () => {
    const {language} = useContext(AppContext);
    return language === 'en' ? en : vi;
}

export default useTranslation;