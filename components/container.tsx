import type { ReactNode } from "react";

const Container = ({
  children,
  classNames,
}: {
  children: ReactNode;
  classNames?: string;
}) => {
  return (
    <div className={`${classNames} mx-auto w-full max-w-7xl`}>{children}</div>
  );
};

export default Container;
