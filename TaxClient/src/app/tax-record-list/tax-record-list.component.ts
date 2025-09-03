import { Component, OnInit } from '@angular/core';
import { TaxRecordService } from '../tax-record.service';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tax-record-list',
  standalone: true,
  imports: [RouterLink, NgFor, NgIf, FormsModule],
  templateUrl: './tax-record-list.component.html',
})
export class TaxRecordListComponent implements OnInit {
  taxRecords: any[] = [];
  expandedId: number | null = null;

  searchTerm = '';
  filterYear: number | any;
  sortField = '';

  constructor(private service: TaxRecordService) {
  }

  ngOnInit() {
    this.loadRecords();
  }

  toggleDetails(id: number) {
    this.expandedId = this.expandedId === id ? null : id;
  }


  loadRecords() {
    this.service.getTaxRecords().subscribe(data => this.taxRecords = data);
  }

  deleteRecord(id: number) {
    this.service.deleteTaxRecord(id).subscribe(() => this.loadRecords());
  }

  filteredRecords() {
    let data = [...this.taxRecords];

    // Filter by search term 
    if (this.searchTerm) {
      data = data.filter(r => r.recordTitle.toLowerCase().includes(this.searchTerm.toLowerCase()));
    }

    // Filter by year 
    if (this.filterYear) {
      data = data.filter(r => r.taxYear === this.filterYear);
    }

    // Sort 
    if (this.sortField) {
      data = data.sort((a, b) => {
        if (this.sortField === 'taxYear') return b.taxYear - a.taxYear;
        if (this.sortField === 'incomeAmount') return b.incomeAmount - a.incomeAmount;
        return 0;
      });
    }

    return data;
  }

}
