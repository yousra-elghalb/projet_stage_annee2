import {AfterViewInit, Component, Inject, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-dialog-iframe-peiment',
  templateUrl: './dialog-iframe-peiment.component.html',
  styleUrls: ['./dialog-iframe-peiment.component.scss']
})
export class DialogIframePeimentComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { src: string },
              private http: HttpClient
  ) {
  }

  ngOnInit() {
    // this.http
    //   .post(environment.baseUrlApi + 'downloadPieceJoint', {src: this.data.src}, {responseType: 'blob'}).subscribe(value => {
    //   console.warn(value);
    // });
  }

}
