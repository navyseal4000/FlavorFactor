import React from 'react';

type IconProps = {
  name: string;
  size?: number;
  color?: string;
  style?: React.CSSProperties;
};

function createIcon(displayName: string) {
  const IconComponent = ({ name, size = 24, color = '#000000', style }: IconProps) => (
    <span style={{ display: 'inline-block', fontSize: size, color, ...style }}>{`${displayName}:${name}`}</span>
  );
  IconComponent.displayName = displayName;
  return IconComponent;
}

export const MaterialIcons = createIcon('MaterialIcons');

export default {
  MaterialIcons,
};
