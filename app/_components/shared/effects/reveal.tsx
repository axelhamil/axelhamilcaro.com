"use client";

import { motion, type Variants } from "framer-motion";
import type { ComponentProps } from "react";

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

type MotionDivProps = ComponentProps<typeof motion.div>;

export function RevealContainer(props: MotionDivProps) {
  const { children, ...rest } = props;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem(props: MotionDivProps) {
  return <motion.div variants={itemVariants} {...props} />;
}
