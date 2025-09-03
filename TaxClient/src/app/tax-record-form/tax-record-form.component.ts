import { Component, OnInit } from '@angular/core';
import { TaxRecordService } from '../tax-record.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tax-record-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tax-record-form.component.html',
})
export class TaxRecordFormComponent implements OnInit {
  record: any = {
    id: 0,
    recordTitle: '',
    taxYear: new Date().getFullYear(),
    incomeAmount: 0,
    deductionsAmount: 0,
    notes: ''
  };

  isEdit = false;

  constructor(
    private service: TaxRecordService,
    private route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.service.getTaxRecord(+id).subscribe(data => this.record = data);
    }
  }

  save() {
    if (this.isEdit) {
      this.service.updateTaxRecord(this.record.id, this.record).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.service.createTaxRecord(this.record).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
