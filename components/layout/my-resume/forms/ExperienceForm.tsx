"use client";

import RichTextEditor from "@/components/common/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { generateExperienceDescription } from "@/lib/actions/gemini.actions";
import { addExperienceToResume } from "@/lib/actions/resume.actions";
import { useFormContext } from "@/lib/context/FormProvider";
import { Brain, Loader2, Minus, Plus } from "lucide-react";
import React, { useRef, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const ExperienceForm = ({ params }: { params: { id: string } }) => {
  const listRef = useRef<HTMLDivElement>(null);
  const { formData, handleInputChange } = useFormContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiGeneratedSummaryList, setAiGeneratedSummaryList] = useState(
    [] as any
  );
  const [experienceList, setExperienceList] = useState(
    formData?.experience.length > 0
      ? formData?.experience.map((exp: any) => ({
          ...exp,
          responsibilities: exp.responsibilities || [""],
        }))
      : [
          {
            title: "",
            companyName: "",
            city: "",
            state: "",
            startDate: "",
            endDate: "",
            workSummary: "",
            responsibilities: [""],
          },
        ]
  );
  const [currentAiIndex, setCurrentAiIndex] = useState(
    experienceList.length - 1
  );
  const { toast } = useToast();

  const handleChange = (index: number, event: any) => {
    const newEntries = experienceList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setExperienceList(newEntries);

    handleInputChange({
      target: {
        name: "experience",
        value: newEntries,
      },
    });
  };

  const handleResponsibilityChange = (
    expIndex: number,
    respIndex: number,
    value: string
  ) => {
    const newEntries = experienceList.slice();
    newEntries[expIndex].responsibilities[respIndex] = value;
    setExperienceList(newEntries);

    handleInputChange({
      target: {
        name: "experience",
        value: newEntries,
      },
    });
  };

  const addResponsibility = (expIndex: number) => {
    const newEntries = experienceList.slice();
    newEntries[expIndex].responsibilities.push("");
    setExperienceList(newEntries);

    handleInputChange({
      target: {
        name: "experience",
        value: newEntries,
      },
    });
  };

  const removeResponsibility = (expIndex: number, respIndex: number) => {
    const newEntries = experienceList.slice();
    newEntries[expIndex].responsibilities.splice(respIndex, 1);
    setExperienceList(newEntries);

    handleInputChange({
      target: {
        name: "experience",
        value: newEntries,
      },
    });
  };

  const AddNewExperience = () => {
    const newEntries = [
      ...experienceList,
      {
        title: "",
        companyName: "",
        city: "",
        state: "",
        startDate: "",
        endDate: "",
        workSummary: "",
        responsibilities: [""],
      },
    ];
    setExperienceList(newEntries);

    handleInputChange({
      target: {
        name: "experience",
        value: newEntries,
      },
    });
  };

  const RemoveExperience = () => {
    const newEntries = experienceList.slice(0, -1);
    setExperienceList(newEntries);

    if (currentAiIndex > newEntries.length - 1) {
      setCurrentAiIndex(newEntries.length - 1);
    }

    handleInputChange({
      target: {
        name: "experience",
        value: newEntries,
      },
    });
  };

  const generateExperienceDescriptionFromAI = async (index: number) => {
    if (
      !formData?.experience[index]?.title ||
      formData?.experience[index]?.title === "" ||
      !formData?.experience[index]?.companyName ||
      formData?.experience[index]?.companyName === ""
    ) {
      toast({
        title: "Uh Oh! Something went wrong.",
        description:
          "Please enter the position title and company name to generate summary.",
        variant: "destructive",
        className: "bg-white border-2",
      });

      return;
    }

    setCurrentAiIndex(index);

    setIsAiLoading(true);

    const result = await generateExperienceDescription(
      `${formData?.experience[index]?.title} at ${formData?.experience[index]?.companyName}`
    );

    setAiGeneratedSummaryList(result);

    setIsAiLoading(false);

    setTimeout(function () {
      listRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const onSave = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);

    const result = await addExperienceToResume(params.id, formData.experience);

    if (result.success) {
      toast({
        title: "Information saved.",
        description: "Professional experience updated successfully.",
        className: "bg-white",
      });
    } else {
      toast({
        title: "Uh Oh! Something went wrong.",
        description: result?.error,
        variant: "destructive",
        className: "bg-white",
      });
    }

    setIsLoading(false);
  };

  console.log("Form Data:", formData);
  console.log("Experience List:", experienceList);

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary-700 border-t-4 bg-white">
        <h2 className="text-lg font-semibold leading-none tracking-tight">
          Professional Experience
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Add your previous job experiences
        </p>

        <div className="mt-5">
          {experienceList.map((item: any, index: number) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                <div className="space-y-2">
                  <label className="text-slate-700 font-semibold">
                    Position Title:
                  </label>
                  <Input
                    name="title"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.title}
                    className="no-focus"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-slate-700 font-semibold">
                    Company Name:
                  </label>
                  <Input
                    name="companyName"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.companyName}
                    className="no-focus"
                  />
                </div>
                {/* <div className="space-y-2">
                  <label className="text-slate-700 font-semibold">City:</label>
                  <Input
                    name="city"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.city}
                    className="no-focus"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-slate-700 font-semibold">State:</label>
                  <Input
                    name="state"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.state}
                    className="no-focus"
                  />
                </div> */}
                {/* <div className="space-y-2">
                  <label className="text-slate-700 font-semibold flex items-center gap-1">
                    Date Start - Date End
                    <span className="text-gray-400 text-xs">(?)</span>
                  </label>
                  <div className="flex gap-2 items-center">
                    <Input
                      type="text"
                      name="startDate"
                      placeholder="Feb 2018"
                      onChange={handleInputChange}
                      className="no-focus"
                    />
                    <span>-</span>
                    <Input
                      type="text"
                      name="endDate"
                      placeholder="Jun 2022"
                      onChange={handleInputChange}
                      className="no-focus"
                      disabled={formData?.isCurrentPosition}
                    />
                  </div>
                </div> */}

                <div className="space-y-2">
                  <label className="text-slate-700 font-semibold">
                    Location (City, State)
                  </label>
                  <Input
                    name="location"
                    placeholder="Redmond, WA"
                    onChange={handleInputChange}
                    className="no-focus"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-slate-700 font-semibold">
                    Start Date:
                  </label>
                  <Input
                    type="date"
                    name="startDate"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.startDate}
                    className="no-focus"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-slate-700 font-semibold">
                      End Date:
                    </label>
                    <div className="flex items-center space-x-2">
                      <Switch
                        name="isCurrentPosition"
                        id={`current-position-${index}`}
                        onCheckedChange={(checked) =>
                          handleChange(index, {
                            target: {
                              name: "isCurrentPosition",
                              value: checked,
                            },
                          })
                        }
                      />
                      <Label htmlFor={`current-position-${index}`}>
                        Current Position
                      </Label>
                    </div>
                  </div>
                  <Input
                    type="date"
                    name="endDate"
                    disabled={item?.isCurrentPosition}
                    required={!item?.isCurrentPosition}
                    onChange={(event) => handleChange(index, event)}
                    className="no-focus"
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <div className="col-span-2 space-y-2">
                    <label className="text-slate-700 font-semibold flex items-center gap-1">
                      Company Description
                      <span className="text-gray-400 text-xs">(?)</span>
                    </label>
                    <Textarea
                      name="companyDescription"
                      onChange={(event) => handleChange(index, event)}
                      defaultValue={item?.companyDescription}
                      placeholder="Microsoft, a global leader in technology and innovation, ranked #2 on the Fortune 500 in 2023, with a revenue of $198.3 billion."
                      className="no-focus resize-none h-24"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-primary-600 p-0 h-auto text-sm"
                    >
                      <Brain className="h-4 w-4 mr-1" /> AI Suggestions
                    </Button>
                  </div>
                  <div className="col-span-2 space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-slate-700 font-semibold flex items-center gap-1">
                        Responsibilities/Achievements
                        <span className="text-gray-400 text-xs">(?)</span>
                      </label>
                    </div>
                    {item.responsibilities.map(
                      (resp: string, respIndex: number) => (
                        <div key={respIndex} className="space-y-2">
                          <div className="flex gap-2">
                            <Textarea
                              value={resp}
                              onChange={(e) =>
                                handleResponsibilityChange(
                                  index,
                                  respIndex,
                                  e.target.value
                                )
                              }
                              placeholder="Led the end-to-end product development lifecycle, from concept through launch, ensuring alignment with market needs and strategic goals."
                              className="no-focus resize-none h-24"
                            />
                            <div className="flex flex-col gap-1">
                              {item.responsibilities.length > 1 && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="text-primary-600 p-2 h-auto"
                                  onClick={() =>
                                    removeResponsibility(index, respIndex)
                                  }
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                              )}
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="text-primary-600 p-2 h-auto"
                              >
                                <Brain className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          {respIndex === item.responsibilities.length - 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="text-primary-600 p-2 h-auto flex items-center gap-1"
                              onClick={() => addResponsibility(index)}
                            >
                              <Plus className="h-4 w-4" /> Add a bullet point
                            </Button>
                          )}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex gap-2 justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={AddNewExperience}
              className="text-primary"
            >
              <Plus className="size-4 mr-2" /> Add More
            </Button>
            <Button
              variant="outline"
              onClick={RemoveExperience}
              className="text-primary"
            >
              <Minus className="size-4 mr-2" /> Remove
            </Button>
          </div>
          <Button
            disabled={isLoading}
            onClick={onSave}
            className="bg-primary-700 hover:bg-primary-800 text-white"
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" /> &nbsp; Saving
              </>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </div>

      {aiGeneratedSummaryList.length > 0 && (
        <div className="my-5" ref={listRef}>
          <h2 className="font-bold text-lg">Suggestions</h2>
          {aiGeneratedSummaryList?.map((item: any, index: number) => (
            <div
              key={index}
              onClick={() =>
                handleChange(currentAiIndex, {
                  target: { name: "workSummary", value: item?.description },
                })
              }
              className={`p-5 shadow-lg my-4 rounded-lg border-t-2 ${
                isAiLoading ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              aria-disabled={isAiLoading}
            >
              <h2 className="font-semibold my-1 text-primary text-gray-800">
                Level: {item?.activity_level}
              </h2>
              <p className="text-justify text-gray-600">{item?.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;
