import React from "react";

type ListAdapterProps<T> = {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor?: (item: T, index: number) => React.Key;
};

function ListAdapter<T>({ data, renderItem, keyExtractor }: ListAdapterProps<T>) {
  return (
    <>
      {data.map((item, index) => (
        <React.Fragment key={keyExtractor ? keyExtractor(item, index) : index}>
          {renderItem(item, index)}
        </React.Fragment>
      ))}
    </>
  );
}

export default ListAdapter;
