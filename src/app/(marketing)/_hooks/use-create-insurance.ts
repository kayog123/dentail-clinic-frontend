import { useMutation } from "@tanstack/react-query";
import { getError } from "@/app/lib/error";

interface CreateInsuranceParams {
  userId: string;
  insuranceName: string;
  insuranceGroupNumber: string;
  subscriberId: string;
  subscriberName: string;
}

export type CreateInsuranceTypeResponse = CreateInsuranceParams & {
  id: number;
  createdAt: string;
  updatedAt: string;
};

const createInsuranceFn = async (
  data: CreateInsuranceParams
): Promise<CreateInsuranceTypeResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/insurance/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch dentists.");
  }
  return response.json();
};

export type OnSuccessCallbackParams = (
  data: CreateInsuranceTypeResponse
) => Promise<void>;

export function useCreateInsurance(onSuccessCb: OnSuccessCallbackParams) {
  return useMutation({
    mutationFn: createInsuranceFn,
    onSuccess: onSuccessCb,
    onError: (error: unknown) => {
      console.error("Failed to delete appointment:", getError(error).message);
      // TODO: Show error toast
    },
  });
}
