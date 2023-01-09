import { resourceTypes } from 'with-resources';

const withSessionResource = () => ({
  resourceType: resourceTypes.SESSION,
  method: 'retrieveOne',
  options: { runOnInputChange: true },
});

export default withSessionResource;
