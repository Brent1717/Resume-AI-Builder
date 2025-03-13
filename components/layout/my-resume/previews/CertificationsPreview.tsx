import { useFormContext } from "@/lib/context/FormProvider";

const CertificationsPreview = () => {
  const { formData } = useFormContext();

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">Certifications</h2>
      <ul>
        {formData?.certifications?.map((cert, index) => (
          <li key={index} className="mb-2">
            {cert.name} - {cert.issuer} ({cert.year})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CertificationsPreview;
