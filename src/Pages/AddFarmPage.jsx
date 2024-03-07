import HelpIconButton from "../Components/Buttons/Iconbuttons/HelpIconButton";
import Page from "../Components/Page/Page";

export default function AddFarmPage() {
  return (
    <Page title={"New Farm"} headerBorderColor={"border-[#34a853]"}>
      <div>
        Some cool Row 1{" "}
        <HelpIconButton
          title={"Farm Name"}
          description={`A farm or farm operation is used as a way to group fields in a way that is useful to the user.
          If you have multiple fields you can use farms to logically group them. Use a name that is recognizable to you.`}
        />
      </div>
      <div>Some cool Row 2</div>
      <div>Some cool Row 3</div>
    </Page>
  );
}
