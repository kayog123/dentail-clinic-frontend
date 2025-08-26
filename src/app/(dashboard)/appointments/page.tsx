"use client";

import Step1UserDetails from "@/app/(marketing)/_components/booking-wizard/step-1-user-details";
import Step2Insurance from "@/app/(marketing)/_components/booking-wizard/step-2-insurance";
import Step3Preferences from "@/app/(marketing)/_components/booking-wizard/step-3-preferences";
import Step4Appointments from "@/app/(marketing)/_components/booking-wizard/step-4-appointments";
import WizardStepHeader from "@/app/(marketing)/_components/booking-wizard/wizard-step-hearder";
import { WIZARD_STEPS } from "@/app/(marketing)/_utils/const";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

import { RootState } from "@/app/store";
import { useSelector } from "react-redux";

export default function Appointments() {
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
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
          <p className="text-muted-foreground">Manage your appointment here</p>
        </div>
      </div>

      {/* Profile Form */}
      <Card className="w-[50%]">
        <CardHeader>
          <CardTitle className="text-xl">Personal Information</CardTitle>
          <CardDescription>Create your next dental appointment</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex gap-x-4 flex-col">
            <WizardStepHeader currentStep={currentStep} />
            <div className="min-h-[400px] 00">{renderStep()}</div>
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Step {currentStep} of {WIZARD_STEPS.length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
