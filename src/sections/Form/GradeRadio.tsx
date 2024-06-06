import { useGetGradesQuery } from "@/api/grade/useGetGradesQuery";
import RHFRadioGroup from "@/components/HookForm/rhf-radio-group";
import { OrganizationWithDetail } from "@/types/entity/organization";
import { useEffect, useState } from "react";

type Props = {
  name: string;
  label?: string;
};

const GradeRadio = (props: Props) => {
  const [grades, setGrades] = useState<OrganizationWithDetail[]>([]);
  const { data } = useGetGradesQuery({
    searchName: "",
    order: "default",
    limit: 0,
    offset: 0,
    pagination: "none",
    cursor: "",
    withCount: false,
    with: ["detail"],
  });

  useEffect(() => {
    if (data) {
      const gradesResponse = data.data.data as OrganizationWithDetail[];
      setGrades(gradesResponse);
    }
  }, [data]);
  return (
    <>
      {!!grades.length && (
        <RHFRadioGroup
          name={props.name}
          label={props.label || "Grade"}
          parentClassName="grid grid-cols-2 gap-2 md:grid-cols-3"
          options={grades.map((grade) => ({
            label: grade.name,
            value: grade.grade?.gradeId || "",
            key: grade.organizationId,
          }))}
        />
      )}
    </>
  );
};

export default GradeRadio;
