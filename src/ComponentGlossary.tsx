import Header from "./Components/Header";
import MainButton from "./Components/Buttons/MainButton";
import ButtonIcon from "./Components/Buttons/ButtonIcon";
import GrayButton from "./Components/Buttons/GrayButton";
import Link from "./Components/Link";
import Footer from "./Components/Footer";
import SideNav from "./Components/SideNav";

function testOnClick() {
  console.log("hey");
}

export default function ComponentGlossary() {
  return (
    <ol className="w-screen h-screen overflow-scroll">
      <Header />

      <div className="flex  w-full h-full">
        <SideNav />
        <div>
          <li className="my-3">
            <MainButton text={"Edit Farm"} onClick={testOnClick} />
          </li>
          <li className="mb-3">
            <MainButton
              text={"Edit Farm"}
              onClick={testOnClick}
              secondary={true}
            />
          </li>
          <li className="mb-3 flex">
            <ButtonIcon
              text={"Edit Farm"}
              onClick={testOnClick}
              icon={"CheckIcon"}
              grow={true}
              positionRight={true}
            />
          </li>
          <li className="mb-3 flex">
            <GrayButton text={"Logout"} onClick={testOnClick} />
          </li>
          <li className="mb-3 ">
            <Link text={"An Example Hyperlink "} to="farm" highlight={true} />
            <Link text={"An Example of a Gray Hyperlink "} to="farm" />
          </li>
        </div>
      </div>
      <Footer />
    </ol>
  );
}
