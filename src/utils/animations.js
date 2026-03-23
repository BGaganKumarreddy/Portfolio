export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.4, ease: "easeInOut" } 
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export const scaleUpHover = {
  hover: { 
    scale: 1.03, 
    transition: { duration: 0.3, ease: "easeInOut" } 
  },
  tap: { scale: 0.98 }
};


