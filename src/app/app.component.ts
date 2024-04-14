import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {JsonPipe, NgForOf} from "@angular/common";
import {DummyJsonResponse, Product} from "./DummyJsonResponse";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgForOf, JsonPipe],
  template: `

    <div class="flex justify-center items-center">
      <h6 class="text-3xl">alex' interactive flex item visualizer</h6>
      <i>(scroll down for typical lesson info)</i>
    </div>
    <input (change)="change($event)" type="range" min="3" max="6" value="4" class="range" step="1" />
    <div class="w-full flex justify-between text-xs px-2">
      <span>3</span>
      <span>4</span>
      <span>5</span>
      <span>6</span>
    </div>

    <hr>
    <br>
    <h1 class="flex justify-center">Flex basis = 100% for first and 50% for rest</h1>
    <div style="display: flex;">
      <div *ngFor="let i of items; let index = index"
           [style]="{
      flex: index == 0 ? '1 1 100%' : '1 1 50%',
      }"
           class="card w-96 bg-base-300 shadow-xl m-10 flex justify-center items-center">
        <h1 class="card-title">{{i.title}}</h1></div>
    </div>

    <h1 class="flex justify-center">Flex grow = the index</h1>
    <div style="display: flex;">
      <div *ngFor="let i of items; let index = index"
           [style]="{
      flex: index,
      }"
           class="card w-96 bg-base-300 shadow-xl m-10 flex justify-center items-center">
        <h1 class="card-title">{{i.title}}</h1></div>
    </div>

    <h1 class="flex justify-center">Flex shrink = the price</h1>
    <div style="display: flex;">
      <div *ngFor="let i of items; let index = index"
           [style]="{
      flex: '0' + i.price
      }"
           class="card w-96 bg-base-300 shadow-xl m-10 flex justify-center items-center">
        <h1 class="card-title">{{i.title}}</h1></div>
    </div>



  `,})
export class AppComponent {


  items: Product[] = [];
  constructor() {
    fetch('https://dummyjson.com/products?limit=3')
      .then(res => res.json() as Promise<DummyJsonResponse>)
      .then(data =>  {
        console.log(data);
        this.items = data.products;
      });
  }

  change(event: any) {
    fetch('https://dummyjson.com/products?limit='+event.target.value)
      .then(res => res.json() as Promise<DummyJsonResponse>)
      .then(data =>  {
        console.log(data);
        this.items = data.products;
      });
  }
}
