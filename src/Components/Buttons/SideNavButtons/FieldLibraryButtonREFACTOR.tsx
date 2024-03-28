import { useState } from "react";
import SideNavDropDownButtonREFACTOR from "./SideNavDropDownButtonREFACTOR";

export default function FieldLibraryButton({ isOpen }: { isOpen: boolean }) {
  const [isLibraryClosed, setIsLibraryClosed] = useState(true);
  return (
    <SideNavDropDownButtonREFACTOR
      isOpen={isOpen}
      icon="fieldLibraryIcon"
      onClick={(isLibraryClosed) => {
        setIsLibraryClosed(!isLibraryClosed);
      }}
      borderColor="#34a853"
      text="Field Library"
    />
  );
}
