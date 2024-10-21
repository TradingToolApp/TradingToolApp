import { useContext } from "react";
import { AppContext } from "@/providers/app.provider";
import en from '../../public/locales/en/translation.json'
import vi from '../../public/locales/vi/translation.json'

const useTranslate = () => {
    const { language } = useContext(AppContext);
    return language === 'en' ? en : vi;
}

export default useTranslate;