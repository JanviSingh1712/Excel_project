import History from "../models/History.js";

export const processExcel = async (req, res) => {
  try {
    const { formula, column, lookupValue, fileName, fileData } = req.body;

    if (!fileData || !Array.isArray(fileData))
      return res.status(400).json({ error: "Invalid file data" });

    let result = null;

    switch (formula) {
      case "sum":
        result = fileData.reduce((t, r) => {
          const v = Number(r[column]);
          return isNaN(v) ? t : t + v;
        }, 0);
        break;

      case "average":
        const nums = fileData
          .map((r) => Number(r[column]))
          .filter((v) => !isNaN(v));
        result = nums.reduce((a, b) => a + b, 0) / nums.length;
        break;

      case "max":
        result = Math.max(
          ...fileData.map((r) => Number(r[column])).filter((v) => !isNaN(v))
        );
        break;

      case "min":
        result = Math.min(
          ...fileData.map((r) => Number(r[column])).filter((v) => !isNaN(v))
        );
        break;

      case "count":
        result = fileData.length;
        break;

      case "countif":
        result = fileData.filter((r) => {
          try {
            return eval(`${Number(r[column])}${lookupValue}`);
          } catch {
            return false;
          }
        }).length;
        break;

      case "vlookup":
        result =
          fileData.find((r) => String(r[column]) === String(lookupValue)) ||
          "Not found";
        break;

      case "match":
        const index = fileData.findIndex(
          (r) => String(r[column]) === String(lookupValue)
        );
        result = index === -1 ? "Not found" : index + 1;
        break;

      case "cell":
        const i = parseInt(lookupValue);
        result = fileData[i]?.[column] ?? "Invalid row number";
        break;

      default:
        result = "Unknown formula";
    }

    await History.create({
      userId: req.user.id,
      fileName,
      formula,
      column,
      lookupValue,
      result,
    });

    res.json({ result });
  } catch (err) {
    console.error("PROCESS ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getHistory = async (req, res) => {
  try {
    const data = await History.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch history" });
  }
};
