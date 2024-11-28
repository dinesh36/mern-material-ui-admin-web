export const maxContainerWidth = 1600;
export const centerContainer = {
  width: '100%',
  maxWidth: `${maxContainerWidth}px`,
  margin: '0 auto',
  [`@media (max-width: ${maxContainerWidth}px)`]: {
    paddingLeft: '10px',
    paddingRight: '10px',
  },
};
