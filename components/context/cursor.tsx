import React, { createContext, FC, useState } from 'react';

export type CursorLookType =
  | 'slider-hover'
  | 'slider-drag'
  | 'none'
  | 'link'
  | 'hamburger'
  | 'default';
export type CustomCursorType = {
  type: CursorLookType;
  setType: (type: CursorLookType) => void;
};
export const CustomCursorContext = createContext<CustomCursorType>({
  type: 'default',
  setType: () => undefined,
});

const CustomCursorProvider: FC = ({ children }) => {
  const [type, setType] = useState<CursorLookType>('default');

  return (
    <CustomCursorContext.Provider value={{ type, setType }}>
      {children}
    </CustomCursorContext.Provider>
  );
};

export default CustomCursorProvider;
