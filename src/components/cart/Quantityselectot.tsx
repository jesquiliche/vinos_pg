'use client';

import { useState } from 'react';
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5';

interface Props {
  cantidad: number;
  onCantidadChanged: (value: number) => void; 
}

export const QuantitySelector = ({ cantidad, onCantidadChanged }: Props) => {
  const [count, setCount] = useState(cantidad);

  const onValueChanged = (value: number) => {
    const newCount = count + value;
    if (newCount < 1) return;

    setCount(newCount);
    onCantidadChanged(newCount); // Notificar al padre sobre el cambio de cantidad
  };

  return (
    <div className="py-1 px-2 w-10/12 flex items-center justify-between mx-auto">
      <button onClick={() => onValueChanged(-1)}>
        <IoRemoveCircleOutline size={30} />
      </button>

      <span className="w-20 mx-3 px-5 bg-gray-100 text-center rounded">
        {count}
      </span>

      <button onClick={() => onValueChanged(+1)}>
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  );
};
