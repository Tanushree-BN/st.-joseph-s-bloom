interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  centered?: boolean;
  light?: boolean;
}

const SectionHeading = ({ label, title, description, centered = true, light = false }: SectionHeadingProps) => {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      {label && (
        <span className={`inline-block text-sm font-semibold font-body tracking-wider uppercase mb-3 ${
          light ? "text-secondary" : "text-secondary"
        }`}>
          {label}
        </span>
      )}
      <h2 className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight ${
        light ? "text-primary-foreground" : "text-foreground"
      }`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-lg max-w-2xl font-body ${centered ? "mx-auto" : ""} ${
          light ? "text-primary-foreground/80" : "text-muted-foreground"
        }`}>
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
