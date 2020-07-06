// actions
export const user_signed_in = (userData) => {
  return { type: "SIGNED_IN", payload: userData };
};
export const user_signed_out = () => {
  return { type: "SIGNED_OUT" };
};
