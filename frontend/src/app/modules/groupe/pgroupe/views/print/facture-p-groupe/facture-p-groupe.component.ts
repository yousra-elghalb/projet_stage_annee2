import {Component, Inject, OnInit} from '@angular/core';
import {Facture} from '../../../../model/facture';
import {MAT_DIALOG_DATA} from '@angular/material';
import {OffreVoyage} from '../../../../../offre-voyage/model/offre-voyage';
import {PGroupe} from '../../../model/p-groupe';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import {Traite} from '../../../../../offre-voyage/model/traite';

@Component({
  selector: 'app-facture',
  templateUrl: './facture-p-groupe.component.html',
  styleUrls: ['./facture-p-groupe.component.scss']
})
export class FacturePGroupeComponent implements OnInit {
  facture: Facture;
  date = new Date();
  qte = 0;
  qteEnfant = 0;
  qteBebe = 0;
  options = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { pGroupe: PGroupe, offreVoyage: OffreVoyage, traite: Traite }) {
    this.facture = data.traite.facture;
  }

  ngOnInit() {
    if (this.data.pGroupe.options) {
      this.data.pGroupe.options.forEach(value => {
        this.options += value.pivot.prix;
      });
    }
    this.qte = this.data.pGroupe.voyageurs.filter(value => value.stadeVie === 'adulte').length;
    this.qteEnfant = this.data.pGroupe.voyageurs.filter(value => value.stadeVie === 'enfant').length;
    this.qteBebe = this.data.pGroupe.voyageurs.filter(value => value.stadeVie === 'bébé').length;
  }

  donwload() {
    const filename = 'facture-' + this.facture.num + '.pdf';

    html2canvas(document.querySelector('#c')).then(canvas => {
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298);
      pdf.save(filename);
    });
  }
}
