import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {map, startWith} from 'rxjs/operators';
import {Software} from '../../classes/software';

@Component({
    selector: 'app-more-software',
    templateUrl: './more-software.component.html',
    styleUrls: ['./more-software.component.css']
})
export class MoreSoftwareComponent implements OnInit {

    cartControl = new FormControl();
    filteredCarts: Observable<Software[]>;

    constructor(
        @Inject(MAT_DIALOG_DATA) public carts: Software[],
        private dialogRef: MatDialogRef<MoreSoftwareComponent>
    ) {}

    ngOnInit() {
        this.filteredCarts = this.cartControl.valueChanges.pipe(
            startWith<string | Software>(''),
            map(value => typeof value === 'string' ? value : value.name),
            map(name => name ? this._filter(name) : this.carts.slice())
        );
    }

    private _filter(value: string): Software[] {
        const filterValue = value.toLowerCase();
        return this.carts.filter(cart => cart.name.toLowerCase().includes(filterValue));
    }

    displayCart(cart: Software): string {
        return cart ? cart.name : "";
    }

    onOK() {
        this.dialogRef.close(this.cartControl.value);
    }
}
