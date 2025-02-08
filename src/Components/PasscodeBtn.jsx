import React from 'react';

function PasscodeBtn({ number, onClick }) {
  return (
    <button className='select-none cursor-pointer bg-pink-300 p-3 rounded-lg text-white font-bold' onClick={onClick}>
      {number}
    </button>
  );
}

export default PasscodeBtn;