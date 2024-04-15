export const renderTaskTypeIcon = (taskType) => {
  {
    switch (taskType) {
      case 1:
        return <i className="fa-solid fa-bug text-danger"></i>;
      case 2:
        return <i className="fa fa-bookmark text-success"></i>;
    }
  }
};
