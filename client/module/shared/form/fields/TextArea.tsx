import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTextArea = styled(TextField)({
  '& .MuiInputBase-root': {
    padding: '0px',
  },
});

export const TextArea = (props: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { label, error, ...otherProps } = props;
  return (
    <StyledTextArea
      {...otherProps}
      fullWidth
      multiline
      helperText={error?.message}
      error={Boolean(error)}
    />
  );
};
