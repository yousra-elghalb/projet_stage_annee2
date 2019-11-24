import {Component, Inject, OnInit} from '@angular/core';
import {Facture} from '../../../../model/facture';
import {MAT_DIALOG_DATA} from '@angular/material';
import {OffreVoyage} from '../../../../../offre-voyage/model/offre-voyage';
import {PGroupe} from '../../../model/p-groupe';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import {Traite} from '../../../../../offre-voyage/model/traite';

@Component({
  selector: 'app-all-facture',
  templateUrl: './all-facture-p-groupe.component.html',
  styleUrls: ['./all-facture-p-groupe.component.scss']
})
export class AllFacturePGroupeComponent implements OnInit {
  pGroupes: {
    traites: Traite[],
    qte: number,
    qte_enfant: number, qte_bebe: number,
    totale_options: number,
    reduction: number
  }[];
  date = new Date();

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    pGroupe: PGroupe[],
    offreVoyage: OffreVoyage,
    modalites: number[]
  }) {
    this.pGroupes = data.pGroupe
      .filter(value => value.etat === 'validé')
      .map(value => {
        let options = 0;
        if (value.options) {
          value.options.forEach(value2 => {
            options += value2.pivot.prix;
          });
        }
        return {
          traites: value.paiement.traites.filter(value1 =>
            value1.facture &&
            value1.facture.num &&
            this.data.modalites.find(value2 => value2 === value1.modaliteDePaiement_id)),
          qte: value.voyageurs.filter(value2 => value2.stadeVie === 'adulte').length,
          qte_enfant: value.voyageurs.filter(value2 => value2.stadeVie === 'enfant').length,
          qte_bebe: value.voyageurs.filter(value2 => value2.stadeVie === 'bébé').length,
          totale_options: options,
          reduction: value.reduction,

        };
      });
  }

  ngOnInit() {
  }

  donwload() {
    const filename = 'factures-' + this.data.offreVoyage.voyage.nom + ' / ' + this.data.offreVoyage.suffixe + '.pdf';

    html2canvas(document.querySelector('#c')).then(canvas => {
      /*   const pdf = new jsPDF('p', 'mm', 'a4');
         pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298);*/
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;
      const doc = new jsPDF('p', 'mm');
      let position = 0;
      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      doc.save(filename);
    });
  }
}
