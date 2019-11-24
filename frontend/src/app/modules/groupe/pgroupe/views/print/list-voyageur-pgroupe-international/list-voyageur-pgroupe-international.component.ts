import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {OffreVoyage} from '../../../../../offre-voyage/model/offre-voyage';
import {PGroupe} from '../../../model/p-groupe';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';

@Component({
  selector: 'app-list-voyageur-pgroupe',
  templateUrl: './list-voyageur-pgroupe-international.component.html',
  styleUrls: ['./list-voyageur-pgroupe-international.component.scss']
})
export class ListVoyageurPgroupeInternationalComponent implements OnInit {
  offreVoyage: OffreVoyage;
  pGroupes: PGroupe[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { offreVoyage: OffreVoyage, pGroupes: PGroupe[] }) {
    this.offreVoyage = data.offreVoyage;
    this.pGroupes = data.pGroupes;
  }

  ngOnInit() {
  }

  donwload() {
    const filename = 'list-voyageur-00' + this.offreVoyage.id + '.pdf';

    html2canvas(document.querySelector('#c')).then(canvas => {
      /*   const pdf = new jsPDF('p', 'mm', 'a4');
         pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298);*/
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210;
      const pageHeight = 295;
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

  getReste(): number {
    let reste = 0;
    this.pGroupes.forEach(value => {
      reste += value.paiement.reste;
    });
    return reste;
  }

  getMontantPaye(): number {
    let montant = 0;
    this.pGroupes.forEach(value => {
      montant += (value.paiement.totale - value.paiement.reste);
    });
    return montant;
  }
}
