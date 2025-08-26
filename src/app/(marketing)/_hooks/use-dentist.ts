import { useQuery } from "@tanstack/react-query";
import { AppointmentTypeProps } from "../_utils/type";

export type DentistListItem = {
  serviceCode: string;
  serviceName: string;
  dentist: {
    userId: string;
    firstName: string;
    lastName: string;
    profileImage: string;
  };
};

export type DentistListResponse = DentistListItem[];

const fetchDentistList = async (
  serviceCode: AppointmentTypeProps
): Promise<DentistListResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/service/dentist/list`,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        serviceCode,
      }),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch dentists.");
  }
  return response.json();
};

export const useDentist = (serviceCode: AppointmentTypeProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["dentists", serviceCode],
    queryFn: () => fetchDentistList(serviceCode),
    enabled: !!serviceCode,
    staleTime: 5 * 60 * 1000, //5 mins
  });
  return { dentists: data, isLoading, error };
};
