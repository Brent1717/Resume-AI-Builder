import { useFormContext } from "@/lib/context/FormProvider";
import React from "react";
import PersonalDetailsPreview from "./previews/PersonalDetailsPreview";
import SkillsPreview from "./previews/SkillsPreview";
import SummaryPreview from "./previews/SummaryPreview";
import ExperiencePreview from "./previews/ExperiencePreview";
import EducationalPreview from "./previews/EducationalPreview";
import CertificationsPreview from "./previews/CertificationsPreview";
import InterestsPreview from "./previews/InterestsPreview";
import { themeColors } from "@/lib/utils";

const ResumePreview = () => {
  const { formData } = useFormContext();

  if (Object.keys(formData || {}).length === 0) {
    return (
      <div className="flex items-center justify-center">
        <div className="w-[210mm] min-h-[297mm] rounded-sm shadow-lg skeleton" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <div className="shadow-lg p-8 bg-white w-[215.9mm] min-h-[279.4mm] print:shadow-none">
        <div className="max-w-[95%] mx-auto">
          <PersonalDetailsPreview />
          {formData?.summary && <SummaryPreview />}
          {formData?.experience?.length > 0 && <ExperiencePreview />}
          {formData?.education?.length > 0 && <EducationalPreview />}
          {formData?.certifications?.length > 0 && <CertificationsPreview />}
          {formData?.skills?.length > 0 && <SkillsPreview />}
          {formData?.interests?.length > 0 && <InterestsPreview />}
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
