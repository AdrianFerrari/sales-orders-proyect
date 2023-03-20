import { useState } from "react";

interface Conditions {
  [key: string]: Array<string>;
}

export function useQueryState() {
  const [query, setQuery] = useState("/invoices");
  const [conditions, setConditions] = useState<Conditions>({
    sname: ["", "", ""],
    cname: ["", "", ""],
    ti: ["", "", ""],
    tf: ["", "", ""],
    tgt: ["", "", ""],
    tlt: ["", "", ""],
  });
  const handlers = {
    handleInput: (event: any) => {
      const value = event.target.value;
      const name = event.target.name;
      const columnname = event.target.dataset.columnname;
      const operator = event.target.dataset.operator;
      setConditions((prevState) => ({ ...prevState, [name]: [value, columnname, operator] }));
    },
    handleSubmit: (event: any) => {
      event.preventDefault();
      const queryArray: Array<string> = ["/invoices/?"];
      const conditionsArray: Array<string> = [];
      for (const [key, value] of Object.entries(conditions)) {
        if (value[0]) conditionsArray.push(`${key}=${value[0]}`);
      }
      const queryText = queryArray.concat(conditionsArray.join("&")).join("");
      setQuery(queryText);
    },
  };
  return { query, conditions, handlers };
}
