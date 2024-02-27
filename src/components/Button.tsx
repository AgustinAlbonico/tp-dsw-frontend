import { useNavigate } from 'react-router-dom'
import Spinner from './Spinner'
import clsx from 'clsx'

interface ButtonProps {
  id?: number
  color: string
  text: string
  textColor?: string
  to?: string
  onClick?: (e?: React.FormEvent<Element>) => void
  loading?: boolean
  disabled?: boolean
  sizey?: string
  sizex?: string
  type?: 'submit' | 'button' | 'reset'
  fontSize?: string
}

const Button: React.FC<ButtonProps> = ({
  color,
  text,
  to = '',
  onClick,
  loading,
  disabled,
  sizey,
  sizex,
  type,
  fontSize,
}) => {
  const navigate = useNavigate()

  const handleClick = (e?: React.FormEvent) => {
    if (!type) {
      e?.preventDefault()
      if (to) navigate(to)
      onClick && onClick()
    }
  }

  return (
    <button
      onClick={(e) => (e ? handleClick(e) : handleClick())}
      className={clsx(
        'rounded-md flex justify-center items-center w-32',
        sizey ? sizey : 'h-14',
        sizex ? sizex : 'w-20',
        color
      )}
      disabled={disabled}
      type={type ?? 'button'}
    >
      {!loading ? (
        <p
          className={clsx(
            'font-bold text-white',
            fontSize ? fontSize : 'text-lg'
          )}
        >
          {text}
        </p>
      ) : (
        <Spinner />
      )}
    </button>
  )
}

export default Button
