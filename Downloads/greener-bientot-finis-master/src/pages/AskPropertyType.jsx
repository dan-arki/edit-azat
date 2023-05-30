import React from 'react';
import useCheckMobileScreen from '../util/useCheckMobileScreen';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import MobileRectangleOption from '../components/MobileRectangleOption';
import MobileLayout from '../layouts/MobileLayout';

const AskPropertyType = () => {
  const [propertyType, setPropertyType] = React.useState('');

  const startTime = new Date().toLocaleTimeString();
  localStorage.setItem('startTime', startTime);

  const isMobile = useCheckMobileScreen();

  let navigate = useNavigate();

  React.useEffect(() => {
    if (propertyType && !isMobile) {
      return navigate('/time');
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propertyType]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (propertyType && isMobile) {
      return navigate('/time');
    }
  };

  if (isMobile)
    return (
      <MobileLayout
        disabled={!propertyType}
        progress="1%"
        question="Les aides concernent-elles une maison ou un appartement?"
        onSubmit={submitHandler}
      >
        <MobileRectangleOption
          img="./assets/mobile/appartment1.svg"
          text="Une maison"
          onClick={() => {
            setPropertyType('maison');
            localStorage.setItem('propertyType', 'maison');
          }}
          selected={propertyType === 'maison'}
        />
        <MobileRectangleOption
          img="./assets/mobile/appartment2.svg"
          text="Un apprtement"
          onClick={() => {
            setPropertyType('appartement');
            localStorage.setItem('propertyType', 'appartement');
          }}
          selected={propertyType === 'appartement'}
        />
      </MobileLayout>
    );

  return (
    <div className="flex flex-col h-screen">
      <Navbar one />
      <div className="flex-1 flex flex-col gap-4 w-full px-16 pt-6 pb-4 ">
        <div className="flex items-center gap-3">
          <Arrow />
          <p className="text-xl text-[#1E1D4C] font-medium ">Retour</p>
        </div>
        <div className="w-full flex items-center justify-start h-4 mb-4 bg-[#FCFFFE] rounded-full">
          <div
            className="h-3 bg-[#8DD9DE] rounded-full m-1 shadow-bar"
            style={{ width: '1%' }}
          ></div>
        </div>

        <section className="flex-1 flex flex-col items-center">
          <h1 className="font-semibold text-2xl text-[#1E1D4C] py-6">
            Votre projet concerne:
          </h1>
          <div className="flex xl:gap-28 gap-6 items-center justify-center">
            <div
              className="py-5 px-3 flex bg-white flex-col items-center w-52 h-48 border border-[#C8CCD8] rounded-[30px] justify-center gap-2 cursor-pointer hover:border-[#18808A] hover:shadow-lg transition-all"
              onClick={() => {
                setPropertyType('maison');
                localStorage.setItem('propertyType', 'maison');
              }}
            >
              <div className="w-[125px] h-[125px] flex items-center justify-center">
                <img src={'./assets/maison.png'} alt="Maison" />
              </div>
              <p className="text-[#999BA3] font-semibold text-xl">Maison</p>
            </div>
            <div
              className="py-5 px-3 flex bg-white flex-col items-center w-52 h-48 border border-[#C8CCD8] rounded-[30px] justify-center gap-2 cursor-pointer hover:border-[#18808A] hover:shadow-lg transition-all"
              onClick={() => {
                setPropertyType('appartement');
                localStorage.setItem('propertyType', 'appartement');
              }}
            >
              <div className="w-[125px] h-[125px] flex items-center justify-center">
                <img src={'./assets/appartement.png'} alt="Appartement" />
              </div>
              <p className="text-[#999BA3] font-semibold text-xl">
                Appartement
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AskPropertyType;

export const Arrow = () => {};
