import {FormControl, Validators} from '@angular/forms';
import {Categorie} from '../../categorie/model/categorie';
import {SousCategorie} from '../../sous-categorie/model/sous-categorie';
import {Ville} from '../../ville/model/ville';

export interface Voyage {
  id: number;
  nom: string;
  lien: string;
  prixAdulte: number;
  prixEnfant: number;
  prixBebe: number;
  minPlace: number;
  maxPlace: number;
  description: string;
  categorie: Categorie;
  sousCategorie: SousCategorie;
  villes: Ville[];
  villesVisiter: Ville[];
}
