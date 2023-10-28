interface Props extends React.SVGProps<SVGSVGElement> {
  size?: number;
  fill?: string;
  width?: number;
  height?: number;
}
export const CheckedIcon = ({ fill, size, height, width, ...props }: Props) => {
  return (
    <svg>
      <svg
        width={size || width || 24}
        height={size || height || 24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="#1C274C"
            stroke-width="1.5"
          ></circle>{" "}
          <path
            d="M8.5 12.5L10.5 14.5L15.5 9.5"
            stroke="#1C274C"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>{" "}
        </g>
      </svg>
    </svg>
  );
};
