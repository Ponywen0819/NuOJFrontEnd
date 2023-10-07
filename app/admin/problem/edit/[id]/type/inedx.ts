
export type UploadProp = {
  id: number;
  type: "solution" | "checker" | "testcase";
  label: string;
};

export type Code = {
  language: string;
  content: string;
};