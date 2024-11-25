const downloadBlob = ({ blob, fileName }: { blob: Blob; fileName: string }) => {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName; // Set the desired file name
  document.body.appendChild(a);
  a.click();

  // Clean up
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

export default downloadBlob;
