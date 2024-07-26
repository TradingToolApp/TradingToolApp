import React, { useState, useRef, useEffect, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import MenuData from "../../data/menu/HeaderMenu.json";
import OffcanvasMenu from "./OffcanvasMenu";
import Dropdown from "react-bootstrap/Dropdown";
import { signOut } from "next-auth/react"
import { PostContext } from "@/contextProvider/postContext";
import { useRouter } from 'next/router'


const HeaderThree = () => {
	// Main Menu Toggle
	var menuRef = useRef();
	const router = useRouter();
	const { language, setLanguage } = useContext(PostContext);

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
													<span>{data.label}</span>
												</Link>
												<ul className="submenu">
													{data.submenu.map((data, index) =>
														data.thirdmenu ? (
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
								<Dropdown className="lang-dropdown m-l-xs-10 m-l-md-30">
									<Dropdown.Toggle className="btn txt-btn dropdown-toggle" id="lang">
										{language ? language : "EN"}
									</Dropdown.Toggle>

									<Dropdown.Menu>
										<Dropdown.Item onClick={() => setLanguage("EN")}>EN</Dropdown.Item>
										<Dropdown.Item onClick={() => setLanguage("VN")}>VN</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>

								{/* <button className="side-nav-toggler" onClick={handleShow}>
									<span />
									<span />
									<span />
								</button> */}
								{
									router.pathname === "/admin/dashboard" &&
									<div className="nav-btn-group">
										<button className="btn btn-primary" onClick={() => signOut({ callbackUrl: '/login', redirect: true })}>SignOut</button>
									</div>
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
