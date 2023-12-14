import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';

interface ButtonProps {
  id?: number;
  color: string;
  text: string;
  textColor?: string;
  to?: string;
  onClick?: null | ((e: React.FormEvent) => void);
  loading?: boolean;
  disabled?: boolean;
  sizey?: number;
  sizex?: number;
}

const Button: React.FC<ButtonProps> = ({
  color,
  text,
  textColor,
  to = '',
  onClick,
  loading,
  disabled,
  sizey,
  sizex,
}: ButtonProps): JSX.Element => {
  const navigate = useNavigate();

  const handleClick = (e: React.FormEvent) => {
    if (to) navigate(to);
    else if (onClick) onClick(e);
  };

  return (
    <button
      onClick={handleClick}
      className={`${sizex ? 'w-' + sizex : 'w-56'} ${
        sizey ? 'h-' + sizey : 'h-14'
      } ${color} rounded-md flex justify-center items-center ${
        textColor ? textColor : 'text-black'
      } `}
      disabled={disabled}
    >
      {!loading ? (
        <p className='text-lg font-bold text-white'>{text}</p>
      ) : (
        <Spinner />
      )}
    </button>
  );
};

export default Button;
