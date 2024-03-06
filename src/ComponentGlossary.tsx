import NavBar from "./Components/NavBar";
import ButtonPrimary from "./Components/Buttons/ButtonPrimary";

function testOnClick() {
  console.log("hey");
}

export default function ComponentGlossary() {
  return (
    <ol className="w-screen h-screen overflow-scroll">
      <li className="mb-3">
        <NavBar />
      </li>
      <li className="mb-3">
        <ButtonPrimary text={"Edit Farm"} onClick={testOnClick} />
      </li>
    </ol>
  );
}
