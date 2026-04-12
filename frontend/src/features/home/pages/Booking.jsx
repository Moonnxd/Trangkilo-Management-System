import * as React from "react"
import Box from "@mui/material/Box"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepButton from "@mui/material/StepButton"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import axios from "axios"

import FirstStep from "@/features/home/components/booking/BookingFirstStep.jsx"
import SecondStep from "@/features/home/components/booking/BookingSecondStep.jsx"
import ThirdStep from "@/features/home/components/booking/BookingThirdStep.jsx"
import FourthStep from "@/features/home/components/booking/BookingFourthStep.jsx"
import Location from "@/features/home/components/booking/Location.jsx"
// import Toggle from "@/components/ui/mode-toggle.jsx"
import SelectService from "@/features/home/components/booking/SelectService"

import { useState } from "react"

const steps = [
  "Location, Date & Time",
  "Services",
  "Confirmation",
]

export default function HorizontalNonLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0)
  const [completed, setCompleted] = React.useState({})
  const [bookChoice, showChoices] = useState(true)
  const [serviceType, setServiceType] = useState("")

  const [formData, setFormData] = useState({
    serviceType: "",
    branch: "",
    therapist_type: "",
    therapist_id: "",
    date: "",
    time: "",
    services: [],
    customer: {
      firstName: "",
      lastName: "",
      mobile: "",
      email: "",
      gender: ""
    },
    location: {
      province: "Camarines Sur",
      city: "Naga City",
      barangay: "",
      houseNumber: "",
      zone: "",
      street: "",
      hotelName: "",
      roomNumber: "",
      landmark: "",
      note: ""
    }
  })

  const totalSteps = () => steps.length
  const completedSteps = () => Object.keys(completed).length
  const isLastStep = () => activeStep === totalSteps() - 1
  const allStepsCompleted = () => completedSteps() === totalSteps()

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1
    setActiveStep(newActiveStep)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleStep = (step) => () => {
    setActiveStep(step)
  }

  const handleComplete = async () => {
      if (activeStep === 0) {
      if (
        !formData.branch ||
        !formData.date ||
        !formData.time
      ) {
        alert("Please complete all required fields in Step 1")
        return
      }
    }

    if (activeStep === 1) {
      if (formData.services.length === 0) {
        alert("Please select at least one service")
        return
      }
    }

    if (activeStep === 2) {
      if (
        !formData.customer.firstName ||
        !formData.customer.lastName ||
        !formData.customer.mobile ||
        !formData.customer.email ||
        !formData.customer.gender
      ) {
        alert("Please complete customer information")
        return
      }
    }


    const updatedCompleted = {
      ...completed,
      [activeStep]: true,
    }

    setCompleted(updatedCompleted)

    console.log("FORM DATA:", formData)

    if (activeStep === steps.length - 1) {
      try {
        const finalData = {
          ...formData,
          serviceType
        }

        console.log("Submitting:", finalData)

        const response = await axios.post("http://localhost:5000/booking", finalData)

        console.log(response.data);
      } catch (err) {
        console.error("ERROR:", err)
      }
    }

    handleNext()
  }

  const handleReset = () => {
    setActiveStep(0)
    setCompleted({})
  }

  return (
    <div className="
    lg:mx-[10%] 
    xl:mx-[10%] xl:mt-[2%]
    2xl:mx-[10%] 2xl:mt-[2%] 2xl:p-5">

      {bookChoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <SelectService 
            setServiceType={(type) => {
              setServiceType(type)

              
              setFormData(prev => ({
                ...prev,
                serviceType: type
              }))
            }} 
            close={() => showChoices(false)} 
          />
        </div>
      )}

      {/* <Toggle /> */}

      <Box className="pt-5" sx={{ width: "100%" }}>
        
        <Stepper className="p-2 2xl:p-5" nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>

        <div>
          {allStepsCompleted() ? (
            <React.Fragment>
              <FourthStep />

              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>

              {activeStep === 0 && (
                <>
                  <Location 
                    serviceType={serviceType}
                    formData={formData}
                    setFormData={setFormData}
                  />
                  <FirstStep 
                    formData={formData}
                    setFormData={setFormData}
                  />
                </>
              )}

              {activeStep === 1 && (
                <SecondStep 
                  formData={formData}
                  setFormData={setFormData}
                />
              )}

              {activeStep === 2 && (
                <ThirdStep 
                  formData={formData}
                  setFormData={setFormData}
                />
              )}


              <Box
                className="border"
                sx={{ display: "flex", flexDirection: "row", pt: 2 }}
              >
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>

                <Box sx={{ flex: "1 1 auto" }} />

                {activeStep !== steps.length &&
                  (completed[activeStep] ? (
                    <Typography variant="caption">
                      Step {activeStep + 1} already completed
                    </Typography>
                  ) : (
                    <Button onClick={handleComplete}>
                      {completedSteps() === totalSteps() - 1
                        ? "Finish"
                        : "Next"}
                    </Button>
                  ))}
              </Box>

            </React.Fragment>
          )}
        </div>
      </Box>
    </div>
  )
}