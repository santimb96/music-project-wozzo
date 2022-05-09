const sortItems = (list) => {
  return list.sort((a, b) =>
    a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase() ? 1 : -1
  );
};

export default sortItems;