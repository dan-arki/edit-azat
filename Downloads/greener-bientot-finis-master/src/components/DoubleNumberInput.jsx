import React from 'react';
import ContinueButton from './ContinueButton';

const DoubleNumberInput = ({
  state1,
  state2,
  changeHandler1,
  changeHandler2,
  label1,
  label2,
  type1,
  type2,
  unit1,
  unit2,
  placeholder1,
  placeholder2,
  isMobile,
  onSubmit,
  IDKHandler1,
  IDKHandler2,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col items-center w-[60%] mx-auto gap-6"
    >
      <div className="w-full flex flex-col gap-2">
        <p className="text-base font-semibold text-[#1E1D4C] text-left">
          {label1}
        </p>
        <div className="w-full flex items-center bg-[#FCFFFE] h-12 rounded-xl border  px-3 text-base leading-7">
          <input
            autoFocus
            type={type1}
            className="flex-1 h-full bg-[#FCFFFE] rounded-xl outline-none border-none text-[#1E1D4C] placeholder:text-[#C8CCD8]"
            value={state1}
            placeholder={placeholder1}
            onChange={changeHandler1}
          />
          <p className="text-[#1E1D4C]">{unit1}</p>
        </div>
        {IDKHandler1 && (
          <button
            className="text-base ml-auto font-normal cursor-pointer text-[#1E1D4C]"
            onClick={IDKHandler1}
            type="button"
          >
            Je ne sais pas
          </button>
        )}
      </div>
      <div className="w-full flex flex-col gap-2">
        <p className="text-base font-semibold text-[#1E1D4C] text-left">
          {label2}
        </p>
        <div className="w-full flex items-center bg-[#FCFFFE] h-12 rounded-xl border  px-3 text-base leading-7">
          <input
            autoFocus
            type={type2}
            className="flex-1 h-full bg-[#FCFFFE] rounded-xl outline-none border-none text-[#1E1D4C] placeholder:text-[#C8CCD8]"
            value={state2}
            placeholder={placeholder2}
            onChange={changeHandler2}
          />
          <p className="text-[#1E1D4C]">{unit2}</p>
        </div>
        {IDKHandler2 && (
          <button
            className="text-base ml-auto font-normal cursor-pointer text-[#1E1D4C]"
            onClick={IDKHandler2}
            type="button"
          >
            Je ne sais pas
          </button>
        )}
      </div>

      <ContinueButton state1={state1} state2={state2} />
    </form>
  );
};

export default DoubleNumberInput;
