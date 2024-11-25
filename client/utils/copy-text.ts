const copyText = (text: string) => {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  navigator.clipboard.writeText(text);
  document.body.removeChild(textarea);
};

export default copyText;
