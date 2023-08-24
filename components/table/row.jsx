import { Tr, Td } from "@/components/chakra";
import { useContext, createElement } from "react";
import { table_context } from "./provider";

export const TableRow = ({ data, index }) => {
  const { columns } = useContext(table_context);

  return (
    <Tr key={data}>
      {columns.map(({ id, type, textAlign }) => (
        <Cell
          key={`${index}-${id}`}
          data={data[id]}
          type={type}
          align={textAlign}
        />
      ))}
    </Tr>
  );
};

const Cell = ({ data, type, align }) => {
  const isString = typeof data === "string";
  if (isString) {
    return <Td textAlign={align}>{data}</Td>;
  }

  const { children, ...props } = data;
  return <Td textAlign={align}>{createElement(type, props, children)}</Td>;
};
