import React, { useState, useRef, useEffect, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/router'
import { signOut } from "next-auth/react"
import { Dropdown, Button } from 'rsuite';
import HeaderMenu from "../../data/menu/HeaderMenu.json";
import OffcanvasMenu from "./OffcanvasMenu";
import { PostContext } from "@/contextProvider/postContext";
import { useTranslation } from 'react-i18next'
import { FaChevronDown } from "react-icons/fa6";
import { useSession } from "next-auth/react";

const HeaderThree = () => {
	// Main Menu Toggle
	var menuRef = useRef();
	const router = useRouter();
	const { language, handleLanguageChange } = useContext(PostContext);
	const { data: session } = useSession();
	const MenuData = HeaderMenu.filter((menu) => menu.language === language)[0].data;
	const toggleDropdownMenu = () => {
		const dropdownSelect = menuRef.current.childNodes;
		let dropdownList = [];

		for (let i = 0; i < dropdownSelect.length; i++) {
			const element = dropdownSelect[i];
			if (element.classList.contains("has-dropdown")) {
				dropdownList.push(element);
			}
		}

		dropdownList.forEach((element) => {
			element.children[0].addEventListener("click", () => {
				if (element.classList.contains("active")) {
					element.classList.remove("active");
					element.childNodes[1].classList.remove("opened");
				} else {
					dropdownList.forEach((submenu) => {
						if (element !== submenu) {
							submenu.classList.remove("active");
							submenu.childNodes[1].classList.remove("opened");
						} else {
							submenu.classList.add("active");
							submenu.childNodes[1].classList.add("opened");
						}
					});
				}
			});
		});
	};

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
			<OffcanvasMenu ofcshow={show} ofcHandleClose={handleClose} />
			<header className="page-header">
				<nav className="navbar bg-grey-light-three navbar__style-three">
					<div className="container">
						<div className="navbar-inner justify-content-between">
							<div className="brand-logo-container">
								<Link href="/">
									<Image
										src="/images/logo-black.svg"
										alt="brand-logo"
										width={102}
										height={34}
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
														<FaChevronDown style={{ top: "-100px", marginLeft: "3px" }} />
													</span>
												</Link>
												<ul className="submenu">
													{data.submenu.map((data, index) =>
														data.thirdmenu ? (
															<li className="has-dropdown" key={index}>
																<Link href={data.subpath}>
																	<span>
																		{data.sublabel}
																		{/* <FaChevronDown size={"2em"} /> */}
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
											<i className="fal fa-search" />
										</button>
									</div>
									<span
										className="navbar-search-close"
										onClick={headerSearchClose}
									>
										<i className="fal fa-times" />
									</span>
								</form>

								<button
									className="nav-search-field-toggler"
									onClick={headerSearchShow}
								>
									<i className="far fa-search" />
								</button>
								<Dropdown title={language.toUpperCase()} size="lg" className="rsuite-langDropdown">
									<Dropdown.Item onClick={() => handleLanguageChange("en")} style={{ width: "72px", fontSize: "1.6rem", fontFamily: "Roboto", fontWeight: 700 }}>EN</Dropdown.Item>
									<Dropdown.Item onClick={() => handleLanguageChange("vi")} style={{ width: "72px", fontSize: "1.6rem", fontFamily: "Roboto", fontWeight: 700 }}>VI</Dropdown.Item>
								</Dropdown>
								{/* <button className="side-nav-toggler" onClick={handleShow}>
									<span />
									<span />
									<span />
								</button> */}
								{
									session?.role === "admin" && 
									(
										router.pathname === "/admin/dashboard" ?
											<Link className="btn btn-outline-danger text-danger p-4 m-2" href="/login" onClick={() => signOut({ callbackUrl: '/login', redirect: true })}>Sign Out</Link>
											: <Link className="btn btn-outline-danger text-danger p-4 m-2" href="/admin/dashboard">My Dashboard</Link>
									)
								}
							</div>

							<div
								className={`main-nav-toggler d-block d-lg-none ${mobileToggle ? "expanded" : ""
									}`}
							>
								<div className="toggler-inner" onClick={MobileMenuToggler}>
									<span />
									<span />
									<span />
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
