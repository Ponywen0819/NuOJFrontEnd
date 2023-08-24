import { createContext, useState, useRef } from "react";
import { TableContainer, SlideFade } from "@/components/chakra";
import { TableLoading } from "./loading";

export const table_context = createContext();

export const TableProvider = ({
  pageSize,
  isLoading,
  Loading = <TableLoading />,
  children,
  ...remain
}) => {
  if (!pageSize) throw new Error("page size is required");
  const columnsRef = useRef([]);
  const [pageIndex, setIndex] = useState(0);
  const [max, setMax] = useState(0);

  const setPage = (selected) => {
    if (selected < 0) {
      setPage(0);
      return;
    }
    if (selected >= max) {
      setPage(max - 1);
      return;
    }

    setIndex(selected);
  };

  const setLength = (len) => {
    setMax(len === 0 ? 0 : Math.ceil(len / pageSize));
  };

  const setOrder = () => {};

  const setHeader = (id, type = "p", textAlign) => {
    columnsRef.current.push({ id, type, textAlign });
  };

  const value = {
    columns: columnsRef.current,
    pageSize,
    pageIndex,
    max,
    setPage,
    setLength,
    setOrder,
    setHeader,
  };

  return (
    <table_context.Provider value={value}>
      <TableContainer {...remain}>
        {isLoading ? Loading : <SlideFade in={true}>{children}</SlideFade>}
      </TableContainer>
    </table_context.Provider>
  );
};
