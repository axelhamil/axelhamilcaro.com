"use client";

import { motion, type Variants } from "framer-motion";
import type { ComponentProps } from "react";

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.02,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
    scale: 0.98,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const itemFromLeftVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
    scale: 0.98,
  },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const itemFromRightVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 20,
    scale: 0.98,
  },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const itemScaleVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.92,
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

type MotionDivProps = ComponentProps<typeof motion.div>;

interface RevealContainerProps extends MotionDivProps {
  staggerDelay?: number;
}

export function RevealContainer(props: RevealContainerProps) {
  const { children, staggerDelay, ...rest } = props;

  const variants = staggerDelay
    ? {
        ...containerVariants,
        show: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.02,
          },
        },
      }
    : containerVariants;

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

type RevealDirection = "up" | "left" | "right" | "scale";

interface RevealItemProps extends MotionDivProps {
  direction?: RevealDirection;
}

export function RevealItem({ direction = "up", ...props }: RevealItemProps) {
  const variantsMap: Record<RevealDirection, Variants> = {
    up: itemVariants,
    left: itemFromLeftVariants,
    right: itemFromRightVariants,
    scale: itemScaleVariants,
  };

  return <motion.div variants={variantsMap[direction]} {...props} />;
}
