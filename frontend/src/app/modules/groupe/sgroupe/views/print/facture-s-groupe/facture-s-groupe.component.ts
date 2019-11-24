import {Component, Inject, OnInit} from '@angular/core';
import {Facture} from '../../../../model/facture';
import {MAT_DIALOG_DATA} from '@angular/material';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import {OffreVoyage} from '../../../../../offre-voyage/model/offre-voyage';
import {Traite} from '../../../../../offre-voyage/model/traite';
import {SGroupe} from '../../../model/s-groupe';

@Component({
  selector: 'app-facture',
  templateUrl: './facture-s-groupe.component.html',
  styleUrls: ['./facture-s-groupe.component.scss']
})
export class FactureSGroupeComponent implements OnInit {
  facture: Facture;
  date = new Date();
  qte = 0;
  qteEnfant = 0;
  qteBebe = 0;
  options = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { sGroupe: SGroupe, offreVoyage: OffreVoyage, traite: Traite }) {
    this.facture = data.traite.facture;
  }

  ngOnInit() {
    if (this.data.sGroupe.options) {
      this.data.sGroupe.options.forEach(value => {
        this.options += value.pivot.prix;
      });
    }
    this.qte = this.data.sGroupe.voyageurs.filter(value => value.stadeVie === 'adulte').length;
    this.qteEnfant = this.data.sGroupe.voyageurs.filter(value => value.stadeVie === 'enfant').length;
    this.qteBebe = this.data.sGroupe.voyageurs.filter(value => value.stadeVie === 'bébé').length;
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
