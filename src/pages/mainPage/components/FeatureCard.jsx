const FeatureCard = ({ src, alt, title, description }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-8">
      <img src={src} alt={alt} className="w-285 h-124 object-contain" />
      <div className="flex flex-col justify-center items-center gap-10 text-secondary-500 text-center">
        <p className="text-20 font-bold">{title}</p>
        <p className="text-18 font-medium whitespace-pre-line leading-tight">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
