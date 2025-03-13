import { useFormContext } from "@/lib/context/FormProvider";
import { themeColors } from "@/lib/utils";
import React from "react";

const EducationalPreview = () => {
  const { formData } = useFormContext();

  return (
    <div className="my-6">
      <h2 className="text-base font-bold uppercase tracking-wider mb-3 text-gray-800 pb-1 border-b">
        Education
      </h2>

      {formData?.education.map((education: any, index: number) => (
        <div key={index} className="my-5">
          <div className="flex justify-between items-baseline mb-1">
            <div>
              <span className="text-gray-700 font-semibold">
                {education.universityName}
              </span>
            </div>
            <div className="text-right text-sm text-gray-600 italic">
              {education?.startDate}
              {education?.startDate &&
                (education?.endDate || education?.endDate === "") &&
                " - "}
              {education?.startDate && education?.endDate === ""
                ? "Present"
                : education.endDate}
            </div>
          </div>
          <div className="text-sm text-gray-700 italic mb-2">
            {education?.degree}
            {education?.degree && education?.major && " in "}
            {education?.major}
          </div>
          {education?.description && (
            <p className="text-sm text-gray-600 mb-2">
              {education?.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default EducationalPreview;
