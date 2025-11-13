export const defaultValuesPatient = (responsible: boolean) => ({
  address: "",
  zone: "",
  city: "",
  homePhone: "",
  occupation: "",
  placeOccupation: "",
  sender: "",
  nit: "",
  person: {
    name: "",
    lastName: "",
    birthDate: "",
    sex: "",
    profession: "",
    phone: "",
    ci: "",
    email: "",
  },
  responsible: responsible
    ? {
        parentage: "",
        person: {
          name: "",
          lastName: "",
          birthDate: "",
          sex: "",
          profession: "",
          phone: "",
          ci: "",
          email: "",
        },
      }
    : null,
});
