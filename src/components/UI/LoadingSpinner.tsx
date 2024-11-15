"use client";

export const LoadingSpinner = ({
  h,
  b,
  color,
}: {
  h: number;
  b: number;
  color: string;
}) => {
  return (
    <div
      className={`border-white h-[${h}px] w-[${h}px] animate-spin rounded-full border-[${b}px] border-t-${color}-600`}
    />
  );
};
