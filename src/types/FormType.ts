type FormHeaderType = {
  id: string;
  name: string;
  description: string;
};

type FormResponseType = {
  id: string;
  formversionId: string;
  patientId: string;
  jsonResponse: object;
};

export type FormType = {
  id: string;
  submodId: string;
  numberVersion: number;
  jsonSchema: object;
  form: FormHeaderType;
  response: FormResponseType;
};
