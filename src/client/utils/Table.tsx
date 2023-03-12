import { useQuery } from "react-query";
import CreateTable from "./CreateTable";

interface dataObject {
  [key: string]: any;
}

function Table({ getFunction, title }) {
  const { isLoading, data, isError, error } = useQuery<Array<dataObject>, Error>({
    queryKey: [title],
    queryFn: getFunction,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) throw new Error(error.message);
  if (!data) throw new Error("No Data!");

  return <CreateTable data={data} title={title} />;
}

export default Table;
