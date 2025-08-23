import { LucideArrowRight } from "lucide-react";
import Wrapper from "./wrapper";
import { MENU_LIST } from "@/app/(marketing)/_utils/const";

export default function Header() {
  return (
    <header className="bg-white">
      <Wrapper className="flex items-center justify-between py-4 text-black">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <a href="#">Logo</a>
          </div>
          <div className="hidden md:block">
            <nav>
              <ul className="flex items-center gap-4">
                {MENU_LIST.map(({ name, href }) => (
                  <li key={name}>
                    <a
                      href={href}
                      className="text-gray-500 hover:text-gray-900"
                    >
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div>
            <button className="bg-gradient-to-r from-sky-600 to-cyan-600  rounded-full font-[300] text-white px-4 py-2 flex space-x items-center">
              <span>Login</span>
              <LucideArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
          <div className="mr-2 -my-2 md:hidden">
            <button
              type="button"
              className="bg-gray-50 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </Wrapper>
    </header>
  );
}
