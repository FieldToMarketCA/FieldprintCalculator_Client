import { Children, useContext, createContext, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import SideNav from "./SideNav";
import QuickFacts from "./QuickFacts";

export default function Page({
  title,

  children,
  dashboardData = false,
  showQuickFacts = false,
  headerBorderColor = "border-[#34a853]",
  padding = "p-[32px]",
}) {
  return (
    <div className="w-screen h-screen flex flex-col ">
      <Header />

      <div className="flex overflow-auto grow">
        <SideNav />
        <div id="scrollableDiv" className="flex flex-col  grow overflow-auto">
          {/* PAGE HEADER */}
          <header
            className={` border-b-[3px] min-h-[101px] ${headerBorderColor} bg-[#eeeeee] text-[#666666] text-[34px] font-light py-[19px] px-[29px] truncate`}
          >
            {title}
          </header>
          {/* QuickFacts  */}
          {showQuickFacts && (
            <QuickFacts
              dashboardData={dashboardData}
              sectionColor={headerBorderColor.slice(8, 15)}
            />
          )}

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
