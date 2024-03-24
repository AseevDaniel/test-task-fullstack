export const REG_EXP = {
  EMAIL: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
  NUMBER_EXIST: /[0-9]/,
  SPECIAL_SYMBOL_RIGH_PALCE:
    /^(?!.*[^\na-z0-9]{2})(?=.*[a-z0-9]$)[a-z0-9].*$/im,
  SPECIAL_SYMBOL_EXIST: /[ `№!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/,
};
