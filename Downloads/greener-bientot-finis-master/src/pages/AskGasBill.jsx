import React from 'react';
import { useNavigate } from 'react-router-dom';
import useCheckMobileScreen from '../util/useCheckMobileScreen';
import NumberInput from '../components/NumberInput';
import { Arrow } from './AskPropertyType';
import Navbar from '../components/Navbar';
import { generateHeatEnergyURLstring } from '../util/generateURLstring';
import MobileLayout from '../layouts/MobileLayout';

const AskgasBill = () => {
  const isMobile = useCheckMobileScreen();
  const [gasBill, setGasBill] = React.useState('');
  const navigate = useNavigate();
  const url = generateHeatEnergyURLstring();

  const changeHandler = (e) => {
    setGasBill(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('gasBill', gasBill);
    navigate(url);
  };
  const IDKHandler = () => {
    setGasBill('NILL');
    localStorage.setItem('gasBill', 'NILL');
    navigate(url);
  };

  if (isMobile)
    return (
      <MobileLayout
        disabled={!gasBill}
        progress="25%"
        question="Quelle est le montant de votre facture de gaz ?"
        onSubmit={onSubmit}
      >
        <div className="mt-12">
          <NumberInput
            isMobile={isMobile}
            state={gasBill}
            changeHandler={changeHandler}
            IDKHandler={IDKHandler}
            nextNav="/heatenergy"
            label={'Montant par mois'}
            placeholder="Exemple: 60 €"
            unit="€/mois"
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
              style={{ width: '25%' }}
            ></div>
          </div>

          <section className="flex-1 flex flex-col items-center">
            <h1 className="font-semibold text-2xl text-[#1E1D4C] py-6">
              Quelle est le montant de votre facture de gaz ?
            </h1>

            <NumberInput
              isMobile={isMobile}
              state={gasBill}
              changeHandler={changeHandler}
              onSubmit={onSubmit}
              IDKHandler={IDKHandler}
              nextNav="/goals"
              label={'Montant par mois'}
              placeholder="Exemple: 60 €"
              unit="€/mois"
            />
          </section>
        </div>
         </div>
      </div>
    </>
  );
};

export default AskgasBill;
