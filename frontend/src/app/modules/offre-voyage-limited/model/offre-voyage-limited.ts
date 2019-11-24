import {Commercial} from '../../commercial/model/commercial';

export interface OffreVoyageLimited {
  id: number;
  offre_voyage_id: number;
  commercial_id: number;
  nbPlace: number;
  optionalDate: Date;
  commercial: Commercial;
}
