import { Tbody } from "@/components/chakra";
import { table_context } from "./provider";
import { TableRow } from "./row";
import { useContext } from "react";
import { useEffect } from "react";

export const TableBody = ({ datas }) => {
  const { pageSize, pageIndex, setLength } = useContext(table_context);

  useEffect(() => {
    setLength(datas.length);
  }, [datas]);

  const slicedDatas = datas.slice(pageIndex, pageIndex + pageSize);

  return (
    <Tbody>
      {slicedDatas.map((data, i) => (
        <TableRow key={i} index={i} data={data} />
      ))}
    </Tbody>
  );
};
