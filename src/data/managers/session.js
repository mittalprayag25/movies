import { httpGet } from '../../api/rest';
import adapters from '../adapters';

const DM = async ({ method, input }) => ({ [method]: await DM[method](input) });

(DM.retrieveOne = async () => httpGet('authentication/guest_session/new')),
(response) => response.then(adapters.session.retrieveOne.be2fe);

export default DM;
