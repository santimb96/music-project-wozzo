const detectedError = (err, res) => {
  if (err?.message) {
    return res.status(404).send({ error: err?.message });
  }
  return res.status(404).send({ error: "No encontrado" });
};

module.exports = detectedError;
