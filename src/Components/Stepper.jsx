import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ReviewForm from "../Components/CropYearForms/ReviewForm";
import { FieldContext } from "../App";
import { FarmContext } from "../App";
import { CropYearContext } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Components/Auth/useAuth";

export default function HorizontalNonLinearStepper({ steps }) {
  const { user } = useAuth();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const fieldContext = React.useContext(FieldContext);
  const farmContext = React.useContext(FarmContext);
  const cropyearContext = React.useContext(CropYearContext);

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const removeFactoryEmptyStringsFromCropYear = (cropyear) => {
    // console.log("before: ", cropyear);
    var cropyearObj = {};
    // [CROP]
    cropyearObj.crop = cropyear.crop;

    // [FIELD OPERATIONS]

    /* Cultivations */
    cropyearObj.fieldOperations = {};
    cropyearObj.fieldOperations.cultivations = [];

    for (const cultivation of cropyear.fieldOperations.cultivations) {
      if (cultivation.machineObj !== "" && cultivation.hoursUsed !== "") {
        cropyearObj.fieldOperations.cultivations.push({
          machineId: cultivation.machineObj.id,
          hoursUsed: cultivation.hoursUsed,
        });
      }
    }

    /* fertilizerApplications */

    for (const key in cropyear.fieldOperations.fertilizerApplications) {
      if (
        cropyear.fieldOperations.fertilizerApplications[key].machineObj !==
          "" &&
        cropyear.fieldOperations.fertilizerApplications[key].hoursUsed !== "" &&
        cropyear.fieldOperations.fertilizerApplications[key].date !== ""
      ) {
        // initialize fertilizerApplications object if it doesn't exist in cropyearObj
        if ("fertilizerApplications" in cropyearObj.fieldOperations == false) {
          cropyearObj.fieldOperations.fertilizerApplications = {};
        }
        let f = cropyear.fieldOperations.fertilizerApplications[key];

        cropyearObj.fieldOperations.fertilizerApplications[key] = {
          machineId: f.machineObj.id,
          hoursUsed: f.hoursUsed,
          date: f.date,
        };
      }
    }

    /* fertilizerRates */

    for (const key in cropyear.fieldOperations.fertilizerRates) {
      if (
        cropyear.fieldOperations.fertilizerRates[key].preSeed !== "" &&
        cropyear.fieldOperations.fertilizerRates[key].withSeed !== "" &&
        cropyear.fieldOperations.fertilizerRates[key].postSeed !== ""
      ) {
        // initialize fertilizerRates object if it doesn't exist in cropyearObj
        if ("fertilizerRates" in cropyearObj.fieldOperations == false) {
          cropyearObj.fieldOperations.fertilizerRates = {};
        }
        cropyearObj.fieldOperations.fertilizerRates[key] =
          cropyear.fieldOperations.fertilizerRates[key];
      }
    }

    /* pesticidesApplications */

    for (const pesticide of cropyear.fieldOperations.pesticidesApplications) {
      if (pesticide.machineObj !== "" && pesticide.hoursUsed !== "") {
        // initialize pesticidesApplications array if it doesn't exist in cropyearObj
        if ("pesticidesApplications" in cropyearObj.fieldOperations == false) {
          cropyearObj.fieldOperations.pesticidesApplications = [];
        }
        cropyearObj.fieldOperations.pesticidesApplications.push({
          machineId: pesticide.machineObj.id,
          hoursUsed: pesticide.hoursUsed,
        });
      }
    }

    // [HARVEST]
    let s = cropyear.harvest.swather;
    let c = cropyear.harvest.combine;
    cropyearObj.harvest = {
      swather: { machineId: s.machineObj.id, hoursUsed: s.hoursUsed }, // These two are required params
      combine: {
        machineId: c.machineObj.id,
        hoursUsed: c.hoursUsed,
        avgSpeed: c.avgSpeed,
      }, // These two are required params
    };
    if (cropyear.harvest.cropDryingType !== "") {
      cropyearObj.harvest.cropDryingType = cropyear.harvest.cropDryingType;
    }
    if (cropyear.harvest.cropDryingFuel !== "") {
      cropyearObj.harvest.cropDryingFuel = cropyear.harvest.cropDryingFuel;
    }

    if (
      cropyear.harvest.moisture.beforeDrying !== "" &&
      cropyear.harvest.moisture.afterDrying !== ""
    ) {
      cropyearObj.harvest.moisture = cropyear.harvest.moisture;
    }
    // console.log("after: ", cropyearObj);

    return cropyearObj;
  };

  const LowerPanelComponent = ({
    activeStep,
    handleBack,
    handleNext,
    steps,
    handleComplete,
    completedSteps,
    totalSteps,
    isInputValid,
  }) => {
    const navigate = useNavigate();

    return (
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2, pb: "75px" }}>
        <Button
          variant="contained"
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          Back
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />
        <Button variant="contained" onClick={handleNext} sx={{ mr: 1 }}>
          Next
        </Button>
        {activeStep !== steps.length &&
          (completed[activeStep] ? (
            <Typography variant="caption" sx={{ display: "inline-block" }}>
              Step {activeStep + 1} already completed
            </Typography>
          ) : (
            <Button
              variant="contained"
              onClick={() => {
                if (isInputValid()) {
                  // If it's the last step, then POST cropyear object to backend
                  if (completedSteps() === totalSteps() - 1) {
                    // let farmId = farmContext.state.id;
                    // let fieldId = fieldContext.state.id;

                    axios
                      .post(
                        process.env.REACT_APP_API_URL +
                          `/farms/${farmContext.state._id.$oid}/fields/${fieldContext.state._id.$oid}/cropyears`,
                        {
                          ...removeFactoryEmptyStringsFromCropYear(
                            cropyearContext.state
                          ),
                        },
                        {
                          headers: {
                            token: "Bearer " + user.token,
                            "Content-Type": "application/json",
                          },
                        }
                      )
                      .then((response) => {
                        cropyearContext.setter({
                          ...cropyearContext.state,
                          _id: { $oid: response.data.cropyearId },
                        });

                        // navigate("/dashboard");
                        handleComplete();
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                    return;
                  }
                  handleComplete();
                }
              }}
            >
              {completedSteps() === totalSteps() - 1
                ? "Save and Finish"
                : "Complete Step"}
            </Button>
          ))}
      </Box>
    );
  };
  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  var CurrentForm;
  if (activeStep < steps.length) {
    CurrentForm = steps[activeStep].formComponent;
  } else {
    CurrentForm = null;
  }

  return (
    <Box sx={{ width: "100%", height: "100%", padding: 3 }}>
      <Stepper
        sx={{
          overflow: "hidden",
          backgroundColor: "rgb(238,238,238)",
          padding: "8px",
        }}
        nonLinear
        activeStep={activeStep}
        alternativeLabel
      >
        {steps.map((step, index) => (
          <Step
            key={step.label}
            completed={completed[index]}
            sx={{
              "& .MuiStepLabel-root .Mui-completed": {
                color: "rgb(241,93,34)",
              },
              "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
                {
                  color: "#666666",
                },
              "& .MuiStepLabel-root .Mui-active": {
                color: "rgb(241,93,34)",
              },
              "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel":
                {
                  color: "#666666",
                },
              "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                fill: "white",
              },
            }}
          >
            <StepButton sx={{ color: "#FF0000" }} onClick={handleStep(index)}>
              {step.label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div style={{ height: "calc(100% - 60.016px" }}>
        {allStepsCompleted() ? (
          <React.Fragment>
            {/* <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box> */}
            <ReviewForm />
          </React.Fragment>
        ) : (
          <React.Fragment>
            {/* FORM */}
            <div className="mt-2 mb-1 py-1 w-full h-full">
              <CurrentForm
                LowerPanel={LowerPanelComponent}
                panelControls={{
                  activeStep: activeStep,
                  handleBack: handleBack,
                  handleNext: handleNext,
                  steps: steps,
                  handleComplete: handleComplete,
                  completedSteps: completedSteps,
                  totalSteps: totalSteps,
                }}
              />
            </div>

            {/* LOWER PANEL */}

            {/* <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography
                    variant="caption"
                    sx={{ display: "inline-block" }}
                  >
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? "Finish"
                      : "Complete Step"}
                  </Button>
                ))}
            </Box> */}
          </React.Fragment>
        )}
      </div>
    </Box>
  );
}
