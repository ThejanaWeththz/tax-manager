import { Component, OnInit } from '@angular/core';
import { TaxRecordService } from '../tax-record.service';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tax-record-list',
  standalone: true,
  imports: [RouterLink, NgFor],
  templateUrl: './tax-record-list.component.html',
})
export class TaxRecordListComponent implements OnInit {
  taxRecords: any[] = [];

  constructor(private service: TaxRecordService) { }

  ngOnInit() {
    this.loadRecords();
  }

  loadRecords() {
    this.service.getTaxRecords().subscribe(data => this.taxRecords = data);
  }

  deleteRecord(id: number) {
    this.service.deleteTaxRecord(id).subscribe(() => this.loadRecords());
  }
}
