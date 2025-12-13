const CustomAudioPlayer = ({ recordUrl }: { recordUrl?: string }) => {
  if (!recordUrl) {
    return <p>No audio available</p>;
  }

  const fullUrl = `/${recordUrl}`;

  return (
    <>
      <audio controls>
        <source src={fullUrl} type="audio/wav" />
        Your browser does not support the audio element.
      </audio>
    </>
  );
};

export default CustomAudioPlayer;
