const dateTransformer = (dateString) => {
  const currentTime = new Date(dateString);
  return `${currentTime.toLocaleDateString()} ${currentTime.toLocaleTimeString()}`;
};

module.exports = { dateTransformer };
