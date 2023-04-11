import React from 'react';

interface Props {
  isOpen: boolean;
}

const Hamburger: React.FC<Props> = ({ isOpen }) => {
  return (
    <>
      <div className="hamburger">
        <div className="hamburger__line hamburger__line--line1" />
        <div className="hamburger__line hamburger__line--line2" />
        <div className="hamburger__line hamburger__line--line3" />
      </div>

      <style>{`
                .hamburger{
                    width: 25px;
                    height: 25px;
                    display: flex;
                    flex-flow: column nowrap;

                     justify-content: space-around;
                }
                .hamburger__line {
                    width: 25px;
                    height: 3px;
                    border-radius: 5px;
                    background-color: ${isOpen ? '#fff' : '#242a37'};
                    transform-origin: 1px;
                    transition: all 0.3s linear;
                }

                .hamburger__line--line1{
                    transform: ${isOpen ? 'rotate(45deg)' : 'rotate(0)'};
                }
                .hamburger__line--line2{

                    opacity: ${isOpen ? 0 : 1};
                }
                .hamburger__line--line3{
                    transform: ${isOpen ? 'rotate(-45deg)' : 'rotate(0)'};
                }
            `}</style>
    </>
  );
};

export default Hamburger;
