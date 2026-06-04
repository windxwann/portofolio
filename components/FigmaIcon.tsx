export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const FigmaIcon = ({ size = 24, ...props }: IconProps) => (
  <svg
    {...props}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H12v5H7.5A2.5 2.5 0 0 1 5 5.5z" />
    <path d="M12 3h4.5a2.5 2.5 0 0 1 0 5H12V3z" />
    <path d="M5 12.5A2.5 2.5 0 0 1 7.5 10H12v5H7.5A2.5 2.5 0 0 1 5 12.5z" />
    <path d="M12 10h4.5a2.5 2.5 0 0 1 0 5H12v-5z" />
    <path d="M7.5 17.5A2.5 2.5 0 0 1 10 15h2v5H10a2.5 2.5 0 0 1-2.5-2.5z" />
  </svg>
);
