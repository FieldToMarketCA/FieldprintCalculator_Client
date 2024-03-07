import { Children } from "react";
import Header from "../Header";
import Footer from "../Footer";
import SideNav from "../SideNav";

export default function Page({ title, headerBorderColor, children }) {
  return (
    <div className="w-screen h-screen flex flex-col ">
      <Header />

      <div className="flex grow">
        <SideNav />
        <div className="flex flex-col grow">
          {/* PAGE HEADER */}
          <header
            className={` border-b-[3px] ${headerBorderColor} bg-[#eeeeee] text-[#666666] text-[34px] font-light py-[19px] px-[29px] `}
          >
            {title}
          </header>

          {/* PAGE BODY */}
          <main className="flex flex-col h-full p-[32px] ">
            {Children.map(children, (child) => (
              <div className="Row">{child}</div>
            ))}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
