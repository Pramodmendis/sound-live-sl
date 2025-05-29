import { useEffect } from "react";

const usePageTitle = (title) => {
  useEffect(() => {
    document.title = `${title} | Sound Live`;
  }, [title]);
};

export default usePageTitle;
