interface PrimaryButtonProps {
    disabled?: boolean;
    onClick: () => void;
    children?: React.ReactNode;
}

export default function PrimaryButton({
    disabled = false,
    onClick,
    children,
    }: PrimaryButtonProps) {

    return <button
    onClick={onClick}
    disabled={disabled}
    className={`py-1 px-2 text-xs rounded transition ease-in-out duration-300 bg-blue-500 text-gray-200 ${
        !disabled
        ? 'hover:bg-blue-700' // Active styles
        : 'cursor-not-allowed brightness-50' // Disabled styles
    }`}
  >
    {children}
  </button>
}