import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import $ from 'jquery';
import 'datatables.net';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit, AfterViewInit, OnDestroy {
  products: any[] = [];
  private productsTable: any;
  totalRecords = 0;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initializeDataTable();
  }

  ngOnDestroy(): void {
    if (this.productsTable) {
      this.productsTable.destroy(true);
    }
  }

  initializeDataTable() {
    const self = this;
    setTimeout(() => {
      this.productsTable = $('#dataTable').DataTable({
        processing: true,
        serverSide: true,
        ajax: (dataTableParams: any, callback, settings) => {
          const start = dataTableParams.start;
          const length = dataTableParams.length;
          const searchTerm = dataTableParams.search.value;

          self.productService.getProducts(start, length, searchTerm).subscribe(response => {
            callback({
              draw: dataTableParams.draw,
              recordsTotal: response.recordsTotal,
              recordsFiltered: response.recordsFiltered,
              data: response.data
            });
          });
        },
        columns: [
          { data: 'title' },
          {
            data: 'image',
            render: function(data: string) {
              return `<img src="${data}" alt="Product Image" style="width: 100px; height: auto;" />`;
            }
          },
          { data: 'price' }
        ],
        pageLength: 10,
        lengthMenu: [10, 25, 50, 100],
        language: {
          search: "Search:",
          paginate: {
            previous: "Previous",
            next: "Next"
          }
        }
      });
    }, 0);
  }
}
