interface VariantButtonProps {
    disabled?: boolean;
    onClick: () => void;
    children?: React.ReactNode;
}

export default function VariantButton({
    disabled = false,
    onClick,
    children,
    }: VariantButtonProps) {

    return <button
    onClick={onClick}
    disabled={disabled}
    className={`text-xs transition ease-in-out duration-300 ${
        disabled
          ? 'text-gray-400 cursor-not-allowed' // Disabled styles
          : 'text-gray-400 hover:text-gray-700 underline' // Active styles for underlined text button
      }`}
  >
    {children}
  </button>
}