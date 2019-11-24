import {Groupe} from '../../model/groupe';
import {GroupeConvention} from '../../../groupe-convention/model/groupe-convention';

export interface SGroupe extends Groupe {
  groupe_convention_id: any;
  groupeConvention: GroupeConvention;
}
