export const useAnimation = (id, status, setClosing, setOpening, setTasks) => {
  const handleAnimationOpening = (id) => {
    setClosing((val) => {
      let closingArray = [...val];
      closingArray.splice(
        val.findIndex((i) => i === id),
        1,
      );
      return [...closingArray];
    });
    setOpening((val) => [...val, id]);
    setTimeout(() => {
      setOpening((val) => {
        let openingArray = [...val];
        openingArray.splice(
          val.findIndex((i) => i === id),
          1,
        );
        return [...openingArray];
      });
    }, 300);
  };

  const handleAnimationClosing = (id, status) => {
    setClosing((val) => [...val, id]);
    setTimeout(() => {
      setTasks((val) => {
        let taskArray = [...val];
        const index = taskArray.findIndex((t) => t.id === id);
        let t = taskArray[index];
        t.status = status;
        taskArray[index] = t;
        return [...taskArray];
      });
      handleAnimationOpening(id);
    }, 300);
  };

  handleAnimationClosing(id, status);
};
