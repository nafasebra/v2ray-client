import { ComponentPropsWithRef } from "react";

interface ButtonProps extends ComponentPropsWithRef<"button"> {}

export default function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      className={`font-bold gradient text-black rounded-lg py-3 px-6 hover:opacity-50 active:opacity-70 transition-all ${className}`}
      {...props}></button>
  );
}
