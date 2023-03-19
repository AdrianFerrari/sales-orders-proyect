interface Conditions {
  [key: string]: Array<string>;
}

export function useQueryTextGenerator(conditions: Conditions) {
  let i = 0;
  let queryHTML: Array<JSX.Element> = [
    <p key={i++}>
      SELECT * FROM invoice_summary
      <br />
    </p>,
  ];
  const conditionsHTML: Array<JSX.Element> = [];
  //condition[1] === column name
  //condition[2] === operator >, < or =
  //condtion[0] === value to compare to
  //ex: sales_person_name = Adrian Ferrari
  for (const condition of Object.values(conditions)) {
    if (condition[0]) {
      conditionsHTML.push(
        <p key={i++}>
          &emsp;{condition[1]} {condition[2]} {condition[0]}
          <br />
        </p>
      );
    }
  }
  if (conditionsHTML.length > 0) {
    queryHTML.push(
      <p key={i++}>
        WHERE
        <br />
      </p>
    );
  }
  queryHTML = queryHTML.concat(conditionsHTML);
  queryHTML.push(
    <p key={i++}>
      ORDER BY random() LIMIT 30;
      <br />
    </p>
  );

  return queryHTML;
}
