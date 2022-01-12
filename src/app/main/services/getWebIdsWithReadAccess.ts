import { Access, getAgentAccessAll, getGroupAccessAll, getSolidDatasetWithAcl } from '@inrupt/solid-client';
import { fetch } from '@inrupt/solid-client-authn-browser';

export async function getWebIdsWithReadAccess(containerUrl: string) {
  const myDatasetWithAcl = await getSolidDatasetWithAcl(
    containerUrl,
    { fetch }
  );
  const accessByAgent: Record<string, Access> = getAgentAccessAll(myDatasetWithAcl) || {};
  const groupAccess: Record<string, Access> = getGroupAccessAll(myDatasetWithAcl) || {};

  let agentIds = idsWithReadAccess(accessByAgent);
  let groupIds = idsWithReadAccess(groupAccess);

  return agentIds.concat(groupIds);
}

function idsWithReadAccess(accessByAgent: Record<string, Access>) {
  return Object.keys(accessByAgent).filter(id => hasOnlyReadAccess(accessByAgent[id]));
}

function hasOnlyReadAccess(access: Access): boolean {
  return access.read && !access.control && !access.write && !access.append;
}
