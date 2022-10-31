import React from "react";

interface IButton {
  type?: 'primary' | 'light'
  children?: string | JSX.Element
  onClick?: () => void
}

const Button: React.FunctionComponent<IButton> = props => {

  function handleClick() {
    if (props.onClick) {
      props.onClick()
    }
  }

  return (
    <>
      <button
        onClick={handleClick}
        className={`
          py-2
          md:py-3
          rounded-lg
          shadow-md
          hover:shadow-lg
          transition-shadow
          text-sm
          md:text-base
          ${props.type === 'primary' ? 'bg-blue-600' : ''}
          ${props.type === 'primary' ? 'text-white' : ''}
          ${props.type === 'primary' ? 'shadow-blue-600/10' : 'shadow-zinc-900/10'}
          ${props.type === 'light' || props.type === undefined ? 'dark:text-zinc-200 dark:bg-zinc-900' : ''}
        `}
      >{props.children}</button>
    </>
  )
}

export default Button
