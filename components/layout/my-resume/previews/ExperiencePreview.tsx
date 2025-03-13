import { useFormContext } from "@/lib/context/FormProvider";
import React from "react";

const ExperiencePreview = () => {
  const { formData } = useFormContext();

  return (
    <div className="mt-4">
      <h2 className="text-base font-bold uppercase tracking-wider mb-3 text-gray-800 pb-1 border-b">
        Work Experience
      </h2>
      {formData?.experience?.map((experience: any, index: number) => (
        <div key={index} className="mb-6">
          <div className="flex justify-between items-baseline mb-1">
            <div>
              <span className="font-semibold">{experience.companyName}</span>
              {/* <span className="mx-2 text-gray-400">•</span> */}
            </div>

            <div className="text-right text-sm font-semibold">
              <span>
                {experience.startDate} -{" "}
                {experience.isCurrentPosition ? "Present" : experience.endDate}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-baseline mb-1">
            <div>
              <span className="text-gray-700 italic">{experience.title}</span>
            </div>
            <div className="text-right text-sm text-gray-600 italic">
              {experience.city && experience.state && (
                <>
                  {experience.city}, {experience.state}
                </>
              )}
            </div>
          </div>
          {experience.companyDescription && (
            <p className="text-sm text-gray-600 mb-2">
              {experience.companyDescription}
            </p>
          )}
          <div className="ml-4">
            {/* <h3 className="text-sm font-medium mb-1">
              Responsibility/Achievement:
            </h3> */}
            <ul className="list-disc ml-4 text-gray-700">
              {experience.responsibilities?.map(
                (bullet: string, idx: number) => (
                  <li key={idx} className="text-sm leading-relaxed mb-1">
                    {bullet}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExperiencePreview;
