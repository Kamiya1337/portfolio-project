export const premiumEase = [0.25, 0.46, 0.45, 0.94];

export const blurSlideUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: premiumEase },
  },
};

export const staggerGrid = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.06 } },
};

export const cardHover = {
  y: -5,
  scale: 1.01,
  transition: { type: 'spring', stiffness: 260, damping: 24 },
};

export const buttonHover = { scale: 1.025, y: -1 };
export const buttonTap = { scale: 0.98 };

export const lineReveal = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.6, ease: premiumEase },
  },
};

export const motionViewport = { once: true, amount: 0.18, margin: '0px 0px -5% 0px' };

export const pageTransition = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: premiumEase },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2, ease: premiumEase },
  },
};

export const modalReveal = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.28, ease: premiumEase },
  },
  exit: {
    opacity: 0,
    scale: 0.99,
    transition: { duration: 0.18, ease: premiumEase },
  },
};

export const tableRowReveal = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.32, ease: premiumEase },
  },
};