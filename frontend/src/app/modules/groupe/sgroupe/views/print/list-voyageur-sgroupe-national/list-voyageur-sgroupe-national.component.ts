import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {OffreVoyage} from '../../../../../offre-voyage/model/offre-voyage';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import {SGroupe} from '../../../model/s-groupe';

@Component({
  selector: 'app-list-voyageur-sgroupe',
  templateUrl: './list-voyageur-sgroupe-national.component.html',
  styleUrls: ['./list-voyageur-sgroupe-national.component.scss']
})
export class ListVoyageurSgroupeNationalComponent implements OnInit {
  offreVoyage: OffreVoyage;
  sGroupe: SGroupe;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { offreVoyage: OffreVoyage, sGroupe: SGroupe }) {
    this.offreVoyage = data.offreVoyage;
    this.sGroupe = data.sGroupe;
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
    reste += this.sGroupe.paiement.reste;
    return reste;
  }

  getMontantPaye(): number {
    let montant = 0;
    montant += (this.sGroupe.paiement.totale - this.sGroupe.paiement.reste);
    return montant;
  }
}
