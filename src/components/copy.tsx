
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-button text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none  [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        main: "px-1.5 py-3 text-white bg-primary",
        default: "border border-gray-300 bg-white text-gray-900  hover:bg-gray-100",
        success:
          "border border-gray-300 bg-fill-success text-brand-on-bg-fill shadow-none hover:bg-fill-success-hover",
        primary: "bg-primary text-brand-on-bg-fill shadow-none hover:bg-primary-hover",
        destructive:
          "bg-destructive text-destructive-foreground shadow-none hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-none hover:bg-accent  hover:text-accent-foreground",
        secondary:
          "bg-fill-tertiary text-secondary-foreground shadow-none hover:bg-fill-tertiary-hover",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-emphasis underline-offset-4 hover:underline",
        active: "text-sidebar-active  bg-sidebar-active shadow-none",
        black: "bg-black-button text-white shadow-none hover:bg-black-button/90",
        icon: "bg-none hover:bg-fill-tertiary-hover h-7 w-7",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-button px-3 text-sm",
        lg: "h-10 rounded-button px-8",
        icon: "h-9 w-9 hover:bg-fill-tertiary-hover",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function mergeRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
  return (node: T) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === "function") {
        ref(node);
      } else {
        (ref as React.MutableRefObject<T | null>).current = node;
      }
    });
  };
}

export type TButtonVariant = VariantProps<typeof buttonVariants>["variant"];
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  disabled?: boolean;
  disabledRipple?: boolean;
}

const getRippleColor = (
  variant?:
    | "default"
    | "success"
    | "primary"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "active"
    | "black"
    | "main"
    | "icon"
    | null
    | undefined
) => {
  switch (variant) {
    case "primary":
      return "hsl(var(--primary), 0.6)";
    case "secondary":
      return "hsl(var(--secondary), 0.6)";
    case "success":
      return "hsl(var(--bg-fill-success), 0.6)";
    case "destructive":
      return "hsl(var(--destructive), 0.6)";
    case "outline":
      return "hsl(var(--text), 0.6)";
    case "active":
      return "hsl(var(--bg-sidebar-border-active), 0.6)";
    default:
      return "hsl(var(--bg-sidebar-border-active), 0.6)";
  }
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      disabled = false,
      children,
      onClick,
      disabledRipple = false,
      ...props
    },
    ref
  ) => {
    const internalRef = React.useRef<HTMLButtonElement>(null);
    const [ripples, setRipples] = React.useState<
      { x: number; y: number; size: number; key: number }[]
    >([]);

    const createRipple = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const button = internalRef.current;
      if (!button) return;

      const rect = button.getBoundingClientRect();
      const rippleSize = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - rippleSize / 2;
      const y = event.clientY - rect.top - rippleSize / 2;

      const newRipple = { x, y, size: rippleSize, key: Date.now() };
      setRipples((prev) => [...prev, newRipple]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.key !== newRipple.key));
      }, 600);
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (!disabledRipple) {
        createRipple(event);
      }
      if (onClick) onClick(event);
    };

    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        {...props}
        onClick={handleClick}
        ref={mergeRefs(ref, internalRef)}
        className={cn(buttonVariants({ variant, size, className }))}
        style={{ position: "relative", overflow: "hidden", ...props.style }}
        disabled={loading || disabled}
      >
        {ripples.map((ripple) => (
          <span
            key={ripple.key}
            style={{
              position: "absolute",
              borderRadius: "50%",
              transform: "scale(0)",
              backgroundColor: getRippleColor(variant),
              width: ripple.size,
              height: ripple.size,
              top: ripple.y,
              left: ripple.x,
              pointerEvents: "none",
              animation: "ripple 600ms linear",
            }}
          />
        ))}
        {loading ? (
          <Loader2 className="animate-spin h-4 w-4" /> // Hiển thị icon khi loading
        ) : (
          children // Hiển thị text bình thường khi không loading
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button };
