import React, { useState } from "react";

const useHistory = (initivalue: any[]) => {
  const [repository, setRepository] = useState<any[]>(initivalue);
  const [current, setCurrent] = useState<number>(0);

  const setState = (value: any) => {
    let temp = [...repository];
    if (current < temp.length - 1) temp.splice(current + 1);
    setRepository([...temp, value]);
    setCurrent(temp.length);
  };

  const redo = () => {
    if (current === repository.length - 1) return;
    setCurrent(current + 1);
    return repository[current + 1];
  };
  const undo = () => {
    if (current < 1) return;
    setCurrent(current - 1);
    return repository[current - 1];
  };

  return { undo, redo, setState };
};

export default useHistory;
