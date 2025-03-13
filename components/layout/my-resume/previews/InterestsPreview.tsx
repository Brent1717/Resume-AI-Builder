import { useFormContext } from "@/lib/context/FormProvider";

const InterestsPreview = () => {
  const { formData } = useFormContext();

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">Interests</h2>
      <ul>
        {formData?.interests?.map((interest, index) => (
          <li key={index} className="mb-2">
            {interest}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InterestsPreview;
