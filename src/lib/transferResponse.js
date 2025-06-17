export const transferErrorResponse = (response) => {
  const error = response?.data?.err || "Something went wrong";
  return response || error;
};
