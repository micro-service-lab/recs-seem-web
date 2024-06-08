import { useGetGroupsQuery } from "@/api/group/useGetGroupsQuery";
import RHFRadioGroup from "@/components/HookForm/rhf-radio-group";
import { OrganizationWithDetail } from "@/types/entity/organization";
import { useEffect, useState } from "react";

type Props = {
  name: string;
  label?: string;
  required?: boolean;
};

const GroupRadio = ({
  name,
  label,
  required,
}: Props) => {
  const [groups, setGroups] = useState<OrganizationWithDetail[]>([]);
  const { data } = useGetGroupsQuery({
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
      const groupsResponse = data.data.data as OrganizationWithDetail[];
      setGroups(groupsResponse);
    }
  }, [data]);
  return (
    <>
      {!!groups.length && (
        <RHFRadioGroup
          name={name}
          label={label || "Group"}
          required={required}
          parentClassName="grid grid-cols-2 gap-5 md:grid-cols-3"
          options={groups.map((group) => ({
            label: group.name,
            value: group.group?.groupId || "",
            key: group.organizationId,
          }))}
        />
      )}
    </>
  );
};

export default GroupRadio;