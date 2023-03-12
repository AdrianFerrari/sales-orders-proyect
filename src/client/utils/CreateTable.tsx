interface dataObject {
  [key: string]: any;
}

function CreateTable({ data, title }: { data: dataObject; title?: string }) {
  const keys = Object.keys(data[0]);
  const headHtml = keys.map((title, i) => (
    <th key={i} className="px-2 py-1 text-left bg-white">
      {title}
    </th>
  ));

  const rowsHtml = data.map((array, i) => {
    const values = Object.values(array);
    const rowsValues = values.map((item: any, i) => (
      <td key={i} className="px-2 py-1">
        {item}
      </td>
    ));

    return (
      <tr key={i} className={i % 2 === 0 ? "bg-gray-200" : "bg-white"}>
        {rowsValues}
      </tr>
    );
  });

  return (
    <table className="border whitespace-nowrap">
      <thead>
        {title && (
          <tr>
            <th className="bg-gray-700 text-white" colSpan={keys.length}>
              {title}
            </th>
          </tr>
        )}
        <tr>{headHtml}</tr>
      </thead>

      <tbody>{rowsHtml}</tbody>
    </table>
  );
}
export default CreateTable;
