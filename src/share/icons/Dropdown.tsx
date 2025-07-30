export const Dropdown = ({
  deg,
  color,
  width,
  height,
}: {
  deg: number;
  color: string;
  width?: number;
  height?: number;
}) => {
  const width_ = width ? width : 15;
  const height_ = height ? height : 9;
  return (
    <svg
      width={width_}
      height={height_}
      viewBox='0 0 15 9'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      style={{ transform: `rotate(${deg}deg)`, transition: '0.3s all' }}
      className='Dropdown'
    >
      <path d='M1 1.25L7.5 7.75L14 1.25' stroke={color} strokeLinecap='round' />
    </svg>
  );
};
