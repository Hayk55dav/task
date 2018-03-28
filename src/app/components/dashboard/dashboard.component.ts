import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    items: any;
    categories: any;

    constructor(private apiServices: ApiService) {

    }

    ngOnInit() {
        this.getCategories();
        this.getItems();
        setTimeout(() => {
            this.mapItems();
        }, 1000);
    }

    getItems() {
        this.apiServices.getItems()
            .then(res => {
                this.items = res.result.data;
            })
            .catch(err => err);
    }

    getCategories() {
        this.apiServices.getCategories()
            .then(res => {
                this.categories = res.result.data;
            })
            .catch(err => err);
    }

    mapItems() {
        for (let category of this.categories) {
            for (let item of this.items) {
                if (category.id === item.categoryId) {
                    category.childCategoryIds.push(item.id);
                }
            }
        }
        console.log(this.categories);
    }

}
