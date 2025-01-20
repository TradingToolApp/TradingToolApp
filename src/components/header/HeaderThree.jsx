import React, {useState, useRef, useEffect, useContext} from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Dropdown,
    Toggle
} from 'rsuite';
import HeaderMenu from "../../data/menu/HeaderMenu.json";
import OffcanvasMenu from "./OffcanvasMenu";
import {AppContext} from '@/providers/app.provider';
import {FaChevronDown} from "react-icons/fa6";
import useCurrentSession from "@/hooks/useCurrentSession";
import AvatarOne from "@/components/avatar/AvatarOne";
import {useRouter} from "next/router";
import CheckIcon from '@rsuite/icons/Check';
import CloseIcon from '@rsuite/icons/Close';
import {MdOutlineDarkMode, MdOutlineLightMode} from "react-icons/md";
import useCurrentUser from "@/hooks/useCurrentUser";

const buttonStyles = {
    width: "72px",
    fontSize: "1.6rem",
    fontFamily: "Roboto",
    fontWeight: 700
}

const HeaderThree = () => {
    // Main Menu Toggle
    var menuRef = useRef();
    const {language, handleLanguageChange, theme, setTheme} = useContext(AppContext);
    const [languageSelect, setLanguageSelect] = useState("EN");
    const user = useCurrentUser();
    const [MenuData, setMenuData] = useState([]);
    const router = useRouter();
    useEffect(() => {
        setMenuData(HeaderMenu.filter((menu) => menu.language === language)[0].data);
        setLanguageSelect(language);
    }, [language]);

    // console.log(user)

    // Offcanvas Menu

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Header Search

    const [searchshow, setSearchShow] = useState(false);

    const headerSearchShow = () => {
        setSearchShow(true);
    };
    const headerSearchClose = () => {
        setSearchShow(false);
    };

    // Mobile Menu Toggle
    const [mobileToggle, setMobileToggle] = useState(false);

    const MobileMenuToggler = () => {
        setMobileToggle(!mobileToggle);
        const HtmlTag = document.querySelector("html");
        const menuSelect = document.querySelectorAll(".main-navigation li");

        if (HtmlTag.classList.contains("main-menu-opened")) {
            HtmlTag.classList.remove("main-menu-opened");
        } else {
            setTimeout(() => {
                HtmlTag.classList.add("main-menu-opened");
            }, 800);
        }

        menuSelect.forEach((element) => {
            element.addEventListener("click", function () {
                if (!element.classList.contains("has-dropdown")) {
                    HtmlTag.classList.remove("main-menu-opened");
                    setMobileToggle(false);
                }
            });
        });
    };

    return (
        <>
            <OffcanvasMenu ofcshow={show} ofcHandleClose={handleClose}/>
            <header className="page-header">
                <nav className="navbar bg-grey-light-three navbar__style-three">
                    <div className="container">
                        <div className="navbar-inner justify-content-between">
                            <div className="brand-logo-container">
                                <Link href="/">
                                    <Image
                                        src="/images/logo.png"
                                        alt="brand-logo"
                                        width={48}
                                        height={48}
                                    />
                                </Link>
                            </div>
                            <div className="main-nav-wrapper">
                                <ul className="main-navigation list-inline" ref={menuRef}>
                                    {MenuData.map((data, index) =>
                                        data.submenu ? (
                                            <li className="has-dropdown" key={index}>
                                                <Link href={data.path}>
													<span>
														{data.label}
                                                        <FaChevronDown style={{top: "-100px", marginLeft: "3px"}}/>
													</span>
                                                </Link>
                                                <ul className="submenu">
                                                    {data.submenu.map((data, index) =>
                                                        data.thirdmenu ? (
                                                            <li className="has-dropdown" key={index}>
                                                                <Link href={data.subpath}>
																	<span>
																		{data.sublabel}
																	</span>
                                                                </Link>
                                                                <ul className="submenu">
                                                                    {data.thirdmenu.map((data, index) => (
                                                                        <li key={index}>
                                                                            <Link href={data.tpath}>
                                                                                <span>{data.tlabel}</span>
                                                                            </Link>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </li>
                                                        ) : (
                                                            <li key={index}>
                                                                <Link href={data.subpath}>
                                                                    <span>{data.sublabel}</span>
                                                                </Link>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </li>
                                        ) : (
                                            <li key={index}>
                                                <Link href={data.path}>
                                                    <span>{data.label}</span>
                                                </Link>
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                            <div className="navbar-extra-features">
                                <form
                                    action="#"
                                    className={`navbar-search ${searchshow ? "show-nav-search" : ""
                                    }`}
                                >
                                    <div className="search-field">
                                        <input
                                            type="text"
                                            className="navbar-search-field"
                                            placeholder="Search Here..."
                                        />
                                        <button className="navbar-search-btn" type="button">
                                            <i className="fal fa-search"/>
                                        </button>
                                    </div>
                                    <span
                                        className="navbar-search-close"
                                        onClick={headerSearchClose}
                                    >
										<i className="fal fa-times"/>
									</span>
                                </form>
                                <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                                    <div>
                                        <Toggle
                                            style={{marginRight: "10px"}}
                                            size="lg"
                                            color="yellow"
                                            checkedChildren={<MdOutlineLightMode color={"yellow"}/>}
                                            unCheckedChildren={<MdOutlineDarkMode color={"white"}/>}
                                            defaultChecked
                                            onChange={() => {
                                                setTheme(theme === "light" ? "dark" : "light")
                                            }}
                                        />
                                        <Dropdown title={languageSelect.toUpperCase()} size="lg"
                                                  className="rsuite-langDropdown">
                                            <Dropdown.Item onClick={() => handleLanguageChange("en")}
                                                           style={buttonStyles}>EN</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleLanguageChange("vi")}
                                                           style={buttonStyles}>VI</Dropdown.Item>
                                        </Dropdown>
                                    </div>
                                    {
                                        user.status === "unauthenticated" && router.pathname !== "/login" &&
                                        <button className={"btn btn-primary"}
                                                onClick={() => router.push("/login")}>Sign In
                                        </button>
                                    }
                                    {user.status === "authenticated" && <AvatarOne user={user}/>}
                                </div>
                            </div>
                            <div
                                className={`main-nav-toggler d-block d-lg-none ${mobileToggle ? "expanded" : ""
                                }`}
                            >
                                <div className="toggler-inner" onClick={MobileMenuToggler}>
                                    <span/>
                                    <span/>
                                    <span/>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
};

export default HeaderThree;
