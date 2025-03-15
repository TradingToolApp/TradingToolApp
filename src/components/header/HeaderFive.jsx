import React, {useState, useRef, useEffect, useContext} from 'react';
import Link from "next/link";
import Image from "next/image";
import {Toggle, Dropdown, Loader} from "rsuite";
import MenuEN from "../../data/menu/HeaderMenuEN.json"
import MenuVI from "../../data/menu/HeaderMenuVI.json"
import OffcanvasMenu from './OffcanvasMenu';
import {AppContext} from '@/providers/app.provider';
import useCurrentUser from "@/hooks/useCurrentUser";
import {useRouter} from "next/router";
import {MdOutlineDarkMode, MdOutlineLightMode} from "react-icons/md";
import AvatarOne from "@/components/avatar/AvatarOne";

const HeaderFive = () => {
    // Main Menu Toggle
    var menuRef = useRef();
    const {language, handleLanguageChange, theme, setTheme} = useContext(AppContext);
    const [languageSelect, setLanguageSelect] = useState("en");
    const user = useCurrentUser();
    const [MenuData, setMenuData] = useState(MenuEN);
    const router = useRouter();

    useEffect(() => {
        language === "en" ? setMenuData(MenuEN) : setMenuData(MenuVI);
        setLanguageSelect(language);
    }, [language]);

    const toggleDropdownMenu = () => {
        const dropdownSelect = menuRef.current.childNodes;
        let dropdownList = [];

        for (let i = 0; i < dropdownSelect.length; i++) {
            const element = dropdownSelect[i];
            if (element.classList.contains("has-dropdown")) {
                dropdownList.push(element)
            }
        }

        dropdownList.forEach(element => {

            element.children[0].addEventListener('click', () => {

                if (element.classList.contains('active')) {
                    element.classList.remove('active');
                    element.childNodes[1].classList.remove('opened');
                } else {
                    dropdownList.forEach(submenu => {
                        if (element !== submenu) {
                            submenu.classList.remove('active');
                            submenu.childNodes[1].classList.remove('opened');
                        } else {
                            submenu.classList.add('active');
                            submenu.childNodes[1].classList.add('opened');
                        }
                    })
                }
            })
        });
    }

    useEffect(() => {
        toggleDropdownMenu();
    }, []);

    // Offcanvas Menu
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Header Search
    const [searchshow, setSearchShow] = useState(false);
    const headerSearchShow = () => {
        setSearchShow(true);
    }
    const headerSearchClose = () => {
        setSearchShow(false);
    }

    // Mobile Menu Toggle
    const [mobileToggle, setMobileToggle] = useState(false);

    const MobileMenuToggler = () => {
        setMobileToggle(!mobileToggle);
        const HtmlTag = document.querySelector('html');
        const menuSelect = document.querySelectorAll('.main-navigation li');

        if (HtmlTag.classList.contains('main-menu-opened')) {
            HtmlTag.classList.remove('main-menu-opened');
        } else {
            setTimeout(() => {
                HtmlTag.classList.add('main-menu-opened');
            }, 800)
        }

        menuSelect.forEach(element => {
            element.addEventListener('click', function () {
                if (!element.classList.contains('has-dropdown')) {
                    HtmlTag.classList.remove('main-menu-opened');
                    setMobileToggle(false);
                }
            })

        });
    }

    return (
        <>
            <OffcanvasMenu ofcshow={show} ofcHandleClose={handleClose}/>
            <header className="page-header">
                <nav className="navbar bg-grey-light-three navbar__style-three">
                    <div className="container-fluid p-l-md-30 p-r-md-30">
                        <div className="navbar-inner justify-content-between">
                            <div className="brand-logo-container">
                                <Link href="/">
									<span>
										<Image
                                            src="/images/logo.png"
                                            alt="brand-logo"
                                            width={48}
                                            height={48}
                                        />
									</span>
                                </Link>
                            </div>
                            <div className="main-nav-wrapper">
                                <ul className="main-navigation list-inline" ref={menuRef}>
                                    {
                                        MenuData.map((data, index) => (
                                            data.submenu ?
                                                <li className="has-dropdown" key={index}>
                                                    <Link href={data.path}>
                                                        <span>{data.label}</span>
                                                    </Link>
                                                    <ul className="submenu">
                                                        {data.submenu.map((data, index) => (
                                                            data.thirdmenu ?
                                                                <li className="has-dropdown" key={index}>
                                                                    <Link href={data.subpath}>
                                                                        <span>{data.sublabel}</span>
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
                                                                </li> :
                                                                <li key={index}>
                                                                    <Link href={data.subpath}>
                                                                        <span>{data.sublabel}</span>
                                                                    </Link>
                                                                </li>
                                                        ))}
                                                    </ul>
                                                </li> :
                                                <li key={index}>
                                                    <Link href={data.path}>
                                                        <span>{data.label}</span>
                                                    </Link>
                                                </li>
                                        ))
                                    }
                                </ul>
                            </div>
                            <div className="navbar-extra-features">
                                <div className="d-flex justify-content-center align-items-center gap-3">
                                    <Toggle
                                        size="lg"
                                        color="yellow"
                                        checkedChildren={<MdOutlineLightMode color={"yellow"}/>}
                                        unCheckedChildren={<MdOutlineDarkMode color={"white"}/>}
                                        defaultChecked
                                        onChange={() => {
                                            setTheme(theme === "light" ? "dark" : "light")
                                        }}
                                    />
                                    <Dropdown title={languageSelect.toUpperCase()} size="md" noCaret
                                              className="rsuite-langDropdown">
                                        <Dropdown.Item onClick={() => handleLanguageChange("en")}>EN</Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleLanguageChange("vi")}>VI</Dropdown.Item>
                                    </Dropdown>
                                    {
                                        user.status === "unauthenticated" && router.pathname !== "/login" &&
                                        <button className="btn btn-primary btn-medium m-l-xs-10 "
                                                onClick={() => router.push("/login")}>Sign In
                                        </button>
                                    }
                                    {user.status === "authenticated" &&
                                        <AvatarOne className="navbar-avatar" user={user}/>}
                                </div>
                            </div>
                            <div
                                className={`main-nav-toggler d-block d-lg-none ${mobileToggle ? "expanded" : ""}`}>
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
}

export default HeaderFive;