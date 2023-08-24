import { Th } from "@/components/chakra";
import { table_context } from "./provider";
import { useLayoutEffect } from "react";
import { useContext } from "react";

export const TableHeader = ({
  title,
  id,
  columnType,
  textAlign = "center",
  ...props
}) => {
  const { setHeader } = useContext(table_context);

  useLayoutEffect(() => {
    setHeader(id, columnType, textAlign);
  }, []);

  return (
    <Th textAlign={textAlign} {...props}>
      {title}
    </Th>
  );
};
