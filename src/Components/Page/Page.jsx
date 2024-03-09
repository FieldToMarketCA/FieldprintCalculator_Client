import { Children } from "react";
import Header from "../Header";
import Footer from "../Footer";
import SideNav from "../SideNav";

export default function Page({
  title,
  headerBorderColor,
  children,
  padding = "p-[32px]",
}) {
  return (
    <div className="w-screen h-screen flex flex-col ">
      <Header />

      <div className="flex grow">
        <SideNav />
        <div className="flex flex-col  grow overflow-auto">
          {/* PAGE HEADER */}
          <header
            className={` border-b-[3px] ${headerBorderColor} bg-[#eeeeee] text-[#666666] text-[34px] font-light py-[19px] px-[29px] truncate`}
          >
            {title}
          </header>

          {/* PAGE BODY */}
          <main className={`flex flex-col h-full w-full ${padding} `}>
            {Children.map(children, (child) => (
              // <child />
              <div className="flex h-full w-full">{child}</div>
            ))}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
