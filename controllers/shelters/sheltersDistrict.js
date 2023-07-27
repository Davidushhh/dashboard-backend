const { getRowCount } = require("../../helpers/getRowCount");

const sheltersDistrict = async (req, res) => {
  const { district } = req.params;

  try {
    const okSheltersCount = await getRowCount(
      `SELECT * FROM zaktable_copy WHERE district LIKE '%${district}%' AND okay = 'придатна' AND bezpereshkodnyi = 'так'`
    );

    const nedostupniCount = await getRowCount(
      `SELECT * FROM zaktable_copy WHERE district LIKE '%${district}%' AND okay = 'непридатна' AND bezpereshkodnyi = 'так'`
    );

    const nebezpereshkodniCount = await getRowCount(
      `SELECT * FROM zaktable_copy WHERE district LIKE '%${district}%' AND okay = 'придатна' AND bezpereshkodnyi = 'ні'`
    );

    const notGoodCount = await getRowCount(
      `SELECT * FROM zaktable_copy WHERE district LIKE '%${district}%' AND okay = 'непридатна' AND bezpereshkodnyi = 'ні'`
    );

    const notCheckedCount = await getRowCount(
      `SELECT * FROM zaktable_copy WHERE district LIKE '%${district}%' AND okay = '' AND bezpereshkodnyi = ''`
    );

    const finalArr = [
      okSheltersCount.length,
      nedostupniCount.length,
      nebezpereshkodniCount.length,
      notGoodCount.length,
      notCheckedCount.length,
    ];

    return res.status(200).json({
      message: "Shelters by district",
      code: 200,
      data: finalArr,
    });
  } catch (err) {
    return res.status(404).json({
      message: "Not found",
      code: 404,
      data: err,
    });
  }
};

module.exports = { sheltersDistrict };
