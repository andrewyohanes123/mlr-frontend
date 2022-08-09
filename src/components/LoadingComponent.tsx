import { FC, ReactElement, ReactNode, Suspense } from "react";
import { Skeleton } from "@mantine/core";

const SkeletonLoading: FC = (): ReactElement => {
  return (
    <>
      <Skeleton animate height={15} my="md" radius="md" width="100%" />
      <Skeleton animate height={15} my="md" radius="md" width="80%" />
      <Skeleton animate height={15} my="md" radius="md" width="60%" />
      <Skeleton animate height={15} my="md" radius="md" width="70%" />
      <Skeleton animate height={15} my="md" radius="md" width="89%" />
    </>
  );
};

const LoadingComponent: FC<{ children: ReactNode }> = ({
  children,
}): ReactElement => {
  return <Suspense fallback={<SkeletonLoading />}>{children}</Suspense>;
};

export default LoadingComponent;
