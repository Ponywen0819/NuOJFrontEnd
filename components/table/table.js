import { createContext, useState } from "react";

export const table_context = createContext(null);

export const Table = ({
  children,
  borderWidth = "2px",
  borderColor = "#E2E8F0",
  borderRadius = "0.5rem",
  width = "100%",
  height = "100%",
}) => {
  const [widths, setWidths] = useState([]);
  const [order, setOrder] = useState(null);
  const [index, setIndex] = useState(0);
  const [max, setMax] = useState(0);

  const updateData = (new_data) => {
    setDatas(new_data);
  };

  const updateWidth = (raw) => {
    const { remain, count } = raw.reduce(
      (a, c) => {
        const { remain, count } = a;
        const num = parseInt(c.slice(0, -1));
        return { remain: remain - num, count: num ? count : count + 1 };
      },
      { remain: 100, count: 0 },
    );
    const defaultWidth = `${Math.round(remain / count)}%`;

    setWidths(
      raw.map((element) => {
        if (element === "0%") {
          return defaultWidth;
        } else {
          return element;
        }
      }),
    );
  };

  const updateOrder = (new_index) => {
    if (order) {
      if (order.index === new_index) {
        setOrder((old) => ({ index: new_index, ascending: !old.ascending }));
      } else {
        setOrder(null);
      }
    } else {
      setOrder({ index: new_index, ascending: false });
    }
  };

  const updateMax = (new_val) => {
    setMax(new_val);
  };

  const updateIndex = (new_index) => {
    setIndex(new_index);
  };

  const context = {
    updateData,
    updateWidth,
    updateOrder,
    updateMax,
    updateIndex,
    widths,
    order,
    index,
    max,
  };

  return (
    <table_context.Provider value={context}>
      <div
        role="table"
        className="overflow-x-hidden divide-y"
        style={{
          borderWidth,
          borderColor,
          borderRadius,
          width,
          height,
        }}
      >
        {children}
      </div>
    </table_context.Provider>
  );
};
