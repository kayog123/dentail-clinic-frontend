export const throwError = (error: unknown, message?: string) => {
  const errorMessage = message ?? "An error occured.";

  if (typeof error === "string") throw new Error(error || message);
  else if (error instanceof Error)
    throw error.message ? error : new Error(errorMessage);
  else throw new Error(errorMessage);
};

export const getError = (error: unknown, message?: string) => {
  const errorMessage = message ?? "An error occured.";

  if (typeof error === "string") return new Error(error || message);
  else if (error instanceof Error)
    return error.message ? error : new Error(errorMessage);
  else return new Error(errorMessage);
};
