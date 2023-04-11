import React from 'react';
import { createPortal } from 'react-dom';

function createWrapper(id: string) {
  const element = document.createElement('div');
  element.setAttribute('id', id);
  document.body.appendChild(element);
  return element;
}

interface Props {
  children: JSX.Element | JSX.Element[];
  wrapperId?: string;
}

const Portal: React.FC<Props> = ({ children, wrapperId = 'react-portal' }) => {
  let element = document.getElementById(wrapperId);

  if (!element) {
    element = createWrapper(wrapperId);
  }

  return createPortal(children, element);
};

export default Portal;
