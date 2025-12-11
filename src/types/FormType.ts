type FormHeaderType = {
  id: string;
  name: string;
  description: string;
};

export type FormType = {
  id: string;
  submodId: string;
  numberVersion: number;
  jsonSchema: object;
  form: FormHeaderType;
};
