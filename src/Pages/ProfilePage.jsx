import Page from "../Components/Page";
import Switch from "@mui/material/Switch";
import DashBoardFilterPane from "../Components/Dashboard/DashBoardFilterPane";
import DashboardTable from "../Components/Dashboard/DashboardTable";

import { useState, useEffect } from "react";
import { axiosInstance } from "../Components/axiosFetchers";
import { useAuth } from "../Components/Auth/useAuth";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const DUMMY_PROJECTS = [
  {
    id: "fx",
    title: "OPT-IN ALL PROJECTS",
  },
  {
    id: 0,
    title: "University of Manitoba - Efficiency of Organic Fertilizers",
  },
  { id: 1, title: "BC Eggs - Synthetic Manure for Corn Production" },
  {
    id: 2,
    title: "Serecon - Maximize Land Use Efficiency with Generative Algorithms",
  },
];
export default function DashBoardPage() {
  const { user } = useAuth();
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    created_at: "",
    last_sign_in: "",
  });

  const [allowDataShare, setAllowDataShar] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState([]);

  document.title = "Profile Page - Field To Market Canada";

  useEffect(() => {
    async function startup() {
      const response = await axiosInstance.get(
        process.env.REACT_APP_API_URL + "/user",
        {
          headers: {
            token: "Bearer " + user.token,
            "Content-Type": "application/json",
          },
        }
      );
      setUserData(response.data.user);
    }
    startup();
  }, []);

  function handleAddProject(e) {
    if (e.target.value == "fx") {
      setSelectedProjects(DUMMY_PROJECTS);
      return;
    }
    let alreadyInArray =
      selectedProjects.filter((p) => p.id === e.target.value).length > 0;

    if (!alreadyInArray) {
      let tmp = selectedProjects.slice();
      let project = DUMMY_PROJECTS.filter((p) => p.id === e.target.value)[0];
      tmp.push(project);
      setSelectedProjects(tmp);
      console.log(selectedProjects);
    }
  }

  return (
    <Page
      title={"Dashboard"}
      headerBorderColor={"border-[#00adee]"}
      showQuickFacts={false}
    >
      <div className="container mx-auto rounded bg-white mt-5 mb-5 p-5">
        <div className="flex flex-col md:flex-row">
          <div className="w-full flex flex-col items-center ">
            <div className="w-full  ">
              <div className="flex flex-col items-center text-center p-3 py-5">
                <img
                  className="rounded-full mt-5"
                  width="150px"
                  src={userData.picture_url}
                  alt="Profile Picture"
                />
                <span className="font-semibold">
                  {userData.first_name + " " + userData.last_name}
                </span>
                <span className="text-gray-500">{userData.email}</span>
              </div>
            </div>

            <div className="w-full items-center border-t-2 flex flex-col min-[950px]:items-start min-[950px]:flex-row ">
              <div className="p-3 w-full md:w-3/4 max-w-[750px] border-b-2   min-[950px]:border-b-0 min-[950px]:border-r-2 py-5">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-right">Profile Settings</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <label className="block text-sm">Name</label>
                    <input
                      type="text"
                      className="form-control mt-1 p-2 border rounded w-full"
                      value={userData.first_name}
                    />
                  </div>
                  <div>
                    <label className="block text-sm">Surname</label>
                    <input
                      type="text"
                      className="form-control mt-1 p-2 border rounded w-full"
                      value={userData.last_name}
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="mb-3">
                    <label className="block text-sm">Email</label>
                    <input
                      type="text"
                      className="form-control mt-1 p-2 border rounded w-full"
                      value={userData.email}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block text-sm">Created At</label>
                    <input
                      type="text"
                      className="form-control mt-1 p-2 border rounded w-full"
                      value={userData.created_at.slice(0, 10)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block text-sm">Last Sign In</label>
                    <input
                      type="text"
                      className="form-control mt-1 p-2 border rounded w-full"
                      value={userData.last_sign_in.slice(0, 10)}
                    />
                  </div>
                  {/* <div>
                  <label className="block text-sm">Address Line 2</label>
                  <input
                    type="text"
                    className="form-control mt-1 p-2 border rounded w-full"
                    placeholder="enter address line 2"
                  />
                </div>
                <div>
                  <label className="block text-sm">Postcode</label>
                  <input
                    type="text"
                    className="form-control mt-1 p-2 border rounded w-full"
                    placeholder="enter postcode"
                  />
                </div>
                <div>
                  <label className="block text-sm">State</label>
                  <input
                    type="text"
                    className="form-control mt-1 p-2 border rounded w-full"
                    placeholder="enter state"
                  />
                </div>
                <div>
                  <label className="block text-sm">Area</label>
                  <input
                    type="text"
                    className="form-control mt-1 p-2 border rounded w-full"
                    placeholder="enter area"
                  />
                </div>
                <div>
                  <label className="block text-sm">Email ID</label>
                  <input
                    type="text"
                    className="form-control mt-1 p-2 border rounded w-full"
                    placeholder="enter email id"
                  />
                </div>
                <div>
                  <label className="block text-sm">Education</label>
                  <input
                    type="text"
                    className="form-control mt-1 p-2 border rounded w-full"
                    placeholder="education"
                  />
                </div> */}
                </div>
                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <div>
                    <label className="block text-sm">Country</label>
                    <input
                      type="text"
                      className="form-control mt-1 p-2 border rounded w-full"
                      placeholder="country"
                    />
                  </div>
                  <div>
                    <label className="block text-sm">State/Region</label>
                    <input
                      type="text"
                      className="form-control mt-1 p-2 border rounded w-full"
                      placeholder="state"
                    />
                  </div>
                </div>
                <div className="mt-5 text-center">
                  <button
                    className="profile-button text-white py-2 px-4 rounded"
                    type="button"
                  >
                    Save Profile
                  </button>
                </div> */}
              </div>
              <div className=" w-full md:w-3/4 max-w-[750px]">
                <div className="p-3 py-5">
                  <div className="flex justify-between items-center mb-4">
                    <span>Data Sharing Permissions</span>
                    {/* <span className="border px-3 py-1 add-experience cursor-pointer">
                      <i className="fa fa-plus"></i> Experience
                    </span> */}
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm">
                      Would you like to make your data available to enable
                      research studies performed by Field To Market Canada
                      Partners Network?
                    </label>
                    <Switch
                      onChange={() => setAllowDataShar(!allowDataShare)}
                    />
                  </div>
                  {allowDataShare && (
                    <div className="w-full">
                      <FormControl fullWidth>
                        <label className="block text-sm mb-3">
                          Select The projects you want to Opt-In:
                        </label>

                        <Select
                          className="w-full"
                          id="demo-simple-select"
                          displayEmpty
                          onChange={handleAddProject}
                        >
                          {DUMMY_PROJECTS.map((project) => (
                            <MenuItem value={project.id}>
                              {project.title}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <div className="mt-6">
                        <span>Authorized Projects</span>

                        {selectedProjects.length == 0 && (
                          <p>No Authorized Projects</p>
                        )}

                        <Box className="w-full " direction="row" spacing={1}>
                          {selectedProjects.map((project) => {
                            return (
                              <Chip
                                className="m-1"
                                label={project.title}
                                variant="outlined"
                              />
                            );
                          })}
                        </Box>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}
