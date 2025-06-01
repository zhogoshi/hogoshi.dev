import * as React from "react";

import type { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export const ArrowLeftOutline: React.FC<IconSvgProps> = ({
    size = 36,
    height,
    ...props
  }) => (
    <svg
      height={size || height}
      viewBox="0 0 24 24"
      width={size || height}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <path d="M18.9998 12H5.99985M10.9998 6L5.70696 11.2929C5.31643 11.6834 5.31643 12.3166 5.70696 12.7071L10.9998 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
  
  export const ArrowLeftSolid: React.FC<IconSvgProps> = ({
    size = 36,
    height,
    ...props
  }) => (
    <svg
      height={size || height}
      viewBox="0 0 24 24"
      width={size || height}
      fill="currentColor"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1 9C1 6.19974 1 4.79961 1.54497 3.73005C2.02433 2.78924 2.78924 2.02433 3.73005 1.54497C4.79961 1 6.19974 1 9 1H15C17.8003 1 19.2004 1 20.27 1.54497C21.2108 2.02433 21.9757 2.78924 22.455 3.73005C23 4.79961 23 6.19974 23 9V15C23 17.8003 23 19.2004 22.455 20.27C21.9757 21.2108 21.2108 21.9757 20.27 22.455C19.2004 23 17.8003 23 15 23H9C6.19974 23 4.79961 23 3.73005 22.455C2.78924 21.9757 2.02433 21.2108 1.54497 20.27C1 19.2004 1 17.8003 1 15V9ZM20 12C20 11.4477 19.5523 11 19 11H7.41421L11.7071 6.70711C12.0976 6.31658 12.0976 5.68342 11.7071 5.29289C11.3166 4.90237 10.6834 4.90237 10.2929 5.29289L5 10.5858C4.21895 11.3668 4.21895 12.6332 5 13.4142L10.2929 18.7071C10.6834 19.0976 11.3166 19.0976 11.7071 18.7071C12.0976 18.3166 12.0976 17.6834 11.7071 17.2929L7.41421 13H19C19.5523 13 20 12.5523 20 12Z"
        fill="currentColor" />
    </svg>
  );

export const ArrowRightOutline: React.FC<IconSvgProps> = ({
    size = 36,
    height,
    ...props
}) => (
    <svg
        height={size || height}
        viewBox="0 0 24 24"
        width={size || height}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        {...props}
    >
        <path d="M5.99985 12H18.9998M13.9998 18L19.2929 12.7071C19.6834 12.3166 19.6834 11.6834 19.2929 11.2929L13.9998 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
)

export const ArrowRightSolid: React.FC<IconSvgProps> = ({
    size = 36,
    height,
    ...props
}) => (
    <svg
        height={size || height}
        viewBox="0 0 24 24"
        width={size || height}
        fill="currentColor"
        {...props}
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1 9C1 6.19974 1 4.79961 1.54497 3.73005C2.02433 2.78924 2.78924 2.02433 3.73005 1.54497C4.79961 1 6.19974 1 9 1H15C17.8003 1 19.2004 1 20.27 1.54497C21.2108 2.02433 21.9757 2.78924 22.455 3.73005C23 4.79961 23 6.19974 23 9V15C23 17.8003 23 19.2004 22.455 20.27C21.9757 21.2108 21.2108 21.9757 20.27 22.455C19.2004 23 17.8003 23 15 23H9C6.19974 23 4.79961 23 3.73005 22.455C2.78924 21.9757 2.02433 21.2108 1.54497 20.27C1 19.2004 1 17.8003 1 15V9ZM20 12C20 11.4477 19.5523 11 19 11H7.41421L11.7071 6.70711C12.0976 6.31658 12.0976 5.68342 11.7071 5.29289C11.3166 4.90237 10.6834 4.90237 10.2929 5.29289L5 10.5858C4.21895 11.3668 4.21895 12.6332 5 13.4142L10.2929 18.7071C10.6834 19.0976 11.3166 19.0976 11.7071 18.7071C12.0976 18.3166 12.0976 17.6834 11.7071 17.2929L7.41421 13H19C19.5523 13 20 12.5523 20 12Z"
            fill="currentColor"
        />
    </svg>
)

export const icons = {
    outline: {
        arrowLeft: ArrowLeftOutline,
        arrowRight: ArrowRightOutline
    },
    solid: {
        arrowLeft: ArrowLeftSolid,
        arrowRight: ArrowRightSolid
    }
}