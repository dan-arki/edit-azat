import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeatEnergyItem from '../components/HeatEnergyItem';
import useCheckMobileScreen from '../util/useCheckMobileScreen';
import Navbar from '../components/Navbar';
import { Arrow } from './AskPropertyType';
import MobileLayout from '../layouts/MobileLayout';
import MobileHeatEnergy from '../components/MobileHeatEnergy';

const AskGasEquipment = () => {
  const isMobile = useCheckMobileScreen();
  const [gasEquipment, setGasEquipment] = React.useState('');
  // const [gasEquipment, setGasEquipment] = React.useState(
  //   localStorage.getItem("gasEquipment")
  // );

  const setSelected = (number) => {
    setGasEquipment(number);
    localStorage.setItem('gasEquipment', number);
  };

  let navigate = useNavigate();
  React.useEffect(() => {
    if (gasEquipment && !isMobile) {
      navigate('/gasbill' + window.location.search);
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gasEquipment]);

  const submitHandler = (e) => {
    e.preventDefault();

    navigate('/gasbill' + window.location.search);
  };

  if (isMobile)
    return (
      <MobileLayout
        disabled={gasEquipment === ''}
        progress="20%"
        question="Quel type d’équipement au gaz est installé?"
        onSubmit={submitHandler}
        house
      >
        <div className="grid grid-cols-2 gap-4">
          <MobileHeatEnergy
            icon={'./assets/mobile/gas1.png'}
            text={'Chaudière à condensation'}
            number={'1'}
            selected={gasEquipment === '1'}
            setSelected={setSelected}
          />
          <MobileHeatEnergy
            icon={'./assets/mobile/gas2.png'}
            text={"Autre qu'à condensation"}
            number={'2'}
            selected={gasEquipment === '2'}
            setSelected={setSelected}
          />
          <MobileHeatEnergy
            icon={'./assets/mobile/gas3.png'}
            text={'Radiateur gaz'}
            number={'3'}
            selected={gasEquipment === '3'}
            setSelected={setSelected}
          />
          <MobileHeatEnergy
            icon={'./assets/mobile/gas4.png'}
            text={'Poêle au gaz'}
            number={'4'}
            selected={gasEquipment === '4'}
            setSelected={setSelected}
          />
        </div>
      </MobileLayout>
    );

  return (
    <>
      <div className="flex flex-col h-screen ">
        <Navbar one two />
         <div className="flex h-full">
          {/* LEFT */}
          <div className="w-[30%] bg-[#FCFFFE] h-full flex items-center justify-center shadow-2xl">
            <img src="/assets/home3d.png" alt="" />
          </div>
        <div className="flex-1 flex flex-col gap-4 w-full px-16 pt-6 pb-4 ">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-3"
          >
            <Arrow />
            <p className="text-xl text-[#1E1D4C] font-medium ">Retour</p>
          </button>
          <div className="w-full flex items-center justify-start h-4 mb-4 bg-[#FCFFFE] rounded-full">
            <div
              className="h-3 bg-[#8DD9DE] rounded-full m-1 shadow-bar"
              style={{ width: '20%' }}
            ></div>
          </div>

          <div className="flex-1 flex flex-col items-center">
            <h1 className="font-semibold text-2xl text-[#1E1D4C] py-6">
              Quel type d'équipement au gaz est installé ?
            </h1>

            <div className="grid grid-cols-2 gap-6">
              <HeatEnergyItem
                icon={'./assets/gas1.png'}
                text={'Chaudière à condensation'}
                number={'1'}
                selected={gasEquipment === '1'}
                setSelected={setSelected}
                isMobile={isMobile}
                mobileSize={'h-36 w-40'}
                // size={isMobile ? 'w-20 h-14' : 'w-14 h-20'}
              />
              <HeatEnergyItem
                icon={'./assets/gas2.png'}
                text={'Autre qu’à condensation'}
                number={'2'}
                selected={gasEquipment === '2'}
                setSelected={setSelected}
                isMobile={isMobile}
                mobileSize={'h-36 w-40'}
                // size={isMobile ? 'w-20 h-14' : 'w-20 h-20'}
              />
              <HeatEnergyItem
                icon={'./assets/gas3.png'}
                text={'Radiateur gaz'}
                number={'3'}
                selected={gasEquipment === '3'}
                setSelected={setSelected}
                isMobile={isMobile}
                mobileSize={'h-36 w-40'}
                // size={isMobile ? 'w-20 h-14' : 'w-20 h-20'}
              />
              <HeatEnergyItem
                icon={'./assets/gas4.png'}
                text={'Poêle au gaz'}
                number={'3'}
                selected={gasEquipment === '3'}
                setSelected={setSelected}
                isMobile={isMobile}
                mobileSize={'h-36 w-40'}
                // size={isMobile ? 'w-20 h-14' : 'w-20 h-20'}
              />
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default AskGasEquipment;
