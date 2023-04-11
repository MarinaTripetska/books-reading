import { useEffect, useState } from 'react';

function getViewportSizes() {
  const { innerWidth, innerHeight } = window;
  return {
    innerWidth,
    innerHeight,
  };
}

export default function useViewportSizes() {
  const [viewportSizes, setViewportSizes] = useState(getViewportSizes());

  useEffect(() => {
    const handleResizeIndx = () => {
      setViewportSizes(getViewportSizes());
    };

    window.addEventListener('resize', handleResizeIndx);
    return () => window.removeEventListener('resize', handleResizeIndx);
  }, []);

  return viewportSizes;
}
