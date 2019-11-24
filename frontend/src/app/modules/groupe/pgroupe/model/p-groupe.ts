import {Groupe} from '../../model/groupe';
import {Ville} from '../../../ville/model/ville';

export interface PGroupe extends Groupe {
  type?: string;
  ville_id?: number;
  ville?: Ville;
}
