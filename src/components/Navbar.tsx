"use client";

import { useEffect, useState, useRef } from "react";
import { getAllTipos } from "@/actions/tpos-action";
import { getAllDenominaciones } from "@/actions/denominacines-actions";
import Link from "next/link";
import { tipos, denominaciones } from "@prisma/client";
import { PacificoFont } from "@/config/fonts";
import CartLinkComponent from "./cart/CartLinkComponent";
import Auth from "@/components/auth/Auth";

const Navbar = () => {
  const [tiposMenuOpen, setTiposMenuOpen] = useState(false);
  const [paisMenuOpen, setPaisMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [denominaciones, setDenominaciones] = useState<denominaciones[]>([]);
  const [tipos, setTipos] = useState<tipos[]>([]);

  // Referencias para los menús
  const paisMenuRef = useRef<HTMLDivElement>(null);
  const tiposMenuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      setTipos(await getAllTipos());
      setDenominaciones(await getAllDenominaciones());
    };

    fetchData();
  }, []);

  // Manejo del clic fuera de los menús
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        paisMenuRef.current &&
        !paisMenuRef.current.contains(event.target as Node) &&
        tiposMenuRef.current &&
        !tiposMenuRef.current.contains(event.target as Node) &&
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setPaisMenuOpen(false);
        setTiposMenuOpen(false);
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="py-1 bg-white border opacity-95 w-full shadow-md z-50 fixed">
        <div className="w-11/12 flex flex-wrap items-center justify-between mx-auto p-1">
          <Link href="/" className="flex items-center">
            <img
              src="/logo.png"
              className="h-14 w-14 border mr-3 border-gray-500 rounded-full shadow-xl"
              alt="logo"
            />
            <span
              className={`${PacificoFont.className} hidden lg:block text-4xl font-semibold whitespace-nowrap text-gray-900`}
            >
              El rincón del vino
            </span>
          </Link>

          {/* Menu hamburguesa */}
          <button
            data-collapse-toggle="navbar-dropdown"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-dropdown"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          <div
            className="block sm:hidden w-full md:block md:w-auto"
            id="navbar-dropdown"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 bg-white md:flex-row md:space-x-16 md:mt-0">
              <li className="md:absolute md:-mx-8">
                <button
                  id="dropdownNavbarLink"
                  onClick={() => {
                    setPaisMenuOpen(!paisMenuOpen);
                    setTiposMenuOpen(false);
                    setUserMenuOpen(false);
                  }}
                  className="flex items-center justify-between py-2 pl-2 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-500 md:p-0 md:w-auto"
                >
                  D.O.P{" "}
                  <svg
                    className="w-2.5 h-2.5 ml-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <div
                  ref={paisMenuRef}
                  id="dropdownNavbar"
                  onMouseLeave={() => setPaisMenuOpen(false)}
                  className={`z-10 opacity-100 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow ${
                    paisMenuOpen ? "block" : "hidden"
                  }`}
                >
                  <ul className="grid grid-cols-2 border-1 rounded-lg shadow-md py-2 text-md text-gray-700 relative">
                    {denominaciones &&
                      denominaciones.map((d) => (
                        <li key={d.id}>
                          <Link
                            href={`/dop/${d.id}`}
                            className="text-md block px-4 text-dark rounded-es-md hover:text-white hover:bg-gray-900"
                            onClick={() => setPaisMenuOpen(false)}
                          >
                            {d.nombre}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              </li>
              <li>
                <button
                  id="dropdownNavbarLink"
                  onClick={() => {
                    setTiposMenuOpen(!tiposMenuOpen);
                    setPaisMenuOpen(false);
                    setUserMenuOpen(false);
                  }}
                  className="flex items-center justify-between w-full py-2 pl-2 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-500 md:p-0 md:w-auto"
                >
                  Tipo{" "}
                  <svg
                    className="w-2.5 h-2.5 ml-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <div
                  ref={tiposMenuRef}
                  id="dropdownTipos"
                  tabIndex={1}
                  onMouseLeave={() => setTiposMenuOpen(false)}
                  className={`z-10 ${
                    tiposMenuOpen ? "block" : "hidden"
                  } absolute font-normal divide-y divide-gray-100 rounded-lg shadow`}
                >
                  <ul
                    className="border-1 rounded-xl shadow-md bg-white py-1 text-md text-gray-700"
                    aria-labelledby="dropdownLargeButton"
                  >
                    {tipos &&
                      tipos.map((t) => (
                        <li key={t.id}>
                          <Link
                            href={`/dop/${t.id}`}
                            className="block text-dark hover:text-white px-4 hover:bg-gray-900 hover:rounded-md"
                          >
                            {t.nombre}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              </li>
              <li>
                <CartLinkComponent />
              </li>
              <li className="">
                <Auth />
              </li>
              <li>
                <button
                  id="dropdownUserMenu"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center justify-between w-full py-2 pl-2 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-500 md:p-0 md:w-auto"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <svg
                    className="w-2.5 h-2.5 ml-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <div
                  ref={userMenuRef}
                  id="userMenu"
                 onMouseLeave={() => setUserMenuOpen(false)}
                  className={`absolute right-0 mt-2 w-44 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow ${
                    userMenuOpen ? "block" : "hidden"
                  }`}
                >
                  <ul
                    className="py-2 text-md text-gray-700"
                    aria-labelledby="dropdownUserMenu"
                  >
                    

                    <li>
                      <Link
                        href="/Ordenes"
                        className="text-md block px-4 text-dark rounded-es-md hover:text-white hover:bg-gray-500"
                      >
                        Mis pedidos
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
