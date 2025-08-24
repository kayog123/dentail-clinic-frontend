"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import Step1UserDetails from "./step-1-user-details";
import Step2Insurance from "./step-2-insurance";
import Step3Preferences from "./step-3-preferences";
import Step4Appointments from "./step-4-appointments";
import { Check, Circle } from "lucide-react";

const steps = [
  { id: 1, title: "Patient Information", description: "Basic details" },
  { id: 2, title: "Insurance", description: "Dental insurance info" },
  { id: 3, title: "Preferences", description: "Appointment preferences" },
  { id: 4, title: "Book Appointment", description: "Select time slot" },
];

export default function BookingWizard() {
  const { currentStep } = useSelector((state: RootState) => state.booking);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1UserDetails />;
      case 2:
        return <Step2Insurance />;
      case 3:
        return <Step3Preferences />;
      case 4:
        return <Step4Appointments />;
      default:
        return <Step1UserDetails />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-12 p-8 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-8 text-center">
        Book an Appointment
      </h2>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    currentStep > step.id
                      ? "bg-blue-600 border-blue-600 text-white"
                      : currentStep === step.id
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "bg-white border-gray-300 text-gray-500"
                  }`}
                >
                  {currentStep > step.id ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-medium">{step.id}</span>
                  )}
                </div>
                <div className="mt-2 text-center">
                  <p className="text-xs font-medium text-gray-900">
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-4 ${
                    currentStep > step.id ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="min-h-[500px]">{renderStep()}</div>

      {/* Step Indicator */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          Step {currentStep} of {steps.length}
        </p>
      </div>
    </div>
  );
}
