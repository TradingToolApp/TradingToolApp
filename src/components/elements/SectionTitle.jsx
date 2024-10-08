import Link from "next/link";

const SectionTitle = ({title, btnText, btnUrl, pClass}) => {
    return ( 
        <div className={`section-title ${pClass ?? "m-b-xs-40"}`}>
            <h2 className="axil-title">{title}</h2>
            <Link href={btnUrl ?? "#"}>
                <span className="btn-link">{btnText}</span>
            </Link>
        </div>
     );
}
 
export default SectionTitle;