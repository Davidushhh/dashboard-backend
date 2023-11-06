const getRecieverNameTemplete = (
  recieverLevel,
  recieverDistrict,
  recieverHromada
) => {
  if (recieverLevel === "oda") {
    return "Закарпатська обласна рада";
  }

  if (recieverLevel === "district" && recieverDistrict) {
    return `${recieverDistrict.slice(0, -2) + "а"} районна рада`;
  }

  if (recieverLevel === "hromada" && recieverHromada) {
    return `${recieverHromada} громада`;
  }
};

module.exports = { getRecieverNameTemplete };
