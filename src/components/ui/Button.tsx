import { ComponentPropsWithRef } from "react";

interface ButtonProps extends ComponentPropsWithRef<"button"> {
  size?: "sm" | "md";
  round?: boolean;
}

export default function Button({
  className,
  size,
  round,
  ...props
}: ButtonProps) {
  const padding =
    size === "sm" ? "py-2 px-3" : size === "md" ? "py-3 px-4" : "py-3 px-4";
  const borderRadius = round ? "rounded-full" : "rounded-lg";

  return (
    <button
      className={`font-bold gradient text-black ${borderRadius} ${padding} hover:brightness-125 active:brightness-75 transition-all ${className}`}
      {...props}></button>
  );
}
