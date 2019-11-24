import {SousCategorie} from '../../sous-categorie/model/sous-categorie';

export class Categorie {
  id?: number;
  nom: string;
  sousCategories?: number[] | SousCategorie[];
}
