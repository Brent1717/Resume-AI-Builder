import { useFormContext } from "@/lib/context/FormProvider";
import { themeColors } from "@/lib/utils";
import React from "react";

const PersonalDetailsPreview = () => {
  const { formData } = useFormContext();

  return (
    <div>
      <h1 className="text-2xl font-bold">
        {formData?.firstName} {formData?.lastName}
      </h1>
      <div className="text-sm text-gray-600 mt-1 flex flex-wrap gap-2 pb-2 border-b">
        {formData?.email && <span>{formData.email}</span>}
        {formData?.phone && <span>• {formData.phone}</span>}
        {formData?.address && <span>• {formData.address}</span>}
        {formData?.portfolioLink && (
          <span>
            •{" "}
            <a
              href={formData.portfolioLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Portfolio
            </a>
          </span>
        )}
        {formData?.githubLink && (
          <span>
            •{" "}
            <a
              href={formData.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              GitHub
            </a>
          </span>
        )}
      </div>
    </div>
  );
};

export default PersonalDetailsPreview;
