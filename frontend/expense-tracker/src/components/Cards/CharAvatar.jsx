// components/Avatar/CharAvatar.js
import React from 'react';
import { getInitials } from '../../utils/helper';

const CharAvatar = ({ fullName, width = 'w-12', height = 'h-12', textSize = 'text-base' }) => {
  return (
    <div
      className={`${width} ${height} ${textSize} flex items-center justify-center rounded-full text-gray-900 font-medium bg-gray-100`}
    >
      {getInitials(fullName || '')}
    </div>
  );
};

export default CharAvatar;


