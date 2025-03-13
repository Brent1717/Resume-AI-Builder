import { useFormContext } from "@/lib/context/FormProvider";
import React from "react";

const SummaryPreview = () => {
  const { formData } = useFormContext();

  return (
    <div className="mt-4">
      {/* <h2 className="text-lg font-semibold mb-2">Summary</h2> */}
      <p className="text-sm text-gray-700">{formData?.summary}</p>
    </div>
  );
};

export default SummaryPreview;
