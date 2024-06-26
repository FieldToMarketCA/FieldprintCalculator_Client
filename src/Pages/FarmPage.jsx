import Page from "../Components/Page";
import ButtonIcon from "../Components/Buttons/ButtonIcon";
import EditFarmMenuButton from "../Components/EditFarmMenuButton";
import ManagedAcresTable from "../Components/Tables/ManagedAcresTable";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import tractorSVG from "../Assets/Icons/tractorIcon.svg";
import NewGenericMachineModal from "../Components/NewGenericMachineModal";
import { useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../Components/Auth/useAuth";
import { useEffect, useState, useContext } from "react";

import { FarmContext } from "../App";
import { FieldContext } from "../App";

import { axiosInstance, GetSetFarm } from "../Components/axiosFetchers";
import MachinesTable from "../Components/Tables/MachinesTable";

export default function FarmPage() {
  const { user } = useAuth();
  let { farmId } = useParams();
  const farmContext = useContext(FarmContext);
  const navigate = useNavigate();
  const [farmFields, setFarmFields] = useState([]);
  const [farmMachines, setFarmMachines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  document.title = "Farm Page - Field To Market Canada";

  useEffect(() => {
    const startupFarmPage = async () => {
      await GetSetFarm(farmId, user, farmContext);

      const fieldsResponse = await axiosInstance.get(
        process.env.REACT_APP_API_URL + "/farms/" + farmId + "/fields",
        {
          headers: {
            token: "Bearer " + user.token,
            "Content-Type": "application/json",
          },
        }
      );
      const machinesResponse = await axiosInstance.get(
        process.env.REACT_APP_API_URL + "/machines",
        {
          headers: {
            token: "Bearer " + user.token,
            "Content-Type": "application/json",
          },
        }
      );
      setFarmFields(fieldsResponse.data);
      setFarmMachines(machinesResponse.data);
      setIsLoading(false);
    };
    startupFarmPage();
  }, [farmId]);

  return (
    <Page title={farmContext.state.name} showQuickFacts={false}>
      {/* FARM NAME FIELD  */}

      <div className="w-full h-full text-[#666666]">
        <div className="mb-6 flex text-lg mb-4 justify-end">
          <EditFarmMenuButton
            text={"Edit Farm"}
            onClick={() => navigate(`/farm/${farmId}/editfarm`)}
          />
        </div>

        <p className="text-lg mb-4">
          Use this page to manage farm-level features such as your farm name,
          managed acres, farmlevel biodiversity, and, if requested, complete SAI
          Platform's FSA questionnaires.
        </p>

        {/* Managed Acres */}

        <ManagedAcresSection fields={farmFields} isLoading={isLoading} />

        <EquipmentSection
          machines={farmMachines}
          setFarmMachines={setFarmMachines}
          isLoading={isLoading}
        />
      </div>
    </Page>
  );
}

function ManagedAcresSection({ fields, isLoading }) {
  const [managedAcresCollapsed, setManagedAcresCollapsed] = useState(false);
  const navigate = useNavigate();
  let { farmId } = useParams();

  return (
    <div className="w-full text-lg shadow-md">
      {/* Header */}
      <div
        style={{ border: "1px solid lightgrey" }}
        className="px-4 w-full bg-[#F7F6F6] flex justify-between items-center cursor-pointer"
        onClick={() => setManagedAcresCollapsed(!managedAcresCollapsed)}
      >
        <div className="flex items-end my-5">
          <div className="flex w-14 mr-2 ">
            <svg
              style={{ fill: "#F15D22" }}
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-testid="ViewQuiltIcon"
            >
              <path d="M21 5v6.5H9.33V5H21zm-6.33 14v-6.5H9.33V19h5.34zm1-6.5V19H21v-6.5h-5.33zM8.33 19V5H3v14h5.33z"></path>
            </svg>
          </div>
          <p className="mb-1 text-xl">Managed Fields</p>
        </div>
        <div
          className={`${
            !managedAcresCollapsed ? "rotate-180" : "rotate-0"
          } transition-all duration-300`}
        >
          <KeyboardArrowDownIcon fontSize="large" />
        </div>
      </div>

      {/* Body */}
      <div
        style={{ border: "1px solid #DDDDDD" }}
        className={`px-4 overflow-hidden rounded-b mb-6 transition-all duration-700 ${
          managedAcresCollapsed ? "h-0 p-0" : "py-2  "
        } `}
      >
        <p className="mb-4">
          Managed acres represent the total number of acres, for both irrigated
          and non-irrigated acres, you grow for each crop in each year on this
          farm. This information is typically entered when adding a new crop
          year but you can review and modify the information across all fields
          here.
        </p>
        <div className="w-full flex mb-6">
          <ButtonIcon
            text={"Add New Field"}
            onClick={() => navigate(`/farm/${farmId}/addfield`)}
            grow={true}
            Icon={AddCircleOutlineIcon}
          />
        </div>
        <div className="w-full overflow-x-scroll">
          <ManagedAcresTable fields={fields} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}

function EquipmentSection({ machines, isLoading, setFarmMachines }) {
  const { user } = useAuth();
  let { farmId } = useParams();
  const farmContext = useContext(FarmContext);
  const [isNewMachineModalOpen, setIsNewMachineModalOpen] = useState(false);

  async function handleAddNewMachine(newMachine) {
    const response = await axiosInstance.post(
      process.env.REACT_APP_API_URL + `/machines`,
      {
        ...newMachine,
      },
      {
        headers: {
          token: "Bearer " + user.token,
          "Content-Type": "application/json",
        },
      }
    );

    setFarmMachines([...machines, response.data.machineObj]);
  }

  const [equipmentSectionCollapsed, setEquipmentSectionCollapsed] =
    useState(false);

  return (
    <div className="w-full text-lg shadow-md">
      {/* Header */}
      <div
        style={{ border: "1px solid lightgrey" }}
        className="px-4 w-full bg-[#F7F6F6] flex justify-between items-center cursor-pointer"
        onClick={() => setEquipmentSectionCollapsed(!equipmentSectionCollapsed)}
      >
        <div className="flex items-end my-5">
          <div className="flex w-14 mr-2 ">
            <img src={tractorSVG} alt="tractor icon" />
          </div>
          <p className="mb-1 text-xl">Farm Equipment</p>
        </div>
        <div
          className={`${
            !equipmentSectionCollapsed ? "rotate-180" : "rotate-0"
          } transition-all duration-300`}
        >
          <KeyboardArrowDownIcon fontSize="large" />
        </div>
      </div>

      {/* Body */}
      <div
        style={{ border: "1px solid #DDDDDD" }}
        className={`px-4 overflow-hidden rounded-b mb-6 transition-all duration-700 ${
          equipmentSectionCollapsed ? "h-0 p-0" : "py-2  "
        } `}
      >
        <p className="mb-4">
          This section represents the collection of machines registered for this
          farm.
        </p>
        <div className="w-full flex mb-6">
          <ButtonIcon
            text={"Add New Machine"}
            onClick={() => setIsNewMachineModalOpen(true)}
            grow={true}
            Icon={AddCircleOutlineIcon}
          />

          {/* ADD NEW GENERIC MACHINE */}
          <NewGenericMachineModal
            open={isNewMachineModalOpen}
            handleClose={setIsNewMachineModalOpen}
            handleAddNewMachine={handleAddNewMachine}
          />
        </div>
        <div className="w-full overflow-x-scroll">
          <MachinesTable
            machines={machines}
            setMachines={setFarmMachines}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
