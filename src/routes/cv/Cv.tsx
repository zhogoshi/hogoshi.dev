import resumePdf from '../../assets/resume.pdf';

const Cv = () => {
  return (
    <iframe
      src={resumePdf}
      title="Resume"
      width="100%"
      height="100%"
      style={{ border: 'none' }}
    />
  );
};

export default Cv;
