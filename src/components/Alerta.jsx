import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineWarning, AiOutlineInfoCircle } from 'react-icons/ai'

const Alerta = ({ alerta }) => {
  if (!alerta || !alerta.msg) return null

  const variant = alerta.type || alerta.tipo || (alerta.error ? 'error' : 'success')

  const base = ' w-full max-w-2xl mx-auto px-4 py-2 rounded-md text-lg flex items-center'

  const variants = {
    success: {
      bg: 'bg-green-200',
      text: 'text-green-800',
      icon: <AiOutlineCheckCircle className="text-green-600 w-5 h-5 sm:w-5 sm:h-5 mr-3" />,
    },
    error: {
      bg: 'bg-red-200',
      text: 'text-red-800',
      icon: <AiOutlineCloseCircle className="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3" />,
    },
    warning: {
      bg: 'bg-orange-200',
      text: 'text-yellow-800',
      icon: <AiOutlineWarning className="text-yellow-600 w-5 h-5 sm:w-5 sm:h-5 mr-3" />,
    },
    info: {
      bg: 'bg-blue-200',
      text: 'text-blue-800',
      icon: <AiOutlineInfoCircle className="text-blue-600 w-5 h-5 sm:w-5 sm:h-5 mr-3" />,
    },
  }

  const v = variants[variant] || variants.info

  return (
    <div className={`${v.bg} ${base}`}>
      {v.icon}
      <span className={v.text}>{alerta.msg}</span>
    </div>
  )
}

export default Alerta
