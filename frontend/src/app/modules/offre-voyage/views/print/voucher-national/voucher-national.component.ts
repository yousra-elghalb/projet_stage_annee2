import {Component, ElementRef, Inject, LOCALE_ID, OnInit, ViewChild} from '@angular/core';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import {MAT_DIALOG_DATA} from '@angular/material';
import {OffreVoyage} from '../../../model/offre-voyage';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher-national.component.html',
  styleUrls: ['./voucher-national.component.scss'],
})
export class VoucherNationalComponent implements OnInit {

  @ViewChild('content', {static: true}) content: ElementRef;
  date = new Date();
  offreVoyage: OffreVoyage;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { offreVoyage: OffreVoyage },
    private translate: TranslateService) {
    this.translate.use('fr');
    this.offreVoyage = data.offreVoyage;
  }

  ngOnInit() {
  }

  donwload() {
    const filename = 'voucher-00' + this.offreVoyage.id + '.pdf';

    html2canvas(document.querySelector('#c')).then(canvas => {
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298);
      pdf.save(filename);
    });
  }
}
