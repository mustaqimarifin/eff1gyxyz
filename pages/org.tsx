import useOrganizationQuery from "hooks/fufu/use-org";

export async function OrganizationPage({
  organizationId,
}: {
  organizationId: number;
}) {
  const {
    data: organization,
    isLoading,
    isError,
  } = useOrganizationQuery(organizationId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div>
      <h1>{organization.name}</h1>
    </div>
  );
}
