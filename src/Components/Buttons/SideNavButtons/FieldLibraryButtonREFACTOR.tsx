import { useState } from "react";
import SideNavDropDownButtonREFACTOR from "./SideNavDropDownButtonREFACTOR";

export default function FieldLibraryButton({
  isCollapsed,
}: {
  isCollapsed: boolean;
}) {
  const [isLibraryClosed, setIsLibraryClosed] = useState(true);
  return (
    <SideNavDropDownButtonREFACTOR
      isHorizontallyCollapsed={isCollapsed}
      icon="fieldLibraryIcon"
      onClick={(isLibraryClosed) => {
        setIsLibraryClosed(!isLibraryClosed);
      }}
      borderColor="#34a853"
      text="Field Library"
    />
  );
}
