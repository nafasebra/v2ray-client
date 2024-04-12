import { useActiveTheme, useGradientStyle } from "@/theme/utils/gradient";
import { ComponentPropsWithRef } from "react";

interface ButtonProps extends ComponentPropsWithRef<"button"> {
  size?: "sm" | "md" | "xs";
  round?: boolean;
}

export default function Button({
  className,
  size,
  round,
  ...props
}: ButtonProps) {
  const padding =
    size === "xs"
      ? "py-1 px-2"
      : size === "sm"
      ? "py-2 px-3"
      : size === "md"
      ? "py-3 px-4"
      : "py-3 px-4";
  const borderRadius = round ? "rounded-full" : "rounded-lg";
  const theme = useActiveTheme();
  const bgStyle = useGradientStyle();

  return (
    <button
      style={
        props.disabled
          ? undefined
          : { ...bgStyle, color: theme.primary_text_color }
      }
      className={`font-bold ${borderRadius} ${padding} hover:brightness-125 active:brightness-75 transition-all disabled:bg-gray-400/60 disabled:animate-pulse ${className}`}
      {...props}></button>
  );
}
