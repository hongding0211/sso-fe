import React, {ChangeEvent, forwardRef, HTMLInputTypeAttribute, Ref} from "react";

interface IInput {
  label?: string
  type?: HTMLInputTypeAttribute
  value: string
  onChange: (e: string) => void
  ref?: HTMLInputElement
}

const Input: React.ForwardRefExoticComponent<React.PropsWithoutRef<IInput> & React.RefAttributes<HTMLInputElement>> = forwardRef<HTMLInputElement, IInput>(function Input (props, ref) {
  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    props.onChange(e.target.value)
  }

  return (
    <>
      <p
        className={`
          text-zinc-600
          dark:text-zinc-400
          text-sm
          mb-1
          md:mb-2
        `}
      >
        {props.label}
      </p>
      <input
        className={`
          rounded
          bg-zinc-100
          dark:bg-zinc-900
          w-full
          p-2
          md:p-3
          text-zinc-900
          dark:text-zinc-200
        `}
        type={props.type}
        value={props.value}
        onInput={handleInputChange}
        ref={ref}
      />
    </>
  )
})

export default Input
