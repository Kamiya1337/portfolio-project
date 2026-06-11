export const premiumEase = [0.25, 0.46, 0.45, 0.94];

export const blurSlideUp = {
  hidden: { opacity: 0, y: 34, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.62, ease: premiumEase },
  },
};

export const staggerGrid = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
};

export const cardHover = {
  y: -8,
  scale: 1.018,
  transition: { type: 'spring', stiffness: 280, damping: 23 },
};

export const buttonHover = { scale: 1.04, y: -2 };
export const buttonTap = { scale: 0.97 };

export const lineReveal = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.65, ease: premiumEase },
  },
};

export const motionViewport = { once: true, amount: 0.22, margin: '0px 0px -7% 0px' };

export const pageTransition = {
  hidden: { opacity: 0, y: 26, scale: 0.988 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.56, ease: premiumEase },
  },
  exit: {
    opacity: 0,
    y: -14,
    scale: 0.992,
    transition: { duration: 0.3, ease: premiumEase },
  },
};

export const homePageTransition = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: premiumEase },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.28, ease: premiumEase },
  },
};

export const modalReveal = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.48, ease: premiumEase },
  },
  exit: {
    opacity: 0,
    scale: 0.99,
    transition: { duration: 0.24, ease: premiumEase },
  },
};

export const tableRowReveal = {
  hidden: { opacity: 0, y: 20, scale: 0.995 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: premiumEase },
  },
};
