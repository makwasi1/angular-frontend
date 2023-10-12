import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TransactionsService } from '../services/transactions.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { TransactionData } from '../models/Transaction';



@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit,  AfterViewInit {
  displayedColumns: string[] = ['id', 'customerId', 'amount', 'transactionType'];
  dataSource!: MatTableDataSource<TransactionData>;



  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private transactionsService: TransactionsService,
  ) { }

  ngOnInit(): void {
    const customerId = localStorage.getItem('customerId') || '';
    this.getCustomerMiniStatement(customerId, 10);
  
  }

async getCustomerMiniStatement(customerId: string, limit: number): Promise<TransactionData[]> {
  const transactions = await this.transactionsService.getCustomerMiniStatement(customerId, limit);
  this.dataSource = new MatTableDataSource(transactions);
  return transactions;
}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}



