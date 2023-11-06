function queryFilterFormater(query, filter) {
  if (filter) {
    filter = JSON.parse(filter);
    const filterArr = Object.entries(filter);

    const querySplit = query.split(" ");

    const filteredQuery = querySplit.map((item, index) => {
      let transformedFilter = "";
      if (item === "filterVar") {
        let firstOperator = "WHERE ";

        for (let i = index; i >= 0; i--) {
          if (
            querySplit[i].toLowerCase() === "where" ||
            querySplit[i].toLowerCase() === "and" ||
            querySplit[i].toLowerCase() === "or"
          ) {
            firstOperator = `AND `;
            break;
          }
          if (querySplit[i].toLowerCase() === "from") {
            firstOperator = `WHERE `;
            break;
          }
        }

        filterArr.forEach((item, index) => {
          if (index === 0) {
            transformedFilter += `${firstOperator}${item[0]} = '${item[1]}'`;
          } else {
            transformedFilter += ` AND ${item[0]} = '${item[1]}'`;
          }
        });
        return transformedFilter;
      } else {
        return item;
      }
    });

    query = filteredQuery.join(" ");
  } else {
    const querySplit = query.split("filterVar");
    query = querySplit.join("");
  }
  return query;
}

module.exports = { queryFilterFormater };
